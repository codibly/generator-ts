import Generator from "yeoman-generator";

export function readPackageJson(this: Generator, defaultValue = {}) {
  return this.fs.readJSON(this.destinationPath("package.json")) || defaultValue;
}
