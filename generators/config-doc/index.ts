import Generator from "yeoman-generator";
import traits from "../../traits";

export = class ConfigDocGenerator extends Generator {
  public traits = traits(this);

  public configuring() {
    // we have to add --ignoreCompilerErrors because of https://github.com/facebook/jest/issues/8218
    this.traits.extendPackageJson({
      scripts: {
        doc: "typedoc --out doc --mode file --ignoreCompilerErrors src"
      },
      devDependencies: {
        typedoc: "^0.14.2"
      }
    });
  }

  public writing() {
    this.traits.addGitIgnoreEntries(["### TypeDoc", "/doc"].join("\n"));
  }

  public install() {
    this.yarnInstall();
  }
};
