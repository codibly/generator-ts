import {
  combineValidators as originalCombineValidators,
  CombineValidatorsOptions,
  ConfiguredCombinedValidator
} from 'revalidate';

export function combineValidators(
  validators: any,
  options?: CombineValidatorsOptions
): ConfiguredCombinedValidator {
  const originalCombinedValidators = originalCombineValidators(validators, options);

  return function combinedValidators(value?: any, allValues?: any): any {
    const revalidateErrors = originalCombinedValidators(value, allValues);

    return revalidateToFormikErrors(revalidateErrors);
  };
}

/**
 * Removes empty nested nodes
 * @param node
 */
function revalidateToFormikErrors<T = any>(node: T): any {
  if (!node || typeof node !== 'object') {
    return node;
  } else if (Array.isArray(node)) {
    return revalidateArrayToFromikErrors(node);
  } else {
    return revalidateObjectToFormikErrors(node);
  }
}

/**
 * Removes empty nested nodes in an array
 * @param node
 */
function revalidateArrayToFromikErrors<T = any>(node: T[]): T[] | undefined {
  const mappedErrors = node.map(revalidateToFormikErrors).filter((itemNode) => !!itemNode);

  return mappedErrors && mappedErrors.length ? mappedErrors : undefined;
}

/**
 * Removes empty nested nodes in an object
 * @param node
 */
function revalidateObjectToFormikErrors<T extends { [key: string]: any } = any>(
  node: T
): T | undefined {
  const reducedErrors: any = Object.keys(node).reduce((reduced, key) => {
    const keyErrors = revalidateToFormikErrors(node[key]);
    return keyErrors ? { ...reduced, [key]: keyErrors } : reduced;
  }, {});

  return Object.keys(reducedErrors).length ? reducedErrors : undefined;
}
