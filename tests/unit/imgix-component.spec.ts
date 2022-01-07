import VueImgix from '@/plugins/vue-imgix/index';
import { IxImg } from '@/plugins/vue-imgix/ix-img';
import { IxPicture } from '@/plugins/vue-imgix/ix-picture';
import { IxSource } from '@/plugins/vue-imgix/ix-source';
import { render } from '@testing-library/vue';
import { config, mount } from '@vue/test-utils';
import { createApp } from 'vue';
import _App from '../../src/App.vue';
import {
  expectElementToHaveFixedSrcAndSrcSet,
  expectElementToHaveFluidSrcAndSrcSet
} from '../helpers/url-assert';
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
        ['data-testid']: 'img-rendering',
      },
    });

    const el = wrapper.find('img[data-testid="img-rendering"]').html();

    expect(el).toBeTruthy();
  });
  it(`the rendered img's src should be set`, () => {
    const wrapper = mount(IxImg, {
      props: {
        src: 'examples/pione.jpg',
        ['data-testid']: 'img-rendering',
      },
    });

    const el = wrapper.get('img[data-testid="img-rendering"]').html();
    // create HTMLElement from el
    const img = new DOMParser().parseFromString(el, 'text/html').body
      .firstChild as HTMLImageElement;
    const srcAttr = img.getAttribute('src');

    expect(srcAttr).toBeTruthy();
    expect(srcAttr).toMatch(/examples\/pione.jpg/);

  });
  it(`the rendered img's srcset should be set correctly`, () => {
    const wrapper = mount(IxImg, {
      props: {
        src: 'examples/pione.jpg',
        ['data-testid']: 'img-rendering',
      },
    });

    const srcset = wrapper.find('img[data-testid="img-rendering"]').element.getAttribute('srcset');

    expect(srcset).not.toBeFalsy();
    if (!srcset) {
      fail('srcset is null');
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
        ['data-testid']: 'img-rendering',
        imgixParams: {
          crop: 'faces',
        }
      },
    });

    const el = wrapper.find('img[data-testid="img-rendering"]').html();
    // create HTMLElement from el
    const img = new DOMParser().parseFromString(el, 'text/html').body
      .firstChild as HTMLImageElement;

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
          ['data-testid']: 'img-rendering',
        },
      });

      const el = wrapper.get('img[data-testid="img-rendering"]').html();
      // create HTMLElement from el
      const img = new DOMParser().parseFromString(el, 'text/html').body.firstChild as HTMLImageElement;
      expectElementToHaveFluidSrcAndSrcSet(img);
    });
  });

  describe('in fixed mode (fixed prop set, or width/height passed to imgixParams)', () => {
    it('the src and srcset should be in fixed size mode when a width is passed to imgixParams', () => {
      const wrapper = mount(IxImg, {
        props: {
          ['data-testid']: 'img-rendering',
          src: 'examples/pione.jpg',
          imgixParams: {
            w: 100,
          },
        },
      });

      const el = wrapper.get('img[data-testid="img-rendering"]').html();
      // create HTMLElement from el
      const img = new DOMParser().parseFromString(el, 'text/html').body
        .firstChild as HTMLImageElement;
      expectElementToHaveFixedSrcAndSrcSet(img, 100);
    });
    it('the src and srcset should be in fixed size mode when a fixed prop is passed to the element', () => {
      const wrapper = mount(IxImg, {
        props: {
          ['data-testid']: 'img-rendering',
          src: 'examples/pione.jpg',
          width: 100,
          height: 150,
          fixed: true,
        },
      });

      const el = wrapper.get('img[data-testid="img-rendering"]').html();
      const img = new DOMParser().parseFromString(el, 'text/html').body
        .firstChild as HTMLImageElement;

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
          ['data-testid']: 'img-rendering',
          src: 'examples/pione.jpg',
          width: 100,
        },
      });

      const el = wrapper.get('img[data-testid="img-rendering"]').html();
      const img = new DOMParser().parseFromString(el, 'text/html').body
        .firstChild as HTMLImageElement;
      
      const widthAttr = img.getAttribute('width');

      expect(widthAttr).toBeTruthy();
      expect(widthAttr).toBe('100');
    });
    it('a height attribute should be passed through to the underlying component', () => {
      const wrapper = mount(IxImg, {
        props: {
          ['data-testid']: 'img-rendering',
          src: 'examples/pione.jpg',
          height: 100,
        },
      });

      const el = wrapper.get('img[data-testid="img-rendering"]').html();
      const img = new DOMParser().parseFromString(el, 'text/html').body
        .firstChild as HTMLImageElement;
      
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
          ['data-testid']: 'img-rendering',
          src: 'examples/pione.jpg',
          attributeConfig: {
            [attribute]: `data-${attribute}`,
          },
        },
      });
        
        const el = wrapper.get('img[data-testid="img-rendering"]').html();
        const img = new DOMParser().parseFromString(el, 'text/html').body
          .firstChild as HTMLImageElement;
        
        const customImgAttr = img.getAttribute(`data-${attribute}`);
        const imgAttr = img.getAttribute(attribute);

        expect(customImgAttr).toBeTruthy();
        expect(imgAttr).toBeFalsy();
        expect(customImgAttr).toMatch(/ixlib/);
      });
    });
  });
  describe('disableVariableQuality', () => {
    const App = createApp(_App);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockImgixClient: any;
    let _IxImg: typeof IxImg;
    beforeEach(() => {
      /* eslint-disable @typescript-eslint/no-var-requires */
      jest.resetModules();
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const _Vue = require('vue');
      const _VueImgix = require('@/plugins/vue-imgix');
      _IxImg = _VueImgix.IxImg;
      jest.mock('@imgix/js-core');
      mockImgixClient = {
        settings: {},
        buildSrcSet: jest.fn(),
        buildURL: jest.fn(),
      };
      const ImgixClient = require('@imgix/js-core');
      ImgixClient.mockImplementation(() => mockImgixClient);
      App.use(_VueImgix, {
        domain: 'assets.imgix.net',
      });
      /* eslint-enable @typescript-eslint/no-var-requires */
    });
    it('should not pass disableVariableQuality: true to @imgix/js-core by default', () => {
      render(_IxImg, {
        props: {
          src: 'examples/pione.jpg',
          height: 100,
          fixed: true,
        },
      });

      expect(mockImgixClient.buildSrcSet).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({
          disableVariableQuality: false,
        }),
      );
    });
    it('should pass disableVariableQuality: true to @imgix/js-core when disableVariableQuality prop set', () => {
      render(_IxImg, {
        props: {
          src: 'examples/pione.jpg',
          height: 100,
          disableVariableQuality: true,
          fixed: true,
        },
      });

      expect(mockImgixClient.buildSrcSet).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({
          disableVariableQuality: true,
        }),
      );
    });
  });
});
