export type <%= name %>State = {};

export namespace <%= name %>State {
  export const INITIAL: <%= name %>State = {};
  export const DOMAIN = "<%= nameUpperCase %>";
}

export type <%= name %>MountedState = {
  <%= nameCamelCase %>?: <%= name %>State;
};
