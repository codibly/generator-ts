import Generator from "yeoman-generator";
import traits from "../../traits";

export = class ConfigRollupGenerator extends Generator {
  public traits = traits(this);

  public configuring() {
    const packageJson = this.traits.readPackageJson();

    this.traits.extendPackageJson({
      main:
        !packageJson.main && !this.traits.usesLerna()
          ? "lib/index.js"
          : packageJson.main,
      module:
        !packageJson.module && !this.traits.usesLerna()
          ? "lib/index.es.js"
          : packageJson.module,
      scripts: {
        build: this.traits.usesLerna()
          ? "lerna exec -- rollup -c --config ../../rollup.config.js"
          : "rollup -c"
      },
      devDependencies: {
        rollup: "^1.0.2",
        "rollup-plugin-cleaner": "^0.2.0",
        "rollup-plugin-sourcemaps": "^0.4.2",
        "rollup-plugin-typescript2": "^0.20.1"
      }
    });
  }

  public writing() {
    this.fs.copy(
      this.templatePath("rollup.config.js"),
      this.destinationPath("rollup.config.js")
    );
    this.traits.addGitIgnoreEntries(
      [
        "### Rollup",
        this.traits.usesLerna() ? "/packages/**/lib" : "/lib",
        ".rpt2_cache"
      ].join("\n")
    );
  }

  public install() {
    this.yarnInstall();
  }
};
