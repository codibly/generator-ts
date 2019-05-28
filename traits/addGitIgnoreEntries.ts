import Generator from "yeoman-generator";

export function addGitIgnoreEntries(this: Generator, entries: string) {
  const ignorePath = this.destinationPath(".gitignore");

  if (!this.fs.exists(ignorePath)) {
    this.fs.write(ignorePath, "");
  }

  this.fs.write(ignorePath, this.fs.read(ignorePath) + "\n" + entries);
}
