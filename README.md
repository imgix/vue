<!-- ix-docs-ignore -->

![imgix logo](https://assets.imgix.net/sdk-imgix-logo.svg)

`@imgix/vue` is a client library for generating URLs with [imgix](https://www.imgix.com/).

> ### Vue 3
> ⚠️ You are viewing the Vue 3.0 branch.  For Vue 2, please look at the [`2.x`](https://github.com/imgix/vue-imgix/tree/2.x) branch. We will be supporting Vue 2 for the official support timeline (18 months) after we release Vue 3 support.

[![npm version](https://img.shields.io/npm/v/@imgix/vue.svg)](https://www.npmjs.com/package/@imgix/vue)
[![Build Status](https://travis-ci.com/imgix/vue.svg?branch=main)](https://travis-ci.com/imgix/vue)
[![Downloads](https://img.shields.io/npm/dm/@imgix/vue.svg)](https://www.npmjs.com/package/@imgix/vue)
[![License](https://img.shields.io/npm/l/@imgix/vue)](https://github.com/imgix/@imgix/vue/blob/main/LICENSE)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fimgix%2Fvue.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fimgix%2Fvue?ref=badge_shield)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

---

<!-- /ix-docs-ignore -->

<!-- NB: Run `npx markdown-toc README.md --maxdepth 4 | sed -e 's/[[:space:]]\{2\}/    /g'` to generate TOC :) -->

<!-- prettier-ignore-start -->

- [Overview / Resources](#overview--resources)
- [Get Started](#get-started)
- [Configure](#configure)
    - [Polyfills required](#polyfills-required)
    - [Standard Vue 3.x App](#standard-vue-3x-app)
    - [Nuxt.js](#nuxtjs)
- [Usage](#usage)
    - [Examples](#examples)
      - [Basic Use Case](#basic-use-case)
      - [Flexible Image Rendering](#flexible-image-rendering)
      - [Fixed Image Rendering (i.e. non-flexible)](#fixed-image-rendering-ie-non-flexible)
      - [Picture Support](#picture-support)
      - [Lazy-Loading](#lazy-loading)
        - [Lazy-loading (Native)](#lazy-loading-native)
        - [Lazy-loading (Event Listener)](#lazy-loading-event-listener)
    - [Advanced Examples](#advanced-examples)
      - [buildUrlObject](#buildurlobject)
      - [buildUrl](#buildurl)
      - [buildSrcSet](#buildsrcset)
      - [Custom Attribute Mapping](#custom-attribute-mapping)
      - [Custom Srcset Width](#custom-srcset-width)
      - [Width Tolerance](#width-tolerance)
      - [Minimum and Maximum Width Ranges](#minimum-and-maximum-width-ranges)
      - [Base64 Encoding](#base64-encoding)
- [What Is the `ixlib` Param on Every Request?](#what-is-the-ixlib-param-on-every-request)
- [Code of Conduct](#code-of-conduct)
- [Contributors](#contributors)
- [License](#license)

<!-- prettier-ignore-end -->

## Overview / Resources

**Before you get started with @imgix/vue**, it's _highly recommended_ that you read Eric Portis' [seminal article on `srcset` and `sizes`](https://ericportis.com/posts/2014/srcset-sizes/). This article explains the history of responsive images in responsive design, why they're necessary, and how all these technologies work together to save bandwidth and provide a better experience for users. The primary goal of @imgix/vue is to make these tools easier for developers to implement, so having an understanding of how they work will significantly improve your @imgix/vue experience.

Below are some other articles that help explain responsive imagery, and how it can work alongside imgix:

- [Using imgix with `<picture>`](https://docs.imgix.com/tutorials/using-imgix-picture-element). Discusses the differences between art direction and resolution switching, and provides examples of how to accomplish art direction with imgix.
- [Responsive Images with `srcset` and imgix](https://docs.imgix.com/tutorials/responsive-images-srcset-imgix). A look into how imgix can work with `srcset` and `sizes` to serve the right image.

## Get Started

Firstly, follow this [quick start guide](https://docs.imgix.com/setup/quick-start) to set-up an imgix account.

Then, install @imgix/vue with the following commands, depending on your package manager.

- **NPM**: `npm install @imgix/vue`
- **Yarn**: `yarn add @imgix/vue`

This module exports two transpiled versions. If a ES6-module-aware bundler is being used to consume this module, it will pick up an ES6 module version and can perform tree-shaking. **If you are not using ES6 modules, you don't have to do anything.**

## Configure

### Polyfills required

A polyfill for `Object.assign` must be supplied for browsers that need it. You probably have this already set up, so you likely don't need to do anything.

### Standard Vue 3 App

> For Vue 2, please look at the [`main`](https://github.com/imgix/vue/tree/main) branch.

@imgix/vue needs to be initialized with a minimal configuration before it can be used in components. Modify your startup/init file (usually `main.js` or similar) to include the following:

```js
import { createApp } from 'vue';
import VueImgix from '@imgix/vue';
import App from './App.vue';

// Create and mount the root instance.
const app = createApp(App);
// Make sure to _use_ the VueImgix instance to make the
// whole app VueImgix-aware.
app.use(VueImgix, {
  domain: "<your company's imgix domain>",
  defaultIxParams: {
    // This enables the auto format imgix parameter by default for all images, which we recommend to reduce image size, but you might choose to turn this off.
    auto: 'format',
  },
});

app.mount('#app');
```

And that's all you need to get started! Have fun!

### Nuxt.js v3

#### With `nuxt-image`

Nuxt.js now has a built-in [Image component](https://image.nuxtjs.org/getting-started/installation) that can be used alongside imgix.

You can read more about our `nuxt-image` provider and how to use it in the [Nuxt docs](https://image.nuxtjs.org/providers/imgix).

#### Using this library directly

> For Nuxt v2 support, please look at the [`main`](https://github.com/imgix/vue/tree/main) branch.

To use this library with Nuxt 3, add the following code to `plugins/vue-imgix.js`

```js
import { defineNuxtPlugin } from '#app';
import VueImgix from '@imgix/vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueImgix, {
    domain: "<your company's imgix domain>",
    defaultIxParams: {
      // This enables the auto format imgix parameter by default for all images, which we recommend to reduce image size, but you might choose to turn this off.
      auto: 'format',
    },
  });
});
```

#### Example usage

```html
<nuxt-img
  provider="imgix"
  src="/blog/woman-hat.jpg"
  width="300"
  height="500"
  fit="cover"
  :modifiers="{ auto: 'format,compress', crop: 'faces' }"
/>
```

## Usage

To help you get started as quickly as possible, imgix has designed the API of this library to follow the API of a normal `<img>` tag as much as possible. You can expect most uses of the `<img>` tag to work just the same for `<ix-img>`.

### Examples

#### Basic Use Case

To render a simple image that will display an image based on the browser's DPR and the width of the rendered element using the power of srcsets, @imgix/vue can be used as follows:

```html
<ix-img src="examples/pione.jpg" sizes="100vw" />
```

To render an image with a source URL different than the one setup in the plugin configuration, just set the `src` attribute to the absolute URL path of the image, like so:

```html
<ix-img src="https://sdk-test.imgix.net/amsterdam.jpg" sizes="100vw" />
```

[![Edit festive-mclean-6risg](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/festive-mclean-6risg?fontsize=14&hidenavigation=1&theme=dark)

**Please note:** `100vw` is an appropriate `sizes` value for a full-bleed image. If your image is not full-bleed, you should use a different value for `sizes`. [Eric Portis' "Srcset and sizes"](https://ericportis.com/posts/2014/srcset-sizes/) article goes into depth on how to use the `sizes` attribute. An important note here is that **sizes cannot be a percentage based value**, and must be in terms of vw, or a fixed size (px, em, rem, etc)

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

✨**There is new browser behavior in 2019/2020.** It is now recommended that `width` and `height` be set on all images to provide an aspect ratio hint to the browser. The browser can then use this aspect ratio hint to reserve a space for the image (even if the image is responsive!). The following example explains all how to do it. You can also read more about this development [in this amazing Smashing Magazine article.](https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/)

For the width/height placeholder image, we need three requirements to be met:

- `width` and `height` attributes set on the img element
- some `width` CSS value (e.g. `10px`, `100%`, `calc(100vw - 10px)`)
- `height: auto` as a CSS property

`./styles.css`

```css
.test-img {
  /* These next two lines are critical for the new browser feature. */
  width: calc(100vw - 128px);
  height: auto; // This tells the browser to set the height of the image to what it should be, and ignore the height attribute set on the image
}
```

`./app.js`

For the width and height attributes, they can be any value as long as their aspect ratio is the same as what the image's aspect ratio is. E.g. `width = 100, height = 50` is fine, and also `width = 2, height = 1` is fine. In this case, the image has an aspect ratio of ~0.66:1, so we have set set a width of 66 and a height of 100, but we could have also used a width and height of 33 and 50, or 660 and 1000, for example.

```html
<ix-img 
  src="examples/pione.jpg" 
  sizes="calc(100vw - 128px)" 
  class="test-img"
  width="66"
  height="100"
/>
```

**Aspect Ratio:** A developer can pass a desired aspect ratio, which will be used when
generating srcsets to resize and crop your image as specified. For the `ar` parameter to take effect, ensure that the `fit` parameter is set to `crop`.

```html
<div className="App">
  <ix-img
    src="examples/pione.jpg"
    sizes="calc(100vw - 128px)"
    :imgixParams="{ ar: '16:9', fit: 'crop' }"
    width="16" // It's important to set these attributes to the aspect ratio that we manually specify.
    height="9"
  />
</div>
```

The aspect ratio is specified in the format `width:height`. Either dimension can be an integer or a float. All of the following are valid: 16:9, 5:1, 1.92:1, 1:1.67.

#### Fixed Image Rendering (i.e. non-flexible)

If the fluid, dynamic nature explained above is not desired, the width and height can be set explicitly along with a `fixed` prop. The imgix CDN will then render an image with these exact dimensions

```js
<ix-img
  src="image.jpg"
  // This width and the height below sets the size of the resulting image on the page, and what the DPR-1x resolution should be loaded from the CDN. Higher than 1x DPRs will load a higher resolution.
  width="100"
  height="200"
  fixed
/>
```

This will generate an image element like:

```jsx
<ix-img 
  // Notice the w and h parameters here
  src="image.jpg?w=100&h=200"
  // This allows the image to respond to different device DPRs
  srcset="image.jpg?w=100&h=200&dpr=1 1x, image.jpg?w=100&h=200&dpr=2 2x, ..."
  width="100" 
  height="200" 
/>
```

Fixed image rendering will automatically append a variable `q` parameter mapped to each `dpr` parameter when generating a srcset. This technique is commonly used to compensate for the increased filesize of high-DPR images. Since high-DPR images are displayed at a higher pixel density on devices, image quality can be lowered to reduce overall filesize without sacrificing perceived visual quality. For more information and examples of this technique in action, see [this blog post](https://blog.imgix.com/2016/03/30/dpr-quality).
This behavior will respect any overriding `q` value passed in via `imgixParams` and can be disabled altogether with the boolean property `disableVariableQuality`.

```html
<ix-img src="image.jpg" width="100" disableVariableQuality />
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
  768px)" :imgixParams="{ ar: '2:1' }"/> 
  <ix-source src="image.jpg" media="(min-width: 320px)" :imgixParams="{ ar: '1.5:1' }" /> 
  <ix-img src="image.jpg" :imgixParams="{ w: 100, ar: '3:1' }" />
</ix-picture>
```
<!-- prettier-ignore-end -->

#### Lazy-Loading

For lazy loading, there are a few options to choose from. They're listed here.

1. Native lazy-loading with `loading="lazy"`. As of May 2020, this is shipped in stable versions of Chrome and Firefox. [Example](#lazy-loading-native)
2. Lazy-loading with a scroll-based library (we recommend [Lazysizes](https://github.com/aFarkas/lazysizes))

> The following have planned V3 support, but as of this build they are not explicitly supported.

3. Lazy-loading with [vue-lazyload](https://github.com/hilongjw/vue-lazyload). This library is pretty great, but doesn't support responsive images. In any case, this library fully supports vue-lazyload, [here's an v2 example](https://codesandbox.io/s/vue-imgix-lazyload-vuelazyload-vl2u1).
4. Lazy-loading with an Intersection observer library (we recommend [Lozad.js](https://apoorv.pro/lozad.js/))

##### Lazy-loading (Native)

To use pure browser native lazy-loading, just add a `loading="lazy"` attribute to every image you want to lazy load.

```html
<ix-img src="..." loading="lazy" />
```

There's more information about native lazy loading in [this web.dev article](https://web.dev/native-lazy-loading/), and in this [CSSTricks article](https://css-tricks.com/a-native-lazy-load-for-the-web-platform/).


##### Lazy-loading (Event Listener)

The last way to implement lazy loading is to use an event listener. This is not recommended these days due to performance concerns, which have been solved by other solutions (the previous solutions mentioned above).

If you'd still like to use an event listener, we recommend using [lazysizes](https://github.com/aFarkas/lazysizes). In order to use @imgix/vue with lazysizes, you can simply tell it to generate lazysizes-compatible attributes instead of the standard `src`, `srcset` by changing some configuration settings:

```html
<ix-img
  class="lazyload"
  src="..."
  attributeConfig="{
    src: 'data-src',
    srcSet: 'data-srcset',
  }"
/>
```

The same configuration is available for `ix-src` components.

**NB:** It is recommended to use the [attribute change plugin](https://github.com/aFarkas/lazysizes/tree/gh-pages/plugins/attrchange) in order to capture changes in the data-\* attributes. Without this, changing the props to this library will have no effect on the rendered image.

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
  import { buildUrlObject } from '@imgix/vue';

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

In addition to the helper above, we provide `buildURL` from @imgix/js-core to help developers to create any URL they need.

```html
<template>
  <img :src="advancedUrl" />
</template>

<script>
  import { buildUrl } from '@imgix/vue';

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

We also provide `buildSrcSet` from @imgix/js-core to help developers to create any srcset URL they need.

```html
<template>
  <img :src="advancedUrl" :srcset="advancedSrcSet" />
</template>

<script>
  import { buildUrl, buildSrcSet } from '@imgix/vue';

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

#### Custom Attribute Mapping

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

#### Custom Srcset Width

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

#### Base64 Encoding

All imgix parameter values (with the exception of auto and ch) can be encoded using a URL-safe Base64 scheme. This client library has automatic base64 encoding for any imgix parameter that ends in 64. For example, to encode `txt`, just use `txt64`.

```html
<ix-img
  src="image.jpg"
  :imgixParams="{ 
    txt64: 'Oh hello, world'
  }"
/>
```

becomes:

```html
<img src="image.jpg?txt64=T2ggaGVsbG8sIHdvcmxk&..." ... />
```

## What Is the `ixlib` Param on Every Request?
For security and diagnostic purposes, we tag all requests with the language and version of library used to generate the URL.

To disable this, set `includeLibraryParam` to false when initializing `VueImgix`.

```js
import { createApp } from 'vue';
import VueImgix from '@imgix/vue';
import App from './App.vue';

const app = createApp(App);
app.use(VueImgix, {
  domain: "<your company's imgix domain>",
  // disable version tag on all requests
  includeLibraryParam: false,
});

app.mount('#app');
```

## Code of Conduct

imgix is dedicated to providing a harassment-free experience for everyone, regardless of gender, gender identity and expression, sexual orientation, disability, physical appearance, body size, race, or religion. We do not tolerate harassment of participants in any form.

This code of conduct applies to all imgix sponsored spaces both online and off, including our open-source projects. Anyone who violates this code of conduct may be sanctioned or expelled from these spaces at the discretion of the imgix Anti-Abuse Team (codeofconduct@imgix.com).

[Our full Code of Conduct can be found here.](https://github.com/imgix/code-of-conduct)

## Contributors

Contributions are a vital part of this library and imgix's commitment to open-source. We welcome all contributions which align with this project's goals. More information can be found in the [contributing documentation](CONTRIBUTING.md).

<!-- ix-docs-ignore -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/frederickfogerty"><img src="https://avatars0.githubusercontent.com/u/615334?v=4" width="100px;" alt=""/><br /><sub><b>Frederick Fogerty</b></sub></a><br /><a href="https://github.com/imgix/vue/commits?author=frederickfogerty" title="Code">💻</a> <a href="https://github.com/imgix/vue/commits?author=frederickfogerty" title="Documentation">📖</a> <a href="#maintenance-frederickfogerty" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- /ix-docs-ignore -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fimgix%2Fvue.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fimgix%2Fvue?ref=badge_large)
