"use strict";
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const emoji = tslib_1.__importStar(require("node-emoji"));
const yeoman_generator_1 = tslib_1.__importDefault(require("yeoman-generator"));
module.exports = class extends yeoman_generator_1.default {
  prompting() {
    return tslib_1.__awaiter(this, void 0, void 0, function*() {
      this.log(
        `Welcome to the ${chalk_1.default.greenBright(
          "Codibly TypeScript"
        )} generator! ${emoji.get("sparkles")}`
      );
      const { task } = yield this.prompt([
        {
          type: "list",
          name: "task",
          message: "What do you want to generate",
          choices: [
            {
              name: `Library ${emoji.get("package")}`,
              value: "library"
            },
            {
              name: `Application ${emoji.get("rocket")}`,
              value: "app"
            },
            {
              name: `Structure ${emoji.get("large_orange_diamond")}`,
              value: "structure"
            },
            {
              name: `Configuration ${emoji.get("gear")}`,
              value: "config"
            }
          ]
        }
      ]);
      this.composeWith(require.resolve(`./${task}`), {});
    });
  }
};
