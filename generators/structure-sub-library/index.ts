import * as path from "path";
import Generator from "yeoman-generator";

interface Answers {
  name: string;
  directory: string;
  description: string;
  version: string;
  author: string;
  repository: string;
}

export = class StructureSubLibraryGenerator extends Generator {
  public answers: Partial<Answers> = {};

  public async prompting() {
    const packageJson = this._readPackageJson();

    this.answers = await this.prompt({
      type: "input",
      name: "name",
      message: "Your package name"
    });

    const questions: Generator.Questions = [
      {
        type: "input",
        name: "directory",
        message: "Your package directory",
        default: path.join(
          this._workspaceDirectory(),
          this._normalizePackageName(this.answers.name!)
        )
      },
      {
        type: "input",
        name: "description",
        message: "Your package description "
      },
      {
        type: "input",
        name: "version",
        message: "Initial version",
        default: "0.0.0"
      },
      {
        type: "input",
        name: "author",
        message: "Author of the package",
        default: packageJson.author
      },
      {
        type: "input",
        name: "repository",
        message: "Repository",
        default: packageJson.repository
      }
    ];

    const restAnswers = (await this.prompt(questions)) as Answers;

    this.answers = {
      ...this.answers,
      ...restAnswers
    };
  }

  public writing() {
    ["package.json", "src/index.ts", "test/index.spec.ts"].forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this._packageDestinationPath(file),
        this.answers
      );
    });
  }

  public install() {
    this.yarnInstall();
  }

  private _readPackageJson(): any {
    if (!this.fs.exists(this.destinationPath("package.json"))) {
      throw new Error(
        "You are trying to add package to monorepo but there is no package.json file. " +
          "Please ensure that you are in the monorepo root"
      );
    }

    return this.fs.readJSON(this.destinationPath("package.json"));
  }

  private _workspaceDirectory(): string {
    const packageJson = this._readPackageJson();

    if (!packageJson.workspaces) {
      throw new Error(
        "package.json doesn't have workspaces. " +
          "Please ensure that you are in the monorepo root and that you use yarn workspaces."
      );
    }
    if (packageJson.workspaces.length !== 1) {
      throw new Error(
        `package.json contains ${packageJson.workspaces.length} workspaces. ` +
          "This generator support only case with 1 workspace."
      );
    }
    const workspace = packageJson.workspaces[0];

    return path.dirname(workspace);
  }

  private _packageDestinationPath(filePath: string) {
    return this.destinationPath(path.join(this.answers.directory!, filePath));
  }

  private _normalizePackageName(name: string): string {
    return name
      .split("/")
      .filter(part => !part.startsWith("@"))
      .join("-");
  }
};
