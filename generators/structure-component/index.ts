import camelCase from "camel-case";
import Generator from "yeoman-generator";
import { nameQuestion } from "../../src/questions";

interface FileConfigWithStringTemplate {
  templateName: string;
  fileNameSuffix?: string;
  questions?: any;
}

interface FileConfigWithFunctionTemplate {
  templateName: (type: ComponentType) => string;
  fileNameSuffix: string;
  questions?: any;
}

type FileConfig = FileConfigWithStringTemplate | FileConfigWithFunctionTemplate;

enum ComponentType {
  CLASS = "class",
  FUNCTION = "function"
}

export = class StructureComponentGenerator extends Generator {
  private name: any;
  private answers: any;

  private fileConfigs: FileConfig[] = [
    {
      templateName: (type: ComponentType) => `component.${type}.tsx`,
      fileNameSuffix: "tsx",
      questions: {
        type: "list",
        name: "type",
        message: "What's type of the Component",
        choices: [
          {
            name: `Function component (Stateless)`,
            value: ComponentType.FUNCTION
          },
          {
            name: "Class component (Stateful)",
            value: ComponentType.CLASS
          }
        ]
      }
    },
    {
      templateName: `style.${this.config.get("styling") || "jss"}.ts`,
      fileNameSuffix: "style.ts"
    },
    {
      templateName: "story.tsx"
    },
    {
      templateName: "spec.tsx"
    }
  ];

  public async prompting() {
    const { name } = await this.prompt(nameQuestion("Component"));

    this.name = name;
  }

  public async promptingFromConfig() {
    const questions = await this.fileConfigs
      .filter(fileConfig => fileConfig.questions)
      .reduce((acc, current) => acc.concat(current.questions), []);

    this.answers = await this.prompt(questions);
  }

  public writing() {
    this.fileConfigs.forEach(async fileConfig => {
      this.fs.copyTpl(
        this.templatePath(this.getTemplatePath(fileConfig, this.answers)),
        this.destinationPath(
          `./${this.config.get("rootDir")}/${this.options.module}/component/${
            this.name
          }/${this.name}.${this.getFileNameSuffix(fileConfig)}`
        ),
        { name: this.name, nameCamelCase: camelCase(this.name) }
      );
    });
  }

  private getTemplatePath = (fileConfig: FileConfig, answers: any): string => {
    if (typeof fileConfig.templateName === "function") {
      return fileConfig.templateName(answers.type);
    }

    return fileConfig.templateName as string;
  };

  private getFileNameSuffix = (fileConfig: FileConfig): string => {
    return fileConfig.fileNameSuffix || (fileConfig.templateName as string);
  };
};
