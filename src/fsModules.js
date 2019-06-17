"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const path_1 = require("path");
const nameRequired_1 = require("./validator/nameRequired");
const isDirectory = ({ path }) => fs_1.lstatSync(path).isDirectory();
const getDirectories = baseDir =>
  fs_1
    .readdirSync(baseDir)
    .map(dirName => ({ path: path_1.join(baseDir, dirName), name: dirName }))
    .filter(isDirectory);
function fsModules() {
  return getDirectories("./src");
}
function getModulesToChoices() {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    const modules = yield fsModules();
    return modules
      .map(dir => ({ name: dir.name, value: dir.name }))
      .concat({ name: "a new one", value: "new" });
  });
}
exports.getModulesToChoices = getModulesToChoices;
const NEW_MODULE = "new";
const modulesListQuestion = modules => ({
  type: "list",
  name: "module",
  message: `What's the Module to put the Component into?`,
  choices: modules
});
exports.moduleInputQuestion = {
  type: "input",
  name: "module",
  message: `What's the new Module name to put the Component into?`,
  validate: nameRequired_1.nameRequired
};
function getModuleQuestion() {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    const modules = yield getModulesToChoices();
    return modules.length
      ? modulesListQuestion(modules)
      : exports.moduleInputQuestion;
  });
}
exports.getModuleQuestion = getModuleQuestion;
function isNewModule(moduleName) {
  return moduleName === NEW_MODULE;
}
exports.isNewModule = isNewModule;
