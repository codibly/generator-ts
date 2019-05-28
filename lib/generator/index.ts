import chalk from "chalk";
import * as emoji from "node-emoji";
import Generator from "yeoman-generator";

export = class extends Generator {
  public async prompting() {
    this.log(
      `Welcome to the ${chalk.greenBright(
        "Codibly TypeScript"
      )} generator! ${emoji.get("sparkles")}`
    );

    const { task } = await this.prompt([
      {
        type: "list",
        name: "task",
        message: "What do you want to generate",
        choices: [
          {
            name: `Library ${emoji.get("package")}`,
            value: "library"
          },
          {
            name: `Application ${emoji.get("rocket")}`,
            value: "app"
          },
          {
            name: `Structure ${emoji.get("large_orange_diamond")}`,
            value: "structure"
          },
          {
            name: `Configuration ${emoji.get("gear")}`,
            value: "config"
          }
        ]
      }
    ]);

    this.composeWith(require.resolve(`./${task}`), {});
  }
};
