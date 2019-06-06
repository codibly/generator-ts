import Generator from "yeoman-generator";
import traits from "../../traits";

export = class WebpackConfigGenerator extends Generator {
  public traits = traits(this);

  public configuring() {
    this.traits.extendPackageJson({
      scripts: {
        dev: "webpack-dev-server --open",
        build: "webpack -p"
      },
      devDependencies: {
        "@types/webpack": "^4.4.24",
        "@types/webpack-env": "^1.13.7",
        "clean-webpack-plugin": "^3.0.0",
        "file-loader": "^4.0.0",
        "fork-ts-checker-webpack-plugin": "^1.3.5",
        "html-webpack-plugin": "^3.2.0",
        "robotstxt-webpack-plugin": "^5.0.0",
        "ts-loader": "^6.0.2",
        "tsconfig-paths-webpack-plugin": "^3.2.0",
        webpack: "^4.29.0",
        "webpack-cli": "^3.2.1",
        "webpack-dev-server": "^3.1.14"
      }
    });
  }

  public writing() {
    ["webpack.config.js", "src/index.tsx", "src/index.html"].forEach(file => {
      this.fs.copy(this.templatePath(file), this.destinationPath(file));
    });
  }

  public install() {
    this.yarnInstall();
  }
};
