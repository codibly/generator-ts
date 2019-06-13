import * as emoji from "node-emoji";
import Generator from "yeoman-generator";

export = class StructureGenerator extends Generator {
  public async prompting() {
    // tslint:disable-next-line
    const { task } = await this.prompt([
      {
        type: "list",
        name: "task",
        message: "What do you want to generate",
        choices: [
          {
            name: `Module ${emoji.get("small_orange_diamond")}`,
            value: "module"
          },
          {
            name: `API ${emoji.get("shield")}`,
            value: "api"
          },
          {
            name: `Component ${emoji.get("question_mark")}`,
            value: "component"
          },
          {
            name: `Model ${emoji.get("diamon_with_a_dot")}`,
            value: "model"
          }
        ]
      }
    ]);

    this.composeWith(require.resolve(`../structure-${task}`), {});
  }
};
