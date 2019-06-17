import { storiesOf } from "@storybook/react";
import React from "react";

const HelloWorld = () => <div>Hello world!</div>;

storiesOf("HelloWorld", module).add("with text", () => <HelloWorld />);
