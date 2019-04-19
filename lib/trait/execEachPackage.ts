import Generator from "yeoman-generator";
import { usesLerna } from "./usesLerna";

/**
 * Adds lerna exec -- at the start of the command if package uses lerna
 */
export function execEachPackage(this: Generator, command: string) {
  return usesLerna.call(this) ? `lerna exec -- ${command}` : command;
}
