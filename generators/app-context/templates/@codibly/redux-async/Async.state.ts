export enum AsyncStatus {
  VOID = 'VOID',
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED'
}

export type Error = {
  code?: string;
  message?: string;
};

export type HttpError = Error & {
  httpCode?: number;
};

export type AsyncStatusMap = {
  [type: string]: AsyncStatus;
};

export type AsyncTimestampMap = {
  [type: string]: number;
};

export type AsyncErrorMap = {
  [type: string]: HttpError;
};

export type AsyncState = {
  status: AsyncStatusMap;
  errors: AsyncErrorMap;
  timestamp: AsyncTimestampMap;
};

export type AsyncMountedState = {
  async?: AsyncState;
  [key: string]: any;
};
