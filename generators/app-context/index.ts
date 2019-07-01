import Generator from "yeoman-generator";
import traits from "../../traits";

export = class AppContextGenerator extends Generator {
  public traits = traits(this);

  public configuring() {
    this.traits.extendPackageJson({
      dependencies: {
        logrocket: "",
        "logrocket-react": "",
        "react-router": "",
        "react-error-boundary": "",
        "react-redux": "",
        redux: ""
      },
      devDependencies: {
        "@types/logrocket": "",
        "@types/logrocket-react": "",
        "@types/react-router": "",
        "@types/react-error-boundary": "",
        "@types/react-redux": "",
        "@types/redux": ""
      }
    });
  }

  public writing() {
    const appContextPath = `${this.config.get("rootDir")}/App`;

    ["index.tsx", "environment.ts"].forEach(file => {
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(`${appContextPath}/${file}`)
      );
    });
  }

  public install() {
    this.yarnInstall();
  }
};
