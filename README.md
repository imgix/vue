<!-- ix-docs-ignore -->

⚠️ **Work in Progress. This library is currently in development. We're planning to have a stable version of this library shipped soon, so please keep an eye on this space!**

⚠️ **These docs are for the beta channel of this library. To view the docs for stable channel, [go here](https://github.com/imgix/vue-imgix/tree/master).**

![imgix logo](https://assets.imgix.net/sdk-imgix-logo.svg)

`vue-imgix` is a client library for generating URLs with [imgix](https://www.imgix.com/).

[![npm version](https://img.shields.io/npm/v/vue-imgix.svg)](https://www.npmjs.com/package/vue-imgix)
[![Build Status](https://travis-ci.org/imgix/vue-imgix.svg?branch=master)](https://travis-ci.org/imgix/vue-imgix)
[![Downloads](https://img.shields.io/npm/dm/vue-imgix.svg)](https://www.npmjs.com/package/vue-imgix)
[![License](https://img.shields.io/npm/l/vue-imgix)](https://github.com/imgix/vue-imgix/blob/master/LICENSE)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fimgix%2Fvue-imgix.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fimgix%2Fvue-imgix?ref=badge_shield)
[![Dependencies Status](https://david-dm.org/imgix/vue-imgix.svg)](https://david-dm.org/imgix/vue-imgix)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

---

<!-- /ix-docs-ignore -->

<!-- NB: Run `npx markdown-toc README.md --maxdepth 4 | sed -e 's/[[:space:]]\{2\}/    /g'` to generate TOC :) -->

<!-- prettier-ignore-start -->

- [Overview / Resources](#overview--resources)
- [Get Started](#get-started)
- [Configure](#configure)
- [Usage](#usage)
    * [Examples](#examples)
        + [Basic Use Case](#basic-use-case)
        + [Flexible Image Rendering](#flexible-image-rendering)
        + [Fixed Image Rendering (i.e. non-flexible)](#fixed-image-rendering-ie-non-flexible)
    * [Advanced Examples](#advanced-examples)
        + [buildUrlObject](#buildurlobject)
        + [buildUrl](#buildurl)
        + [buildSrcSet](#buildsrcset)
        + [Custom attribute mapping](#custom-attribute-mapping)
        + [Custom srcset width](#custom-srcset-width)
        + [Width Tolerance](#width-tolerance)
        + [Minimum and Maximum Width Ranges](#minimum-and-maximum-width-ranges)
- [What is the `ixlib` param on every request?](#what-is-the-ixlib-param-on-every-request)
- [Code of Conduct](#code-of-conduct)
- [Contributors](#contributors)
- [License](#license)


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

## Configure

Vue-imgix needs to be initialized with a minimal configuration before it can be used in components. Modify `App.vue` or similar to include the following:

```js
import Vue from 'vue';
import VueImgix from 'vue-imgix';

Vue.use(VueImgix, {
  domain: "<your company's imgix domain>",
  defaultIxParams: {
    auto: 'format',
  },
});
```

**NB:** This enables the [auto format imgix parameter](https://docs.imgix.com/apis/url/auto/auto#format) by default for all images, which we recommend to reduce image size, but you might choose to turn this off.

And that's all you need to get started! Have fun!

⚠️ Currently this library does not explicitly support Vue 3 as we are waiting for its public release and a stable API. Once this happens, we will implement official support as soon as we can! We will also be supporting Vue 2 for the official support timeline (18 months) after we release Vue 3 support.

## Usage

The main idea here is that you should be able to use this component just as you would an `<img />` tag.

### Examples

#### Basic Use Case

To render a simple image that will display an image based on the browser's dpr and the width of the rendered element using the power of srcsets, vue-imgix can be used as follows:

```html
<ix-img src="examples/pione.jpg" sizes="100vw" />
```

[![Edit festive-mclean-6risg](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/festive-mclean-6risg?fontsize=14&hidenavigation=1&theme=dark)

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
  <ix-img src="examples/pione.jpg" sizes="calc(10% - 10px)" />
</div>
```

**Aspect Ratio:** A developer can pass a desired aspect ratio, which will be used when
generating srcsets to resize and crop your image as specified. For the `ar` parameter to take effect, ensure that the `fit` parameter is set to `crop`.

```html
<div className="App">
  <ix-img
    src="examples/pione.jpg"
    sizes="calc(10% - 10px)"
    imgixParams="{ ar: '16:9', fit: 'crop' }"
  />
</div>
```

The aspect ratio is specified in the format `width:height`. Either dimension can be an integer or a float. All of the following are valid: 16:9, 5:1, 1.92:1, 1:1.67.

#### Fixed Image Rendering (i.e. non-flexible)

If the fluid, dynamic nature explained above is not desired, the width and height can be set explicitly.

```js
<ix-img
  src="examples/pione.jpg"
  width="100" // This sets what resolution the component should load from the CDN and the size of the resulting image
  height="200"
/>
```

Fixed image rendering will automatically append a variable `q` parameter mapped to each `dpr` parameter when generating a srcset. This technique is commonly used to compensate for the increased filesize of high-DPR images. Since high-DPR images are displayed at a higher pixel density on devices, image quality can be lowered to reduce overall filesize without sacrificing perceived visual quality. For more information and examples of this technique in action, see [this blog post](https://blog.imgix.com/2016/03/30/dpr-quality).
This behavior will respect any overriding `q` value passed in via `imgixParams` and can be disabled altogether with the boolean property `disableQualityByDPR`.

```html
<ix-img src="image.jpg" width="100" disableQualityByDPR />
```

will generate the following srcset:

```html
https://domain.imgix.net/image.jpg?q=75&w=100&dpr=1 1x,
https://domain.imgix.net/image.jpg?q=50&w=100&dpr=2 2x,
https://domain.imgix.net/image.jpg?q=35&w=100&dpr=3 3x,
https://domain.imgix.net/image.jpg?q=23&w=100&dpr=4 4x,
https://domain.imgix.net/image.jpg?q=20&w=100&dpr=5 5x
```

#### Picture Support

With the picture element, images can be directed to have different crops and sizes based on the browser dimensions, or any media query.

It is recommended to check out our [introduction blog post about how to best use picture and the imgix API](https://docs.imgix.com/tutorials/using-imgix-picture-element) for some great tips and examples!

<!-- prettier-ignore-start -->
```html
<ix-picture>
  <ix-source src="image.jpg" media="(min-width:
  768px)" imgixParams="{ ar: '2:1' }"/> 
  <ix-source src="image.jpg" media="(min-width: 320px)" imgixParams="{ ar: '1.5:1' }" /> 
  <ix-img src="image.jpg" imgixParams="{ w: 100, ar: '3:1' }" />
</ix-picture>
```
<!-- prettier-ignore-end -->

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

#### Custom attribute mapping

In some situations, you might want to pass the generated src and srcset to other attributes, such `data-src`. You can do that like this:

```html
<ix-img
  src="image.jpg"
  :attributeConfig="{ 
    src: 'data-src', 
    srcset: 'data-srcset' 
  }"
/>
```

Which will generate HTML as follows:

```html
<img
  data-src="https://assets.imgix.net/examples/pione.jpg?auto=format"
  data-srcset="https://assets.imgix.net/examples/pione.jpg?auto=format&w=100 100w, ..."
/>
```

#### Custom srcset width

In situations where specific widths are desired when generating `srcset` pairs, a user can specify them by passing an array of positive integers as `widths` to the third options object:

```js
const { srcset } = buildUrlObject(
  'image.jpg',
  {},
  {
    widths: [100, 500, 1000, 1800],
  },
);
```

Will generate the following `srcset` of width pairs:

```html
https://assets.imgix.net/image.jpg?w=100 100w,
https://assets.imgix.net/image.jpg?w=500 500w,
https://assets.imgix.net/image.jpg?w=1000 1000w,
https://assets.imgix.net/image.jpg?w=1800 1800w
```

**Note:** that in situations where a `srcset` is being rendered as a [fixed image](#fixed-image-rendering), any custom `widths` passed in will be ignored. Additionally, if both `widths` and a `widthTolerance` are passed to the `buildSrcSet` method, the custom widths list will take precedence.

#### Width Tolerance

The `srcset` width tolerance dictates the maximum tolerated size difference between an image's downloaded size and its rendered size. For example: setting this value to 0.1 means that an image will not render more than 10% larger or smaller than its native size. In practice, the image URLs generated for a width-based srcset attribute will grow by twice this rate. A lower tolerance means images will render closer to their native size (thereby increasing perceived image quality), but a large srcset list will be generated and consequently users may experience lower rates of cache-hit for pre-rendered images on your site.

By default this rate is set to 8 percent, which we consider to be the ideal rate for maximizing cache hits without sacrificing visual quality. Users can specify their own width tolerance by providing a positive scalar value as `widthTolerance` to the third options object:

```js
const { srcset } = client.buildUrlObject(
  'image.jpg',
  {},
  { widthTolerance: 0.2 },
);
```

In this case, the `width_tolerance` is set to 20 percent, which will be reflected in the difference between subsequent widths in a srcset pair:

<!-- prettier-ignore-start -->
```html
https://assets.imgix.net/image.jpg?w=100 100w,
https://assets.imgix.net/image.jpg?w=140 140w,
https://assets.imgix.net/image.jpg?w=196 196w, 
  ...
https://assets.imgix.net/image.jpg?w=8192 8192w
```
<!-- prettier-ignore-end -->

#### Minimum and Maximum Width Ranges

In certain circumstances, you may want to limit the minimum or maximum value of the non-fixed `srcset` generated by the `buildUrlObject()` or `buildSrcSet()` methods. To do this, you can pass in an options object as a third argument, providing positive integers as `minWidth` and/or `maxWidth` attributes:

```js
const { srcset } = client.buildUrlObject(
  'image.jpg',
  {},
  { minWidth: 500, maxWidth: 2000 },
);
```

Will result in a smaller, more tailored srcset.

```html
https://assets.imgix.net/image.jpg?w=500 500w,
https://assets.imgix.net/image.jpg?w=580 580w,
https://assets.imgix.net/image.jpg?w=672 672w,
https://assets.imgix.net/image.jpg?w=780 780w,
https://assets.imgix.net/image.jpg?w=906 906w,
https://assets.imgix.net/image.jpg?w=1050 1050w,
https://assets.imgix.net/image.jpg?w=1218 1218w,
https://assets.imgix.net/image.jpg?w=1414 1414w,
https://assets.imgix.net/image.jpg?w=1640 1640w,
https://assets.imgix.net/image.jpg?w=1902 1902w,
https://assets.imgix.net/image.jpg?w=2000 2000w
```

Remember that browsers will apply a device pixel ratio as a multiplier when selecting which image to download from a `srcset`. For example, even if you know your image will render no larger than 1000px, specifying `options: { max_srcset: 1000 }` will give your users with DPR higher than 1 no choice but to download and render a low-resolution version of the image. Therefore, it is vital to factor in any potential differences when choosing a minimum or maximum range.

**Note:** that according to the [imgix API](https://docs.imgix.com/apis/url/size/w), the maximum renderable image width is 8192 pixels.

## What is the `ixlib` param on every request?

For security and diagnostic purposes, we tag all requests with the language and version of library used to generate the URL.

To disable this, set `includeLibraryParam` to false when initializing `VueImgix`.

```js
import Vue from 'vue';
import VueImgix from 'vue-imgix';

Vue.use(VueImgix, {
  domain: "<your company's imgix domain>",
  includeLibraryParam: false,
});
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

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fimgix%2Fvue-imgix.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fimgix%2Fvue-imgix?ref=badge_large)
