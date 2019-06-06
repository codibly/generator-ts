import * as path from "path";
import Generator from "yeoman-generator";
import traits from "../../traits";

interface Answers {
  name: string;
  description: string;
  version: string;
  author: string;
  copyright: string;
  repository: string;
}

export = class PackageGenerator extends Generator {
  public traits = traits(this);

  public answers: Partial<Answers> = {};

  public async prompting() {
    const questions: Generator.Questions = [
      {
        type: "input",
        name: "name",
        message: "Your package name",
        default: path.basename(process.cwd())
      },
      {
        type: "input",
        name: "description",
        message: "Your package description "
      },
      {
        type: "input",
        name: "version",
        message: "Initial version of the package",
        default: "0.0.0-semantic-release"
      },
      {
        type: "input",
        name: "repository",
        message: "Your package repository",
        default: this.traits.getGitRepository()
      },
      {
        type: "input",
        name: "author",
        message: "Author of the package",
        default: this.traits.getGitAuthor()
      }
    ];

    this.answers = (await this.prompt(questions)) as Answers;

    this.config.set("name", this.answers.name);
    this.config.set("description", this.answers.description);
    this.config.set("version", this.answers.version);
    this.config.set("repository", this.answers.repository);
    this.config.set("author", this.answers.author);
  }

  public configuring() {
    [".travis.yml", "LICENSE", "package.json", "README.md"].forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.answers
      );
    });

    this.traits.extendPackageJson({
      name: this.answers.name,
      version: this.answers.version,
      description: this.answers.description,
      repository: this.answers.repository,
      author: this.answers.author
    });
  }

  public install() {
    this.yarnInstall();
  }
};
