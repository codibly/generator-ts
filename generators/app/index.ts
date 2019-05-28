import Generator from "yeoman-generator";
import traits from "../../traits";

export = class AppGenerator extends Generator {
  public traits = traits(this);

  public initializing() {
    this.composeWith(require.resolve("../package"), {});
    this.composeWith(require.resolve("../config-editor"), {});
    this.composeWith(require.resolve("../config-ignore"), {});
    this.composeWith(require.resolve("../config-test"), {});
    this.composeWith(require.resolve("../config-lint"), {});
    this.composeWith(require.resolve("../config-doc"), {});
    this.composeWith(require.resolve("../config-webpack"), {});
  }
};
