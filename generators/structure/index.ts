import * as emoji from "node-emoji";
import Generator from "yeoman-generator";
import { defaultConfig } from "../../src/defaultConfig";
import { Task } from "../../src/enum/Task";

export = class StructureGenerator extends Generator {
  public async prompting() {
    this.config.defaults(defaultConfig);

    const { task } = await this.prompt([
      {
        type: "list",
        name: "task",
        message: "What do you want to generate",
        choices: [
          {
            name: `Component ${emoji.get("atom_symbol")}`,
            value: Task.COMPONENT
          },
          {
            name: `API ${emoji.get("shield")}`,
            value: Task.API
          },
          {
            name: `Model ${emoji.get("question")}`,
            value: Task.MODEL
          },
          {
            name: `Module ${emoji.get("large_orange_diamond")}`,
            value: Task.MODULE
          },
          {
            name: `Store`,
            value: Task.STORE
          }
        ]
      }
    ]);

    switch (task) {
      case Task.MODULE:
        this.composeWith(require.resolve(`../structure-module`), {});
        break;
      case Task.COMPONENT:
      case Task.API:
      case Task.MODEL:
      case Task.STORE:
        this.composeWith(require.resolve(`../structure-inner`), { task });
    }
  }
};
