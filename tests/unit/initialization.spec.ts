/* eslint-disable @typescript-eslint/no-var-requires */

describe('Initialization', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it('allows the developer to initialise the @imgix/vue library', () => {
    const Vue = require('vue');
    const VueImgix = require('@/plugins/imgix-vue');
    Vue.use(VueImgix, {
      domain: 'test-domain.imgix.net',
    });
  });
  it('throws an error if a method is used before @imgix/vue was initialised', () => {
    const { buildUrlObject } = require('@/plugins/imgix-vue');
    expect(() => {
      buildUrlObject('/test-image.jpg');
    }).toThrow(/Vue\.use/);
  });

  it(`doesn't include ixlib in generated urls when includeLibraryParam is set to false`, () => {
    const Vue = require('vue');
    const VueImgix = require('@/plugins/imgix-vue');
    Vue.use(VueImgix, {
      domain: 'test-domain.imgix.net',
      includeLibraryParam: false,
    });

    const { buildUrlObject } = require('@/plugins/imgix-vue');
    expect(buildUrlObject('/test-image.jpg')).toMatchObject({
      src: expect.not.stringMatching(/ixlib/),
      srcset: expect.not.stringMatching(/ixlib/),
    });
  });

  it(`includes imgixParams set during initialization in the generated srcs`, () => {
    const Vue = require('vue');
    const VueImgix = require('@/plugins/imgix-vue');
    Vue.use(VueImgix, {
      domain: 'test-domain.imgix.net',
      defaultIxParams: {
        auto: 'format',
      },
    });

    const { buildUrlObject } = require('@/plugins/imgix-vue');
    expect(buildUrlObject('/test-image.jpg')).toMatchObject({
      src: expect.stringMatching(/auto=format/),
      srcset: expect.stringMatching(/auto=format/),
    });
  });
});
