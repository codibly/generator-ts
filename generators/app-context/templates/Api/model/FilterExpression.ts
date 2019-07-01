/**
 * Basic operands
 */
export interface IdentifierOperand {
  identifier: string;
}
export interface LiteralOperand {
  literal: any;
}

/**
 * Basic expressions
 */
export interface IdentifierExpression {
  [0]: IdentifierOperand;
  length: 1;
}
export interface IdentifierLiteralExpression {
  [0]: IdentifierOperand;
  [1]: LiteralOperand;
  length: 2;
}

/**
 * Terminal expressions
 */
export interface NullExpression {
  null: IdentifierExpression;
}
export interface NotNullExpression {
  notNull: IdentifierExpression;
}
export interface LtExpression {
  lt: IdentifierLiteralExpression;
}
export interface LteExpression {
  lte: IdentifierLiteralExpression;
}
export interface GtExpression {
  gt: IdentifierLiteralExpression;
}
export interface GteExpression {
  gte: IdentifierLiteralExpression;
}
export interface InExpression {
  in: IdentifierLiteralExpression;
}
export interface EqExpression {
  eq: IdentifierLiteralExpression;
}
export interface LikeExpression {
  like: IdentifierLiteralExpression;
}
export type TerminalExpression =
  | NullExpression
  | NotNullExpression
  | LtExpression
  | LteExpression
  | GtExpression
  | GteExpression
  | InExpression
  | EqExpression
  | LikeExpression;

/**
 * Logic expressions
 */
export interface AndExpression {
  and: FilterExpression[];
}
export interface OrExpression {
  or: FilterExpression[];
}
export type LogicExpression = AndExpression | OrExpression;

/**
 * Filter expression
 */
export type FilterExpression = LogicExpression | TerminalExpression;

export namespace FilterExpression {
  // type guards
  export function isLikeExpression(filter: FilterExpression): filter is LikeExpression {
    return !!(filter as LikeExpression).like;
  }

  // builders
  export enum LikeMode {
    STARTS_WITH = 'STARTS_WITH',
    CONTAINS = 'CONTAINS',
    EQUALS = 'EQUALS',
    ENDS_WITH = 'ENDS_WITH'
  }

  export function likeLiteral(literal: string, mode: LikeMode): string {
    switch (mode) {
      case LikeMode.STARTS_WITH:
        return `${literal}%`;

      case LikeMode.ENDS_WITH:
        return `%${literal}`;

      case LikeMode.CONTAINS:
        return `%${literal}%`;

      case LikeMode.EQUALS:
      default:
        return literal;
    }
  }

  // we can't use "in" as it's keyword in the JavaScript
  export function oneOf(identifier: string, literal: any[]): InExpression {
    return {
      in: [{ identifier }, { literal }]
    };
  }

  export function eq(identifier: string, literal: any): EqExpression {
    return {
      eq: [{ identifier }, { literal }]
    };
  }

  export function like(
    identifier: string,
    query: string,
    mode: LikeMode = LikeMode.CONTAINS
  ): LikeExpression {
    return {
      like: [{ identifier }, { literal: likeLiteral(query, mode) }]
    };
  }

  export function or(filters: FilterExpression[]): FilterExpression {
    if (filters.length === 1) {
      return filters[0];
    } else {
      return {
        or: filters
      };
    }
  }

  export function and(filters: FilterExpression[]): FilterExpression {
    if (filters.length === 1) {
      return filters[0];
    } else {
      return {
        and: filters
      };
    }
  }
}
