# generator-codibly-ts

[![npm version](https://img.shields.io/npm/v/generator-codibly-ts.svg)](https://www.npmjs.com/package/generator-codibly-ts)
[![npm beta version](https://img.shields.io/npm/v/generator-codibly-ts/beta.svg)](https://www.npmjs.com/package/generator-codibly-ts)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

> [Yeoman](https://yeoman.io/) generator for TypeScript projects by Codibly 🧐

## Installation

##### Prerequisites

- [`yarn`](https://yarnpkg.com/) _- it's our default package manager_
- [`yeoman`](https://yeoman.io/) (`yarn global add yo`)

##### Installation command

```
yarn global add generator-codibly-ts
```

And that's it - you are ready to generate ✨

## Usage

To generate something use `yo codibly-ts` command - it will guide you through the
generation process.

There four types of frames you can generate

- **Structure** creates choosen part of an app structure according to Codibly guidelines
- **Library**
- **Application**
- **Configuration**

## Structure

To generate part of an app structure according to Codibly guidelines run `yo codibly-ts:strucutre`.

You will be asked to choose one of four parts of the structure

- **Module** creates structure for business model - generates **API** and **Model** structures under given **Module** name
- **API** creates `APIStrucutre` with given structure name
- **Component** creates `ComponentStrucutre` with given structure name
- **Model** creates `ModelStrucutre` with given structure name🚧
- **Store** under construction

## Config

You can customize the generator output by creating `.yo-rc.json` file in your project. and setting up its values.

Important thing is to put `"generator-codibly-ts"` field into this file.
Under this key you can put the following fields:

| field   | value                                             |
| ------- | ------------------------------------------------- |
| styling | "jss" &#124; "styled-components" &#124; "emotion" |

Example config

```
{
  "generator-codibly-ts": {
    "styling": "emotion"
  }
}
```

## License

MIT
