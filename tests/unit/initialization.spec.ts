/* eslint-disable @typescript-eslint/no-var-requires */

describe('Initialization', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it('allows the developer to initialise the vue-imgix library', () => {
    const Vue = require('vue');
    const VueImgix = require('@/plugins/vue-imgix');
    Vue.use(VueImgix, {
      domain: 'test-domain.imgix.net',
    });
  });
  it('throws an error if a method is used before vue-imgix was initialised', () => {
    const { buildUrlObject } = require('@/plugins/vue-imgix');
    expect(() => {
      buildUrlObject('/test-image.jpg');
    }).toThrow(/Vue\.use/);
  });
});
