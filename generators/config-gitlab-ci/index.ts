import Generator from "yeoman-generator";

export = class ConfigIgnoreGenerator extends Generator {
  public writing() {
    this.fs.copy(
      this.templatePath(".gitlab-ci.yml"),
      this.destinationPath(".gitlab-ci.yml")
    );
  }
};
