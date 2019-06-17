import Generator from "yeoman-generator";
import {
  getModuleQuestion,
  isNewModule,
  moduleInputQuestion
} from "../../src/fsModules";

export = class StructureInnerGenerator extends Generator {
  public async prompting() {
    let answer = await this.prompt(await getModuleQuestion());

    if (isNewModule(answer.module)) {
      answer = await this.prompt(moduleInputQuestion);
    }

    this.composeWith(require.resolve(`../structure-${this.options.task}`), {
      module: answer.module
    });
  }
};
