import Generator from "yeoman-generator";
import { sortPackageJson } from "./sortPackageJson";

export function extendPackageJson(
  this: Generator,
  content: object,
  sort = true
) {
  this.fs.extendJSON(this.destinationPath("package.json"), content);

  if (sort) {
    sortPackageJson.call(this);
  }
}
