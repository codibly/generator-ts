import Generator from "yeoman-generator";
import { defaultConfig } from "../../src/defaultConfig";
import traits from "../../traits";

export = class AppGenerator extends Generator {
  public traits = traits(this);

  public async settingDefaultConfig() {
    this.config.defaults(defaultConfig);
  }

  public initializing() {
    this.composeWith(require.resolve("../package"), {});
    this.composeWith(require.resolve("../config-editor"), {});
    this.composeWith(require.resolve("../config-ignore"), {});
    this.composeWith(require.resolve("../config-typescript"), {});
    this.composeWith(require.resolve("../config-test"), {});
    this.composeWith(require.resolve("../config-lint"), {});
    this.composeWith(require.resolve("../config-webpack"), {});
    this.composeWith(require.resolve("../config-react"), {});
    this.composeWith(require.resolve("../config-storybook"), {});
    this.composeWith(require.resolve("../app-context"), {});
  }

  public install() {
    this.yarnInstall();
  }
};
