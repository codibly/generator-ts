import * as Generator from "yeoman-generator";
import { nameRequired } from "./validator/nameRequired";

export const nameQuestion = (
  structure: string,
  nameFromModule?: string
): Generator.Answers => ({
  type: "input",
  name: "name",
  message: `What's the ${structure} name?`,
  validate: nameRequired,
  when: !nameFromModule
});
