<!-- ix-docs-ignore -->

![imgix logo](https://assets.imgix.net/sdk-imgix-logo.svg)

`vue-imgix` provides an API for integrating [imgix](https://www.imgix.com/) into Vue sites.

[![npm version](https://img.shields.io/npm/v/vue-imgix.svg)](https://www.npmjs.com/package/vue-imgix)
[![Build Status](https://travis-ci.org/imgix/vue-imgix.svg?branch=master)](https://travis-ci.org/imgix/vue-imgix)
[![Downloads](https://img.shields.io/npm/dm/vue-imgix.svg)](https://www.npmjs.com/package/vue-imgix)
[![License](https://img.shields.io/npm/l/vue-imgix)](https://github.com/imgix/vue-imgix/blob/master/LICENSE)
[![Dependencies Status](https://david-dm.org/imgix/vue-imgix.svg)](https://david-dm.org/imgix/vue-imgix)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-22-orange.svg?style=flat-square)](#contributors-)

---

<!-- /ix-docs-ignore -->

<!-- NB: Run `npx markdown-toc README.md --maxdepth 4 | sed -e 's/[[:space:]]\{2\}/    /g'` to generate TOC :) -->

<!-- prettier-ignore-start -->

- [Overview / Resources](#overview--resources)
- [Get Started](#get-started)
- [Development](#development)
    * [Project setup](#project-setup)
    * [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    * [Compiles and minifies for production](#compiles-and-minifies-for-production)
    * [Run your unit tests](#run-your-unit-tests)
    * [Run your end-to-end tests](#run-your-end-to-end-tests)
    * [Lints and fixes files](#lints-and-fixes-files)
    * [Customize configuration](#customize-configuration)


<!-- prettier-ignore-end -->

## Overview / Resources

**Before you get started with vue-imgix**, it's _highly recommended_ that you read Eric Portis' [seminal article on `srcset` and `sizes`](https://ericportis.com/posts/2014/srcset-sizes/). This article explains the history of responsive images in responsive design, why they're necessary, and how all these technologies work together to save bandwidth and provide a better experience for users. The primary goal of react-imgix is to make these tools easier for developers to implement, so having an understanding of how they work will significantly improve your react-imgix experience.

Below are some other articles that help explain responsive imagery, and how it can work alongside imgix:

- [Using imgix with `<picture>`](https://docs.imgix.com/tutorials/using-imgix-picture-element). Discusses the differences between art direction and resolution switching, and provides examples of how to accomplish art direction with imgix.
- [Responsive Images with `srcset` and imgix](https://docs.imgix.com/tutorials/responsive-images-srcset-imgix). A look into how imgix can work with `srcset` and `sizes` to serve the right image.

## Get Started

Firstly, follow this [quick start guide](https://docs.imgix.com/setup/quick-start) to set-up an imgix account.

Then, install vue-imgix with the following commands, depending on your package manager.

- **NPM**: `npm install vue-imgix`
- **Yarn**: `yarn add vue-imgix`

This module exports two transpiled versions. If a ES6-module-aware bundler is being used to consume this module, it will pick up an ES6 module version and can perform tree-shaking. **If you are not using ES6 modules, you don't have to do anything.**

Finally, vue-imgix needs to be initialized before if can be used in components. Modify `App.vue` or similar to include the following:

```js
import { initVueImgix } from 'vue-imgix';

initVueImgix({
  domain: "<your company's imgix domain>",
});
```

And that's all you need to get started! Have fun!

## Contributing

Contributions are a vital part of this library and imgix's commitment to open-source. We welcome all contributions which align with this project's goals. More information can be found in the [contributing documentation](CONTRIBUTING.md).






## Code of Conduct

imgix is dedicated to providing a harassment-free experience for everyone, regardless of gender, gender identity and expression, sexual orientation, disability, physical appearance, body size, race, or religion. We do not tolerate harassment of participants in any form.

This code of conduct applies to all imgix sponsored spaces both online and off, including our open-source projects. Anyone who violates this code of conduct may be sanctioned or expelled from these spaces at the discretion of the imgix Anti-Abuse Team (codeofconduct@imgix.com).

[Our full Code of Conduct can be found here.](https://github.com/imgix/code-of-conduct)
