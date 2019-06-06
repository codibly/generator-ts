import Generator from "yeoman-generator";
import traits from "../../traits";

export = class ConfigRollupGenerator extends Generator {
  public traits = traits(this);

  public configuring() {
    const packageJson = this.traits.readPackageJson();

    this.traits.extendPackageJson({
      main: !packageJson.main ? "lib/index.js" : packageJson.main,
      module: !packageJson.module ? "lib/index.es.js" : packageJson.module,
      scripts: {
        build: "rollup -c"
      },
      devDependencies: {
        rollup: "^1.0.2",
        "rollup-plugin-cleaner": "^0.2.0",
        "rollup-plugin-sourcemaps": "^0.4.2",
        "rollup-plugin-typescript2": "^0.21.1"
      }
    });
  }

  public writing() {
    ["rollup.config.js", "src/index.ts"].forEach(file =>
      this.fs.copy(this.templatePath(file), this.destinationPath(file))
    );
    this.traits.addGitIgnoreEntries(
      ["### Rollup", "/lib", ".rpt2_cache"].join("\n")
    );
  }

  public install() {
    this.yarnInstall();
  }
};
