import { Question } from "inquirer";
import camelCase from "lodash/fp/camelCase";
import Generator from "yeoman-generator";
import { nameQuestion } from "../../src/questions";
import { Config } from "../../src/config/Config";

interface FileConfigWithStringTemplate {
  templateName: string;
  fileNameSuffix?: string;
  question?: any;
}

interface FileConfigWithFunctionTemplate {
  templateName: (type: ComponentType) => string;
  fileNameSuffix: string;
  question?: Question;
}

type FileConfig = FileConfigWithStringTemplate | FileConfigWithFunctionTemplate;

enum ComponentType {
  CONNECTED = "connected",
  PLAIN = "plain"
}

interface FileConfigAnswers {
  type: ComponentType;
}

export = class StructureComponentGenerator extends Generator {
  private name: string;
  private module: string;
  private answers: FileConfigAnswers;
  private fileConfigs: FileConfig[];

  public async prompting() {
    const { name } = await this.prompt(nameQuestion("Component"));

    this.name = name;
  }

  public makeModule() {
    this.module = this.options.module || this.name;
  }

  public makeConfig() {
    this.fileConfigs = this.getFileConfig(this.config.getAll() as Config);
  }

  public async promptingFromConfig() {
    const questions = this.fileConfigs
      .map(fileConfig => fileConfig.question)
      .filter(question => !!question);

    this.answers = await this.prompt(questions);
  }

  public writing() {
    this.fileConfigs.forEach(async fileConfig => {
      this.fs.copyTpl(
        this.templatePath(this.getTemplatePath(fileConfig, this.answers)),
        this.destinationPath(
          `./${this.config.get("rootDir")}/${this.module}/component/${
            this.name
          }/${this.name}.${this.getFileNameSuffix(fileConfig)}`
        ),
        { name: this.name, nameCamelCase: camelCase(this.name) }
      );
    });
  }

  private getTemplatePath = (
    fileConfig: FileConfig,
    answers: FileConfigAnswers
  ): string => {
    if (typeof fileConfig.templateName === "function") {
      return fileConfig.templateName(answers.type);
    }

    return fileConfig.templateName as string;
  };

  private getFileNameSuffix = (fileConfig: FileConfig): string => {
    return fileConfig.fileNameSuffix || (fileConfig.templateName as string);
  };

  private getFileConfig = (config: Config): FileConfig[] => [
    {
      templateName: (type: ComponentType) => `component.${type}.tsx`,
      fileNameSuffix: "tsx",
      question: {
        type: "list",
        name: "type",
        message: "What's type of the Component",
        choices: [
          {
            name: `Plain component`,
            value: ComponentType.PLAIN
          },
          {
            name: "Connected component",
            value: ComponentType.CONNECTED
          }
        ]
      }
    },
    {
      templateName: `style.${config.styling}.ts`,
      fileNameSuffix: "style.ts"
    },
    {
      templateName: "story.tsx"
    },
    {
      templateName: "spec.tsx"
    }
  ];
};
