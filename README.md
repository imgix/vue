<!-- ix-docs-ignore -->

![imgix logo](https://assets.imgix.net/sdk-imgix-logo.svg)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fimgix%2Fvue-imgix.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fimgix%2Fvue-imgix?ref=badge_shield)

`vue-imgix` provides an API for integrating [imgix](https://www.imgix.com/) into Vue sites.

[![npm version](https://img.shields.io/npm/v/vue-imgix.svg)](https://www.npmjs.com/package/vue-imgix)
[![Build Status](https://travis-ci.org/imgix/vue-imgix.svg?branch=master)](https://travis-ci.org/imgix/vue-imgix)
[![Downloads](https://img.shields.io/npm/dm/vue-imgix.svg)](https://www.npmjs.com/package/vue-imgix)
[![License](https://img.shields.io/npm/l/vue-imgix)](https://github.com/imgix/vue-imgix/blob/master/LICENSE)
[![Dependencies Status](https://david-dm.org/imgix/vue-imgix.svg)](https://david-dm.org/imgix/vue-imgix)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

---

# ⚠️ Work in Progress. This library is currently in development. We're planning to have a stable version of this library shipped soon, so please keep an eye on this space!

<!-- /ix-docs-ignore -->

<!-- NB: Run `npx markdown-toc README.md --maxdepth 4 | sed -e 's/[[:space:]]\{2\}/    /g'` to generate TOC :) -->

<!-- prettier-ignore-start -->

- [Overview / Resources](#overview--resources)
- [Get Started](#get-started)
- [Usage](#usage)
    * [Examples](#examples)
        + [Basic Use Case](#basic-use-case)
        + [Flexible Image Rendering](#flexible-image-rendering)
        + [Fixed Image Rendering (i.e. non-flexible)](#fixed-image-rendering-ie-non-flexible)
    * [Advanced Examples](#advanced-examples)
        + [buildUrlObject](#buildurlobject)
        + [buildUrl](#buildurl)
        + [buildSrcSet](#buildsrcset)
- [Code of Conduct](#code-of-conduct)
- [Contributors](#contributors)


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

## Usage

The main idea here is that you should be able to use this component just as you would an `<img />` tag.

### Examples

#### Basic Use Case

To render a simple image that will display an image based on the browser's dpr and the width of the rendered element using the power of srcsets, vue-imgix can be used as follows:

```html
<Imgix :src="examples/pione.jpg" sizes="100vw" />
```

**Please note:** `100vw` is an appropriate `sizes` value for a full-bleed image. If your image is not full-bleed, you should use a different value for `sizes`. [Eric Portis' "Srcset and sizes"](https://ericportis.com/posts/2014/srcset-sizes/) article goes into depth on how to use the `sizes` attribute.

This will generate HTML similar to the following:

```html
<img
  src="https://assets.imgix.net/examples/pione.jpg?auto=format"
  sizes="100vw"
  srcset="
    https://assets.imgix.net/examples/pione.jpg?auto=format&amp;w=100 100w,
    https://assets.imgix.net/examples/pione.jpg?auto=format&amp;w=200 200w,
    ...
  "
/>
```

#### Flexible Image Rendering

This component acts dynamically by default. The component will leverage `srcset` and `sizes` to render the right size image for its container. This is an example of this responsive behaviour.

`sizes` should be set properly for this to work well, and some styling should be used to set the size of the component rendered. Without `sizes` and correct styling the image might render at full-size.

`./styles.css`

```css
.App {
  display: flex;
}

.App > img {
  margin: 10px auto;
  width: 10vw;
  height: 200px;
}
```

`./app.js`

```html
<div className="App">
  <Imgix src="examples/pione.jpg" sizes="calc(10% - 10px)" />
</div>
```

**Aspect Ratio:** A developer can pass a desired aspect ratio, which will be used when
generating srcsets to resize and crop your image as specified. For the `ar` parameter to take effect, ensure that the `fit` parameter is set to `crop`.

```html
<div className="App">
  <Imgix
    src="examples/pione.jpg"
    sizes="calc(10% - 10px)"
    imgixParams="{ ar: '16:9' }"
  />
</div>
```

The aspect ratio is specified in the format `width:height`. Either dimension can be an integer or a float. All of the following are valid: 16:9, 5:1, 1.92:1, 1:1.67.

#### Fixed Image Rendering (i.e. non-flexible)

If the fluid, dynamic nature explained above is not desired, the width and height can be set explicitly.

```js
<Imgix
  src="examples/pione.jpg"
  width="100" // This sets what resolution the component should load from the CDN and the size of the resulting image
  height="200"
/>
```

Fixed image rendering will automatically append a variable `q` parameter mapped to each `dpr` parameter when generating a srcset. This technique is commonly used to compensate for the increased filesize of high-DPR images. Since high-DPR images are displayed at a higher pixel density on devices, image quality can be lowered to reduce overall filesize without sacrificing perceived visual quality. For more information and examples of this technique in action, see [this blog post](https://blog.imgix.com/2016/03/30/dpr-quality).
This behavior will respect any overriding `q` value passed in via `imgixParams` and can be disabled altogether with the boolean property `disableQualityByDPR`.

```js
<Imgix src="image.jpg" width="100" disableQualityByDPR />
```

will generate the following srcset:

```html
https://domain.imgix.net/image.jpg?q=75&w=100&dpr=1 1x,
https://domain.imgix.net/image.jpg?q=50&w=100&dpr=2 2x,
https://domain.imgix.net/image.jpg?q=35&w=100&dpr=3 3x,
https://domain.imgix.net/image.jpg?q=23&w=100&dpr=4 4x,
https://domain.imgix.net/image.jpg?q=20&w=100&dpr=5 5x
```

### Advanced Examples

For advanced use cases which go above the basic usage outlined above, such as lazy loading, or integration with other components or libraries, this library provides a set of low-level APIs.

#### buildUrlObject

This function is provided a convenient way to generate values to pass to the src and srcset attributes.

In a component:

```html
<template>
  <img
    :src="advancedSrcObject.src"
    :srcset="advancedSrcObject.srcset"
    sizes="50vw"
  />
</template>

<script>
  import { buildUrlObject } from '@/plugins/vue-imgix';

  // NB: Make sure initVueImgix has been called before this code runs
  export default {
    name: 'advanced-build-url-object',

    computed: {
      advancedSrcObject: () =>
        buildUrlObject('examples/pione.jpg', {
          auto: 'format',
        }),
    },
  };
</script>
```

#### buildUrl

In addition to the helper above, we provide `buildURL` from imgix-core-js to help developers to create any URL they need.

```html
<template>
  <img :src="advancedUrl" />
</template>

<script>
  import { buildUrl } from '@/plugins/vue-imgix';

  // NB: Make sure initVueImgix has been called before this code runs
  export default {
    name: 'advanced-build-url',

    computed: {
      advancedUrl: () =>
        buildUrl('examples/pione.jpg', {
          auto: 'format',
        }),
    },
  };
</script>
```

#### buildSrcSet

We also provide `buildSrcSet` from imgix-core-js to help developers to create any srcset URL they need.

```html
<template>
  <img :src="advancedSrc" :srcset="advancedSrcSet" />
</template>

<script>
  import { buildUrl, buildSrcSet } from '@/plugins/vue-imgix';

  // NB: Make sure initVueImgix has been called before this code runs
  export default {
    name: 'advanced-build-srcset',

    computed: {
      advancedUrl: () =>
        buildUrl('examples/pione.jpg', {
          auto: 'format',
        }),
      advancedSrcSet: () =>
        buildSrcSet('examples/pione.jpg', {
          auto: 'format',
        }),
    },
  };
</script>
```

## Code of Conduct

imgix is dedicated to providing a harassment-free experience for everyone, regardless of gender, gender identity and expression, sexual orientation, disability, physical appearance, body size, race, or religion. We do not tolerate harassment of participants in any form.

This code of conduct applies to all imgix sponsored spaces both online and off, including our open-source projects. Anyone who violates this code of conduct may be sanctioned or expelled from these spaces at the discretion of the imgix Anti-Abuse Team (codeofconduct@imgix.com).

[Our full Code of Conduct can be found here.](https://github.com/imgix/code-of-conduct)

## Contributors

Contributions are a vital part of this library and imgix's commitment to open-source. We welcome all contributions which align with this project's goals. More information can be found in the [contributing documentation](CONTRIBUTING.md).

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/frederickfogerty"><img src="https://avatars0.githubusercontent.com/u/615334?v=4" width="100px;" alt=""/><br /><sub><b>Frederick Fogerty</b></sub></a><br /><a href="https://github.com/imgix/vue-imgix/commits?author=frederickfogerty" title="Code">💻</a> <a href="https://github.com/imgix/vue-imgix/commits?author=frederickfogerty" title="Documentation">📖</a> <a href="#maintenance-frederickfogerty" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fimgix%2Fvue-imgix.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fimgix%2Fvue-imgix?ref=badge_large)