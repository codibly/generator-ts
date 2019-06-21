import upperFirst from "lodash/fp/upperFirst";

export enum Task {
  COMPONENT = "component",
  API = "api",
  MODEL = "model",
  MODULE = "module"
}

export namespace Task {
  const LABELS = {
    [Task.COMPONENT]: upperFirst(Task.COMPONENT),
    [Task.API]: upperFirst(Task.API),
    [Task.MODEL]: upperFirst(Task.MODEL),
    [Task.MODULE]: upperFirst(Task.MODULE)
  };

  export function getLabel(task: Task): string {
    return LABELS[task] || "";
  }
}
