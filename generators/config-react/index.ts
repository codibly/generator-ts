import Generator from "yeoman-generator";
import traits from "../../traits";

export = class ConfigReactGenerator extends Generator {
  public traits = traits(this);

  public configuring() {
    this.traits.extendPackageJson({
      dependencies: {
        react: "^16.8.6",
        "react-dom": "^16.8.6"
      },
      devDependencies: {
        "@testing-library/react": "^8.0.1",
        "@types/react": "^16.8.20",
        "@types/react-dom": "^16.8.4"
      },
      jest: {
        testEnvironment: "jsdom",
        setupFilesAfterEnv: ["@testing-library/react/cleanup-after-each"]
      }
    });
  }

  public install() {
    this.yarnInstall();
  }
};
