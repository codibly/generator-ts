import sort from "sort-package-json";
import Generator from "yeoman-generator";

/**
 * Sorts package.json file
 */
export function sortPackageJson(this: Generator) {
  this.fs.writeJSON(
    this.destinationPath("package.json"),
    sort(this.fs.readJSON(this.destinationPath("package.json")))
  );
}
