import * as path from "path";
import Generator from "yeoman-generator";
import traits from "../../traits";

interface Answers {
  structure: "single" | "multi";
}

export = class LibraryGenerator extends Generator {
  public traits = traits(this);

  public answers: Partial<Answers> = {};

  public initializing() {
    this.composeWith(require.resolve("../package"), {});
    this.composeWith(require.resolve("../config-editor"), {});
    this.composeWith(require.resolve("../config-ignore"), {});
    this.composeWith(require.resolve("../config-test"), {});
    this.composeWith(require.resolve("../config-lint"), {});
    this.composeWith(require.resolve("../config-doc"), {});
    this.composeWith(require.resolve("../config-rollup"), {});
  }

  public async prompting() {
    const questions: Generator.Questions = [
      {
        type: "list",
        name: "structure",
        message: "Library structure",
        choices: [
          {
            name: "Single package repository",
            value: "single"
          },
          {
            name: "Multi package repository (monorepo)",
            value: "multi"
          }
        ]
      }
    ];

    this.answers = (await this.prompt(questions)) as Answers;
  }

  public configuring() {
    switch (this.answers.structure) {
      case "single":
        this.traits.extendPackageJson({
          scripts: {
            release: "standard-version",
            publish: "yarn publish"
          },
          devDependencies: {
            "standard-version": "^5.0.2"
          }
        });
        break;

      case "multi":
        this.fs.copyTpl(
          this.templatePath("multi/lerna.json"),
          this.destinationPath("lerna.json"),
          {
            ...this.answers,
            ...this.config.getAll()
          }
        );

        this.traits.extendPackageJson({
          private: true,
          scripts: {
            release: "lerna bootstrap && lerna version",
            publish: "lerna publish from-git"
          },
          workspaces: ["packages/*"],
          devDependencies: {
            lerna: "^3.11.0"
          }
        });

        break;
    }
  }

  public writing() {
    switch (this.answers.structure) {
      case "single":
        ["src/index.ts", "test/index.spec.ts"].forEach(file => {
          this.fs.copyTpl(
            this.templatePath(path.join("single", file)),
            this.destinationPath(file),
            {
              ...this.answers,
              ...this.config.getAll()
            }
          );
        });
        break;

      case "multi":
        break;
    }
  }

  public install() {
    this.yarnInstall();
  }
};
