/* eslint-disable @typescript-eslint/no-var-requires */

describe('initVueImgix', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it('allows the developer to initialise the vue-imgix library', () => {
    const { initVueImgix } = require('@/plugins/vue-imgix');
    initVueImgix({
      domain: 'test-domain.imgix.net',
    });
  });
  it('throws an error if a method is used before vue-imgix was initialised', () => {
    const { buildUrlObject } = require('@/plugins/vue-imgix');
    expect(() => {
      buildUrlObject('/test-image.jpg');
    }).toThrow(/initVueImgix must be called/);
  });
});
