import chalk from "chalk";
import Generator from "yeoman-generator";
import traits from "../../traits";

export = class ConfigReleaseGenerator extends Generator {
  public traits = traits(this);

  public configuring() {
    this.traits.extendPackageJson({
      scripts: {
        "semantic-release": "semantic-release"
      },
      release: {
        branches: [
          "master",
          {
            name: "beta",
            prerelease: true
          },
          {
            name: "alpha",
            prerelease: true
          }
        ]
      },
      devDependencies: {
        "semantic-release": "^16.0.0-beta.18"
      }
    });
    this.traits.addReadmeBadges([
      "[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)"
    ]);
  }

  public install() {
    this.yarnInstall();
  }

  public end() {
    this.log(
      `To finish release setup, please install semantic-release-cli (${chalk.green(
        "npm install -g semantic-release-cli"
      )}) ` +
        `and then run ${chalk.green(
          "semantic-release-cli setup"
        )} command. Probably it will override your semantic-release version ` +
        `- please discard this change when committing.`
    );
  }
};
