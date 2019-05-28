import Generator from "yeoman-generator";

export function getGitAuthor(this: Generator) {
  let defaultAuthor = "";
  try {
    const name = this.user.git.name();
    const email = this.user.git.email();

    defaultAuthor = name && email ? `${name} <${email}>` : name || email || "";
  } catch (e) {
    // ignore error
  }

  return defaultAuthor.trim();
}
