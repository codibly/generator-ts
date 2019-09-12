import upperFirst from "lodash/fp/upperFirst";

export enum Task {
  COMPONENT = "component",
  API = "api",
  MODEL = "model",
  MODULE = "module",
  STORE = "store",
  PAGE = "page",
  ROUTER = "router"
}

export namespace Task {
  const LABELS = {
    [Task.COMPONENT]: upperFirst(Task.COMPONENT),
    [Task.API]: upperFirst(Task.API),
    [Task.MODEL]: upperFirst(Task.MODEL),
    [Task.MODULE]: upperFirst(Task.MODULE),
    [Task.STORE]: upperFirst(Task.STORE),
    [Task.PAGE]: upperFirst(Task.PAGE),
    [Task.ROUTER]: upperFirst(Task.ROUTER)
  };

  export function getLabel(task: Task): string {
    return LABELS[task] || "";
  }
}
