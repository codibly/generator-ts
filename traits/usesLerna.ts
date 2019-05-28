import Generator from "yeoman-generator";

/**
 * Checks if package uses lerna (has lerna.json file).
 */
export function usesLerna(this: Generator): boolean {
  return this.fs.exists(this.destinationPath("lerna.json"));
}
