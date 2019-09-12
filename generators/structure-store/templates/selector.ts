import { <%= name %>MountedState, <%= name %>State } from './<%= name %>.state';

export namespace <%= name %>Selector {
  const getDomain = (state?: <%= name %>MountedState) => (state && state.<%= nameCamelCase %>) || ({} as <%= name %>State)
}
