import type { Plugin } from 'vue';
import { vi, expect } from 'vitest';
import VueImgix from '../../src/plugins/imgix-vue';
import { buildUrlObject } from '../../src/plugins/imgix-vue/imgix-vue';
import _App from '../../src/App.vue';
import { IImgixClientOptions } from '@/plugins/imgix-vue/types';
import { mount } from '@vue/test-utils';

export const createVueImgixPlugin = (options: IImgixClientOptions): Plugin => {
  return {
    install: (app) => {
      VueImgix.install(app, options);
    },
  };
};

describe('Initialization', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('throws an error if a method is used before @imgix/vue was initialized', () => {
    expect(() => {
      buildUrlObject('/test-image.jpg');
    }).toThrowError(/Vue\.use/);
  });

  it('allows the developer to initialize the @imgix/vue library', () => {
    const _VueImgix = createVueImgixPlugin({
      domain: 'test-domain.imgix.net',
      includeLibraryParam: false,
      defaultIxParams: {
        auto: 'format',
      },
    });

    const wrapper = mount(_App, {
      global: {
        plugins: [_VueImgix],
      },
    });
    wrapper.unmount();
  });

  it(`doesn't include ixlib in generated urls when includeLibraryParam is set to false`, () => {
    expect(buildUrlObject('/test-image.jpg')).toEqual({
      src: expect.not.stringContaining('ixlib'),
      srcset: expect.not.stringContaining('ixlib'),
    });
  });

  it(`includes imgixParams set during initialization in the generated srcs`, () => {
    expect(buildUrlObject('/test-image.jpg')).toEqual({
      src: expect.stringContaining('auto=format'),
      srcset: expect.stringContaining('auto=format'),
    });
  });
});
