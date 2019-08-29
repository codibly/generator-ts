import camelCase from "lodash/fp/camelCase";
import toUpper from "lodash/fp/toUpper";
import Generator from "yeoman-generator";

import { nameQuestion } from "../../src/questions";

interface FileConfig {
  templateName: string;
  fileNameSuffix?: string;
}

interface Config {
  styling: "jss" | "styled-components" | "emotion";
  rootDir: string;
}

export = class StructureApiGenerator extends Generator {
  private name: string;
  private module: string;
  private fileConfigs: FileConfig[];

  public async prompting() {
    const { name } = await this.prompt(nameQuestion("Page", this.options.name));

    this.name = this.options.name || name;
  }

  public makeModule() {
    this.module = this.options.module || this.name;
  }

  public makeConfig() {
    this.fileConfigs = this.getFileConfig(this.config.getAll() as Config);
  }

  public writing() {
    this.fileConfigs.forEach(fileConfig => {
      this.fs.copyTpl(
        this.templatePath(`${fileConfig.templateName}`),
        this.destinationPath(
          `./${this.config.get("rootDir")}/${this.module}/page/${
            this.name
          }Page/${this.name}Page.${fileConfig.fileNameSuffix}`
        ),
        {
          name: this.name,
          nameCamelCase: camelCase(this.name),
          nameUpperCase: toUpper(this.name)
        }
      );
    });
  }

  private getFileConfig = (config: Config): FileConfig[] => [
    {
      templateName: `main.tsx`,
      fileNameSuffix: "tsx"
    },
    {
      templateName: `load.tsx`,
      fileNameSuffix: "load.tsx"
    },
    {
      templateName: `style.${config.styling}.ts`,
      fileNameSuffix: "style.ts"
    },
    {
      templateName: `spec.tsx`,
      fileNameSuffix: "spec.tsx"
    }
  ];
};
