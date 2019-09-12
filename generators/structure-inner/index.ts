import Generator from "yeoman-generator";
import { Task } from "../../src/enum/Task";
import {
  getModuleQuestion,
  isNewModule,
  moduleInputQuestion
} from "../../src/getModuleDirectories";

const moduleListMessage = (task: string) =>
  `What's the Module to put the ${task} into?`;
const moduleInputMessage = (task: string) =>
  `What's the new Module name to put the ${task} into?`;

const tasksToModuleNameIdentityCheck = [Task.API, Task.MODEL, Task.STORE];

export = class StructureInnerGenerator extends Generator {
  private module: string;
  private isTaskNameSameAsModule: boolean;

  public async prompting() {
    let { module } = await this.prompt(
      getModuleQuestion(
        this.config.get("rootDir"),
        moduleListMessage(Task.getLabel(this.options.task))
      )
    );

    if (isNewModule(module)) {
      const answer = await this.prompt(
        moduleInputQuestion(
          moduleInputMessage(Task.getLabel(this.options.task))
        )
      );
      module = answer.module;
    }

    this.module = module;
  }

  public async promptingTaskNameIdentity() {
    if (!tasksToModuleNameIdentityCheck.includes(this.options.task)) {
      return;
    }

    const { isTaskNameSameAsModule } = await this.prompt({
      type: "expand",
      name: "isTaskNameSameAsModule",
      message: `Is the ${Task.getLabel(
        this.options.task
      )} name the same as the Module name?`,
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
    });

    this.isTaskNameSameAsModule = isTaskNameSameAsModule;
  }

  public composeTaskStructureGenerator() {
    this.composeWith(require.resolve(`../structure-${this.options.task}`), {
      module: this.module,
      name: this.isTaskNameSameAsModule ? this.module : undefined
    });
  }
};
