import { vi, expect } from 'vitest';
import VueImgix from '@/plugins/imgix-vue/index';
import { IxImg } from '@/plugins/imgix-vue/ix-img';
import { IxPicture } from '@/plugins/imgix-vue/ix-picture';
import { IxSource } from '@/plugins/imgix-vue/ix-source';
import { config, mount } from '@vue/test-utils';
import _App from '../../src/App.vue';
import {
  expectElementToHaveFixedSrcAndSrcSet,
  expectElementToHaveFluidSrcAndSrcSet,
} from '../helpers/url-assert';
import ImgixClient from '@imgix/js-core';
/**
 * Why register the plugin and each individual component globally?
 *
 * It's a limitation with  @vue/test-utils at the moment. The
 * `config.global.plugins` option is supposed to register plugins globally,
 * but it doesn't seem to work when tests are run in parallel.
 *
 * The only reliable way to register plugins components globally is to register
 * them individually as `config.global.components` as well as
 * `config.global.plugins`.
 */
config.global.plugins = [[VueImgix, { domain: 'assets.imgix.net' }]];
config.global.components = {
  IxImg,
  IxPicture,
  IxSource,
};

describe('imgix component', () => {
  it('an img should be rendered', () => {
    const wrapper = mount(IxImg, {
      props: {
        src: 'examples/pione.jpg',
      },
    });

    const el = wrapper.find('img').html();

    expect(el).toBeTruthy();
  });
  it(`the rendered img's src should be set`, () => {
    const wrapper = mount(IxImg, {
      props: {
        src: 'examples/pione.jpg',
      },
    });

    const img = wrapper.get('img').element as HTMLImageElement;
    const srcAttr = img.getAttribute('src');

    expect(srcAttr).toBeTruthy();
    expect(srcAttr).toMatch(/examples\/pione.jpg/);
  });
  it(`the rendered img's srcset should be set correctly`, () => {
    const wrapper = mount(IxImg, {
      props: {
        src: 'examples/pione.jpg',
      },
    });

    const srcset = wrapper.find('img').element.getAttribute('srcset');

    expect(srcset).not.toBeFalsy();
    if (!srcset) {
      throw Error('srcset is null');
    }

    const firstSrcSet = srcset.split(',').map((v) => v.trim())[0];
    expect(firstSrcSet.split(' ')).toHaveLength(2);
    const aSrcFromSrcSet = firstSrcSet.split(' ')[0];
    expect(aSrcFromSrcSet).toContain('examples/pione.jpg');
    const aWidthFromSrcSet = firstSrcSet.split(' ')[1];
    expect(aWidthFromSrcSet).toMatch(/^\d+w$/);
  });

  it('imgixParams should be set on the rendered src and srcset', () => {
    const wrapper = mount(IxImg, {
      props: {
        src: 'examples/pione.jpg',
        imgixParams: {
          crop: 'faces',
        },
      },
    });

    const img = wrapper.find('img').element as HTMLElement;
    const srcAttr = img.getAttribute('src');
    const srcsetAttr = img.getAttribute('srcset');

    expect(srcAttr).toBeTruthy();
    expect(srcsetAttr).toBeTruthy();
    expect(srcAttr).toMatch(/crop=faces/);
    expect(srcsetAttr).toMatch(/crop=faces/);
  });

  describe('in fluid mode (no fixed props set)', () => {
    it('ix-img should render a fluid image if width is passed as attribute', () => {
      const wrapper = mount(IxImg, {
        props: {
          src: 'examples/pione.jpg',
        },
      });

      const img = wrapper.get('img').element as HTMLElement;
      expectElementToHaveFluidSrcAndSrcSet(img);
    });
  });

  describe('in fixed mode (fixed prop set, or width/height passed to imgixParams)', () => {
    it('the src and srcset should be in fixed size mode when a width is passed to imgixParams', () => {
      const wrapper = mount(IxImg, {
        props: {
          src: 'examples/pione.jpg',
          imgixParams: {
            w: 100,
          },
        },
      });

      const img = wrapper.get('img').element as HTMLElement;
      expectElementToHaveFixedSrcAndSrcSet(img, 100);
    });
    it('the src and srcset should be in fixed size mode when a fixed prop is passed to the element', () => {
      const wrapper = mount(IxImg, {
        props: {
          src: 'examples/pione.jpg',
          width: 100,
          height: 150,
          fixed: true,
        },
      });

      const img = wrapper.get('img').element as HTMLElement;
      const srcAttr = img.getAttribute('src');
      const srcsetAttr = img.getAttribute('srcset');

      expectElementToHaveFixedSrcAndSrcSet(img, 100);
      expect(srcAttr).toBeTruthy();
      expect(srcsetAttr).toBeTruthy();
      expect(srcAttr).toMatch(/h=150/);
      expect(srcsetAttr).toMatch(/h=150/);
    });

    it('a width attribute should be passed through to the underlying component', () => {
      const wrapper = mount(IxImg, {
        props: {
          src: 'examples/pione.jpg',
          width: 100,
        },
      });

      const img = wrapper.get('img').element as HTMLElement;
      const widthAttr = img.getAttribute('width');

      expect(widthAttr).toBeTruthy();
      expect(widthAttr).toBe('100');
    });
    it('a height attribute should be passed through to the underlying component', () => {
      const wrapper = mount(IxImg, {
        props: {
          src: 'examples/pione.jpg',
          height: 100,
        },
      });

      const img = wrapper.get('img').element as HTMLElement;

      const heightAttr = img.getAttribute('height');

      expect(heightAttr).toBeTruthy();
      expect(heightAttr).toBe('100');
    });
  });

  describe('attributeConfig', () => {
    const ATTRIBUTES = ['src', 'srcset'];
    ATTRIBUTES.forEach((attribute) => {
      it(`${attribute} can be configured to use data-${attribute}`, () => {
        const wrapper = mount(IxImg, {
          props: {
            src: 'examples/pione.jpg',
            attributeConfig: {
              [attribute]: `data-${attribute}`,
            },
          },
        });

        const img = wrapper.get('img').element as HTMLElement;
        const customImgAttr = img.getAttribute(`data-${attribute}`);
        const imgAttr = img.getAttribute(attribute);

        expect(customImgAttr).toBeTruthy();
        expect(imgAttr).toBeFalsy();
        expect(customImgAttr).toMatch(/ixlib/);
      });
    });
  });
  // TODO(luis): figure out how to mock js-core so that our plugin uses the
  // mock and not its own instance
  describe.skip('disableVariableQuality', () => {
    beforeEach(() => {
      vi.resetModules();
    });
    afterAll(() => {
      vi.resetAllMocks();
      vi.resetModules();
    });

    it('should not pass disableVariableQuality: true to @imgix/js-core by default', async () => {
      const mockImgixClient = {
        settings: {},
        buildSrcSet: vi.fn(),
        buildURL: vi.fn(),
      };
      vi.doMock('@imgix/js-core', () => {
        return {
          __esModule: true,
          default: vi.fn(() => mockImgixClient),
        };
      });

      // spy on the buildSrcSet method of the imgixClient instance
      const spy = vi
        .spyOn(mockImgixClient, 'buildSrcSet')
        .mockImplementation(() => '');

      const wrapper = mount(IxImg, {
        props: {
          src: 'examples/pione.jpg',
          height: 100,
          fixed: true,
        },
      });

      expect(spy).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({
          disableVariableQuality: false,
        }),
      );
    });

    it('should pass disableVariableQuality: true to @imgix/js-core when disableVariableQuality prop set', async () => {
      const imgixClient = new ImgixClient({ domain: 'test.imgix.net' });

      // spy on the buildSrcSet method of the imgixClient instance
      const spy = vi
        .spyOn(imgixClient, 'buildSrcSet')
        .mockImplementation(() => '');

      const wrapper = mount(IxImg, {
        props: {
          src: 'examples/pione.jpg',
          height: 100,
          disableVariableQuality: true,
          fixed: true,
        },
      });

      await wrapper.vm.$nextTick();

      expect(spy).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({
          disableVariableQuality: true,
        }),
      );
    });
  });
});
