import Generator from "yeoman-generator";

/**
 * Adds badge to the README content.
 */
export function addReadmeBadges(this: Generator, badges: string | string[]) {
  const readmePath = this.destinationPath("README.md");

  if (!this.fs.exists(readmePath)) {
    this.fs.write(readmePath, "");
  }

  const [first, ...rest] = this.fs.read(readmePath).split("\n");

  this.fs.write(
    readmePath,
    [first, ...(badges instanceof Array ? badges : [badges]), ...rest].join(
      "\n"
    )
  );
}
