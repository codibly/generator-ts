import * as childProcess from "child_process";
import Generator from "yeoman-generator";

export function getGitRepository(this: Generator) {
  let defaultRepository = "";
  try {
    defaultRepository = String(
      childProcess.execSync("git config remote.origin.url")
    );
  } catch (e) {
    // ignore error
  }

  return defaultRepository.trim();
}
