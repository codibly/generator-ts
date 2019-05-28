import Generator from "yeoman-generator";
import traits from "../../trait";

export = class ConfigDocGenerator extends Generator {
  public traits = traits(this);

  public configuring() {
    // we have to add --ignoreCompilerErrors because of https://github.com/facebook/jest/issues/8218
    this.traits.extendPackageJson({
      scripts: {
        doc: this.traits.execEachPackage(
          "typedoc --out doc --mode file --ignoreCompilerErrors src"
        )
      },
      devDependencies: {
        typedoc: "^0.14.2"
      }
    });
  }

  public writing() {
    this.traits.addGitIgnoreEntries(
      [
        "### TypeDoc",
        this.traits.usesLerna() ? "/packages/**/doc" : "/doc"
      ].join("\n")
    );
  }

  public install() {
    this.yarnInstall();
  }
};
