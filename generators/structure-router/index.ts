import camelCase from "lodash/fp/camelCase";
import toUpper from "lodash/fp/toUpper";
import Generator from "yeoman-generator";

import { nameQuestion } from "../../src/questions";

interface FileConfig {
  templateName: string;
  fileNameSuffix?: string;
}

export = class StructureApiGenerator extends Generator {
  private name: string;
  private module: string;
  private fileConfigs: FileConfig[];

  public async prompting() {
    const { name } = await this.prompt(
      nameQuestion("Router", this.options.name)
    );

    this.name = this.options.name || name;
  }

  public makeModule() {
    this.module = this.options.module || this.name;
  }

  public makeConfig() {
    this.fileConfigs = this.getFileConfig(this.name);
  }

  public writing() {
    this.fileConfigs.forEach(fileConfig => {
      this.fs.copyTpl(
        this.templatePath(`${fileConfig.templateName}`),
        this.destinationPath(
          `./${this.config.get("rootDir")}/${this.module}/router/${this.name}${
            fileConfig.fileNameSuffix
          }`
        ),
        {
          name: this.name,
          nameCamelCase: camelCase(this.name),
          nameUpperCase: toUpper(this.name)
        }
      );
    });
  }

  private getFileConfig = (name: string): FileConfig[] => [
    {
      templateName: `main.tsx`,
      fileNameSuffix: "Router.tsx"
    },
    {
      templateName: `route.ts`,
      fileNameSuffix: ".route.ts"
    },
    {
      templateName: `data.tsx`,
      fileNameSuffix: "Router.data.tsx"
    },
    {
      templateName: `load.tsx`,
      fileNameSuffix: "Router.load.tsx"
    },
    {
      templateName: `spec.tsx`,
      fileNameSuffix: "Router.spec.tsx"
    }
  ];
};
