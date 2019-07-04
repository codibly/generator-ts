import Generator from "yeoman-generator";
import traits from "../../traits";

export = class ConfigTestGenerator extends Generator {
  public traits = traits(this);

  public configuring() {
    this.traits.extendPackageJson({
      scripts: {
        test: "jest"
      },
      devDependencies: {
        "@types/jest": "^24.0.0",
        jest: "^24.1.0",
        "jest-haste-map": "^24.4.0",
        "jest-resolve": "^24.4.0",
        "ts-jest": "^24.0.0"
      }
    });
    this.traits.addReadmeBadges(
      "[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)"
    );
  }

  public writing() {
    this.fs.copy(this.templatePath(""), this.destinationPath(""));
  }

  public install() {
    this.yarnInstall();
  }
};
