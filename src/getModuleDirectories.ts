import { lstatSync, readdirSync } from "fs";
import { ChoiceType, Question } from "inquirer";
import { join } from "path";
import { nameRequired } from "./validator/nameRequired";

interface Directory {
  name: string;
  path: string;
}

interface ModuleChoice {
  name: string;
  value: string;
}

const isDirectory = ({ path }: Directory) => lstatSync(path).isDirectory();

const getDirectories = (baseDir: string): Directory[] =>
  readdirSync(baseDir)
    .map((dirName: string) => ({ path: join(baseDir, dirName), name: dirName }))
    .filter(isDirectory);

function getModulesToChoices(rootDir: string): ModuleChoice[] {
  const modules = getDirectories(rootDir);

  return modules
    .map((dir: Directory) => ({ name: dir.name, value: dir.name }))
    .concat({ name: "a new one", value: "new" });
}

const NEW_MODULE = "new";

const modulesListQuestion = (
  modules: ChoiceType[],
  message: string
): Question => ({
  type: "list",
  name: "module",
  message,
  choices: modules
});

export const moduleInputQuestion = (message: string): Question => ({
  type: "input",
  name: "module",
  message,
  validate: nameRequired
});

export function getModuleQuestion(rootDir: string, message: string) {
  const modules = getModulesToChoices(rootDir);

  return modules.length
    ? modulesListQuestion(modules, message)
    : moduleInputQuestion(message);
}

export function isNewModule(moduleName: string): boolean {
  return moduleName === NEW_MODULE;
}
