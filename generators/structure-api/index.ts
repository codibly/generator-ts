import camelCase from "camel-case";
import Generator from "yeoman-generator";
import { nameQuestion } from "../../src/questions";

export = class StructureApiGenerator extends Generator {
  private name: any;

  public async prompting() {
    const { name } = await this.prompt(nameQuestion("API", this.options.name));

    this.name = this.options.name || name;
  }

  public writing() {
    ["api", "dto", "mapper", "mock"].forEach(file => {
      this.fs.copyTpl(
        this.templatePath(`${file}.ts`),
        this.destinationPath(
          `./${this.config.get("rootDir")}/${this.name}/api/${
            this.name
          }.${file}.ts`
        ),
        { name: this.name, nameCamelCase: camelCase(this.name) }
      );
    });
  }
};
