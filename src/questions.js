"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nameRequired_1 = require("./validator/nameRequired");
exports.nameQuestion = (structure, nameFromModule) => ({
  type: "input",
  name: "name",
  message: `What's the ${structure} name?`,
  validate: nameRequired_1.nameRequired,
  when: !nameFromModule
});
