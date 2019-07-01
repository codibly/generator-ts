export type Dialog = Readonly<{
  name: string;
  params: object;
}>;

export type DialogState = Dialog | null | undefined;

export namespace DialogState {
  export const INITIAL: DialogState = null;
}

export type DialogMountedState = {
  dialog?: DialogState;
  [key: string]: any;
};
