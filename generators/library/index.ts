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
    this.composeWith(require.resolve("../config-typescript"), {});
    this.composeWith(require.resolve("../config-test"), {});
    this.composeWith(require.resolve("../config-lint"), {});
    this.composeWith(require.resolve("../config-doc"), {});
    this.composeWith(require.resolve("../config-rollup"), {});
    this.composeWith(require.resolve("../config-release"), {});
  }

  public async prompting() {
    const { usesReact } = await this.prompt([
      {
        type: "expand",
        name: "usesReact",
        message: "Will this library use React?",
        default: "n",
        choices: [
          {
            key: "y",
            name: "Yes",
            value: true
          },
          {
            key: "n",
            name: "No",
            value: false
          }
        ]
      }
    ]);

    if (usesReact) {
      this.composeWith(require.resolve("../config-react"), {});
    }
  }

  public install() {
    this.yarnInstall();
  }
};
