import Generator from "yeoman-generator";
import { nameQuestion } from "../../src/questions";

export = class StructureModuleGenerator extends Generator {
  private name: any;

  public async prompting() {
    const { name } = await this.prompt(nameQuestion("Module"));

    this.name = name;

    this.composeWith(require.resolve(`../structure-api`), { name: this.name });
    this.composeWith(require.resolve(`../structure-model`), {
      name: this.name
    });
  }
};
