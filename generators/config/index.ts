import chalk from "chalk";
import Generator from "yeoman-generator";

export = class ConfigGenerator extends Generator {
  public async prompting() {
    const { task } = await this.prompt([
      {
        type: "list",
        name: "task",
        message: "What type of configuration do you want to generate",
        choices: [
          {
            name: "TypeScript setup",
            value: "typescript"
          },
          {
            name: `Docs generator setup ${chalk.dim("(typedoc)")}`,
            value: "doc"
          },
          {
            name: `Lint setup ${chalk.dim("(tslint + prettier + commitlint)")}`,
            value: "lint"
          },
          {
            name: `Rollup setup`,
            value: "rollup"
          },
          {
            name: "Webpack setup",
            value: "webpack"
          },
          {
            name: `Test setup ${chalk.dim("(jest)")}`,
            value: "test"
          },
          {
            name: `Editor config ${chalk.dim("(.editorconfig)")}`,
            value: "editor"
          },
          {
            name: `Ignore files ${chalk.dim("(.gitignore)")}`,
            value: "ignore"
          }
        ]
      }
    ]);

    this.composeWith(require.resolve(`../config-${task}`), {});
  }
};
