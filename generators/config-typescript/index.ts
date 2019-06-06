import Generator from "yeoman-generator";
import traits from "../../traits";

export = class TypeScriptConfigGenerator extends Generator {
  public traits = traits(this);

  public configuring() {
    this.traits.extendPackageJson({
      devDependencies: {
        tslib: "^1.9.3",
        typescript: "^3.4.5"
      }
    });
  }

  public writing() {
    this.fs.copy(
      this.templatePath("tsconfig.json"),
      this.destinationPath("tsconfig.json")
    );
  }

  public install() {
    this.yarnInstall();
  }
};
