/* eslint-disable @typescript-eslint/no-var-requires */

describe('Initialization', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it('allows the developer to initialise the vue-imgix library', () => {
    const Vue = require('vue');
    const createApp = Vue.createApp;
    const VueImgix = require('@/plugins/vue-imgix');
    const _App = require('../../src/App.vue');

    const App = createApp(_App);
    App.use(VueImgix, {
      domain: 'test-domain.imgix.net',
    });
  });
  it('throws an error if a method is used before vue-imgix was initialised', () => {
    const { buildUrlObject } = require('@/plugins/vue-imgix');
    expect(() => {
      buildUrlObject('/test-image.jpg');
    }).toThrow(/Vue\.use/);
  });

  it(`doesn't include ixlib in generated urls when includeLibraryParam is set to false`, () => {
    const Vue = require('vue');
    const createApp = Vue.createApp;
    const VueImgix = require('@/plugins/vue-imgix');
    const _App = require('../../src/App.vue');

    const App = createApp(_App);
    App.use(VueImgix, {
      domain: 'test-domain.imgix.net',
      includeLibraryParam: false,
    });

    const { buildUrlObject } = require('@/plugins/vue-imgix');
    expect(buildUrlObject('/test-image.jpg')).toMatchObject({
      src: expect.not.stringMatching(/ixlib/),
      srcset: expect.not.stringMatching(/ixlib/),
    });
  });

  it(`includes imgixParams set during initialization in the generated srcs`, () => {
    const Vue = require('vue');
    const createApp = Vue.createApp;
    const VueImgix = require('@/plugins/vue-imgix');
    const _App = require('../../src/App.vue');

    const App = createApp(_App);
    App.use(VueImgix, {
      domain: 'test-domain.imgix.net',
      defaultIxParams: {
        auto: 'format',
      },
    });

    const { buildUrlObject } = require('@/plugins/vue-imgix');
    expect(buildUrlObject('/test-image.jpg')).toMatchObject({
      src: expect.stringMatching(/auto=format/),
      srcset: expect.stringMatching(/auto=format/),
    });
  });
});
