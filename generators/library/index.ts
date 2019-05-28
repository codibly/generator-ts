import Generator from "yeoman-generator";
import traits from "../../traits";

interface Answers {
  structure: "single" | "multi";
}

export = class LibraryGenerator extends Generator {
  public traits = traits(this);

  public answers: Partial<Answers> = {};

  public initializing() {
    this.composeWith(require.resolve("../package"), {});
    this.composeWith(require.resolve("../config-editor"), {});
    this.composeWith(require.resolve("../config-ignore"), {});
    this.composeWith(require.resolve("../config-test"), {});
    this.composeWith(require.resolve("../config-lint"), {});
    this.composeWith(require.resolve("../config-doc"), {});
    this.composeWith(require.resolve("../config-rollup"), {});
    this.composeWith(require.resolve("../config-release"), {});
  }

  public writing() {
    ["src/index.ts", "test/index.spec.ts"].forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.config.getAll()
      );
    });
  }

  public install() {
    this.yarnInstall();
  }
};
