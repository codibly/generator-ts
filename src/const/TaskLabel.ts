import upperFirst from "lodash/fp/upperFirst";

import { Task } from "../enum/Task";

export const TaskLabel: { [key in Task]: string } = {
  [Task.COMPONENT]: upperFirst(Task.COMPONENT),
  [Task.API]: upperFirst(Task.API),
  [Task.MODEL]: upperFirst(Task.MODEL),
  [Task.MODULE]: upperFirst(Task.MODULE)
};
