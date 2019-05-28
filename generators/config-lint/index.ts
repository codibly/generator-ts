import Generator from "yeoman-generator";
import traits from "../../traits";

export = class ConfigLintGenerator extends Generator {
  public traits = traits(this);

  public configuring() {
    const scripts = this.traits.readPackageJson().scripts || {};

    this.traits.extendPackageJson({
      scripts: {
        test:
          scripts.test || 'echo "Error: no test script specified" && exit 1',
        build:
          scripts.build || 'echo "Error: no build script specified" && exit 1',
        lint: "tslint --project tsconfig.json",
        format: 'prettier --write "src/**/*"',
        precommit: "lint-staged && yarn build && yarn test",
        commit: "./node_modules/.bin/git-cz"
      },
      devDependencies: {
        "@commitlint/config-conventional": "^7.5.0",
        commitlint: "^7.5.2",
        "git-cz": "^3.0.1",
        husky: "^2.3.0",
        "lint-staged": "^8.1.0",
        prettier: "^1.15.3",
        tslint: "^5.12.0",
        "tslint-config-prettier": "^1.18.0"
      },
      commitlint: {
        extends: ["@commitlint/config-conventional"]
      },
      config: {
        commitizen: {
          path: "./node_modules/cz-conventional-changelog"
        }
      },
      husky: {
        hooks: {
          "pre-commit": "lint-staged && yarn build && yarn test",
          "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
        }
      },
      "lint-staged": {
        "*.{ts,tsx}": [
          "tslint --fix --project tsconfig.json",
          "prettier --write",
          "git add"
        ],
        "*.{js,yml,json,md,html}": ["prettier --write", "git add"]
      }
    });
    this.traits.addReadmeBadges([
      "[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)",
      "[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)"
    ]);
  }

  public writing() {
    this.fs.copy(
      this.templatePath("tslint.json"),
      this.destinationPath("tslint.json")
    );
  }

  public install() {
    this.yarnInstall();
  }
};
