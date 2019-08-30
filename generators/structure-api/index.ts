import camelCase from "lodash/fp/camelCase";
import toUpper from "lodash/fp/toUpper";
import Generator from "yeoman-generator";

import { nameQuestion } from "../../src/questions";

export = class StructureApiGenerator extends Generator {
  private name: string;
  private module: string;

  public async prompting() {
    const { name } = await this.prompt(nameQuestion("API", this.options.name));

    this.name = this.options.name || name;
  }

  public makeModule() {
    this.module = this.options.module || this.name;
  }

  public writing() {
    ["api", "dto", "mapper", "mock", "endpoint"].forEach(file => {
      this.fs.copyTpl(
        this.templatePath(`${file}.ts`),
        this.destinationPath(
          `./${this.config.get("rootDir")}/${this.module}/api/${this.name}/${
            this.name
          }.${file}.ts`
        ),
        {
          name: this.name,
          nameCamelCase: camelCase(this.name),
          nameUpperCase: toUpper(this.name)
        }
      );
    });
  }
};
