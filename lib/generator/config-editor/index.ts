import Generator from "yeoman-generator";

export = class ConfigEditorGenerator extends Generator {
  public writing() {
    this.fs.copy(
      this.templatePath(".editorconfig"),
      this.destinationPath(".editorconfig")
    );
  }
};
