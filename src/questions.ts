import { nameRequired } from "./validator/nameRequired";

export const nameQuestion = (structure: string, nameFromModule?: string) => ({
  type: "input",
  name: "name",
  message: `What's the ${structure} name?`,
  validate: nameRequired,
  when: !nameFromModule
});
