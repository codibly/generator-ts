import chalk from "chalk";
import Generator from "yeoman-generator";

export = class StructureGenerator extends Generator {
  public async prompting() {
    const { task } = await this.prompt([
      {
        type: "list",
        name: "task",
        message: "What type of structure do you want to generate",
        choices: [
          {
            name: `Monorepo sub-library ${chalk.dim(
              "(requires yarn workspaces)"
            )}`,
            value: "sub-library"
          }
        ]
      }
    ]);

    this.composeWith(require.resolve(`../structure-${task}`), {});
  }
};
