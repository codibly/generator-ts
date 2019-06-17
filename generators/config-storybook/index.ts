import Generator from "yeoman-generator";
import traits from "../../traits";

export = class ConfigStorybookGenerator extends Generator {
  public traits = traits(this);

  public configuring() {
    this.traits.extendPackageJson({
      scripts: {
        storybook: "start-storybook",
        "storybook:build": "build-storybook -o storybook_dist"
      },
      devDependencies: {
        "@babel/core": "^7.0.0",
        "@storybook/react": "^5.0.5",
        "@types/storybook__react": "^4.0.0",
        "babel-loader": "^8.0.0"
      }
    });
    this.traits.addReadmeBadges(
      "[![uses Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://storybook.js.org/)"
    );
  }

  public writing() {
    [
      ".storybook/config.ts",
      ".storybook/webpack.config.js",
      "src/index.story.tsx"
    ].forEach(file => {
      this.fs.copy(this.templatePath(file), this.destinationPath(file));
    });
  }

  public install() {
    this.yarnInstall();
  }
};
