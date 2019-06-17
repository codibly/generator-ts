import Generator from "yeoman-generator";
import { nameQuestion } from "../../src/questions";

export = class StructureModelGenerator extends Generator {
  private name: any;

  public async prompting() {
    const { name } = await this.prompt(
      nameQuestion("Model", this.options.name)
    );

    this.name = this.options.name || name;
  }

  public writing() {
    this.fs.copyTpl(
      this.templatePath("model.ts"),
      this.destinationPath(
        `./${this.config.get("rootDir")}/${this.name}/model/${this.name}.ts`
      ),
      { name: this.name }
    );
  }
};
