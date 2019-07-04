import Generator from "yeoman-generator";
import traits from "../../traits";

export = class AppContextGenerator extends Generator {
  public traits = traits(this);

  public configuring() {
    this.traits.extendPackageJson({
      dependencies: {
        "@date-io/luxon": "^1.3.7",
        "@emotion/styled": "^10.0.14",
        "@material-ui/core": "^4.1.3",
        "@material-ui/icons": "^4.2.1",
        "@rebean/snackbar": "^0.0.2",
        "connected-react-router": "^6.4.0",
        "emotion-theming": "^10.0.14",
        history: "^4.9.0",
        logrocket: "^1.0.1",
        "logrocket-react": "^3.0.0",
        "material-ui-pickers": "^2.2.4",
        qs: "^6.7.0",
        "react-dom": "^16.8.6",
        "react-error-boundary": "^1.2.5",
        "react-intl": "^2.9.0",
        "react-loadable": "^5.5.0",
        "react-loadable-visibility": "^3.0.1",
        "react-redux": "^7.1.0",
        "react-router": "^5.0.1",
        "react-router-dom": "^5.0.1",
        redux: "^4.0.1",
        "redux-actions": "^2.6.4",
        "redux-detector": "^1.0.0-rc.4",
        "redux-devtools-extension": "^2.13.8",
        "redux-thunk": "^2.3.0",
        reselect: "^4.0.0",
        "react-autosuggest": "^9.4.3",
        "draft-js": "^0.10.5",
        "react-content-loader": "^4.2.1",
        "react-dropzone": "^10.1.5",
        luxon: "^1.16.0",
        revalidate: "^1.2.0",
        "http-status-codes": "^1.3.2",
        formik: "^1.5.7",
        "formik-material-ui": "^0.0.18",
        axios: "^0.19.0"
      },
      devDependencies: {
        "@types/node": "^12.0.10",
        "@testing-library/react": "^8.0.4",
        "utility-types": "^3.7.0",
        "@types/history": "^4.7.2",
        "@types/react-intl": "^2.3.18",
        "@types/react-redux": "^7.1.1",
        "@types/react-router": "^5.0.2",
        "@types/react-router-dom": "^4.3.4",
        "@types/redux-actions": "2.3.1",
        "jest-emotion": "^10.0.14",
        "jest-image-snapshot": "^2.9.0",
        "axios-mock-adapter": "^1.16.0",
        "@types/luxon": "^1.15.1",
        "jest-dom": "^3.5.0",
        "jest-sonar-reporter": "^2.0.0",
        "jest-junit": "^6.4.0"
      }
    });
  }

  public writing() {
    ["@codibly", "Api", "App", "Auth", "User"].forEach(module => {
      const moduleContextPath = `${this.config.get("rootDir")}/${module}`;

      this.fs.copy(
        this.templatePath(`${module}`),
        this.destinationPath(`${moduleContextPath}`)
      );
    });
  }
  public writingCustomType() {
    const typeDir = "type";

    ["logrocket-react/index.d.ts"].forEach(file => {
      this.fs.copy(
        this.templatePath(`${typeDir}/${file}`),
        this.destinationPath(`${typeDir}/${file}`)
      );
    });
  }

  public install() {
    this.yarnInstall();
  }
};
