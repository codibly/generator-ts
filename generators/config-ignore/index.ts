import Generator from "yeoman-generator";

export = class ConfigIgnoreGenerator extends Generator {
  public writing() {
    this.fs.copy(
      this.templatePath("gitignore"),
      this.destinationPath(".gitignore")
    );
  }
};
