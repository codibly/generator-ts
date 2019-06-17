import { lstatSync, readdirSync } from "fs";
import { ChoiceType, Question } from "inquirer";
import { join } from "path";
import { nameRequired } from "./validator/nameRequired";

const isDirectory = ({ path }: any) => lstatSync(path).isDirectory();

const getDirectories = (baseDir: any) =>
  readdirSync(baseDir)
    .map((dirName: string) => ({ path: join(baseDir, dirName), name: dirName }))
    .filter(isDirectory);

function fsModules() {
  return getDirectories("./src");
}

export async function getModulesToChoices(): Promise<any> {
  const modules = await fsModules();

  return modules
    .map((dir: any) => ({ name: dir.name, value: dir.name }))
    .concat({ name: "a new one", value: "new" });
}

const NEW_MODULE = "new";

const modulesListQuestion = (modules: ChoiceType[]): Question => ({
  type: "list",
  name: "module",
  message: `What's the Module to put the Component into?`,
  choices: modules
});

export const moduleInputQuestion: Question = {
  type: "input",
  name: "module",
  message: `What's the new Module name to put the Component into?`,
  validate: nameRequired
};

export async function getModuleQuestion() {
  const modules = await getModulesToChoices();

  return modules.length ? modulesListQuestion(modules) : moduleInputQuestion;
}

export function isNewModule(moduleName: string): boolean {
  return moduleName === NEW_MODULE;
}
