import IxPictureSimple from '@/components/simple/ix-picture.vue';
import VueImgix from '@/plugins/imgix-vue/index';
import { IxImg } from '@/plugins/imgix-vue/ix-img';
import { IxPicture } from '@/plugins/imgix-vue/ix-picture';
import { IxSource } from '@/plugins/imgix-vue/ix-source';
import { config, mount } from '@vue/test-utils';
config.global.plugins = [[VueImgix, { domain: 'assets.imgix.net' }]];
config.global.components = {
  IxImg,
  IxPicture,
  IxSource,
};

describe('Picture Mode', () => {
  describe('ix-picture', () => {
    it('should render a picture', () => {
      const wrapper = mount(IxPicture, {
        shallow: false,
      });

      const picture = wrapper.find('picture');
      expect(picture.element.tagName).toBe('PICTURE');
    });

    it('should render a <source> component as a child', () => {
      const wrapper = mount(IxPictureSimple, {
        shallow: false,
      });
      const sourceElement = wrapper.find('picture > source');
      expect(sourceElement.exists()).toBe(true);
      expect(sourceElement.element.tagName).toBe('SOURCE');
    });

    it('should allow developer to pass an ix-img component as a fallback src', () => {
      const wrapper = mount(IxPictureSimple, {
        shallow: false,
      });
      const fallbackImgEl = wrapper.get('img');
      const fallBackSrc = fallbackImgEl.element.getAttribute('src');
      const fallBackSrcSet = fallbackImgEl.element.getAttribute('srcset');
      expect(fallBackSrc).toBeDefined();
      expect(fallBackSrc).toMatch(/ixlib=vue/);
      expect(fallBackSrcSet).toBeDefined();
      expect(fallBackSrcSet).toMatch(/ixlib/);
    });

    it('should have a srcset attribute', () => {
      const wrapper = mount(IxPictureSimple, {
        shallow: false,
      });
      const sourceElement = wrapper.find('picture > source');
      const elementSrcset = sourceElement.element.getAttribute('srcset');
      expect(sourceElement.exists()).toBe(true);
      expect(elementSrcset).toMatch('100w');
      wrapper.unmount();
    });

    const subsetOfImportantSourceAttributes = {
      sizes: '100vw',
      media: '(min-width: 100em)',
      type: 'image/webp',
    };
    Object.entries(subsetOfImportantSourceAttributes).forEach(
      ([attribute, value]) => {
        it(`should allow developer to set ${attribute} attribute`, () => {
          const wrapper = mount(IxSource, {
            shallow: false,
            props: {
              src: 'https://sdk-test.imgix.net/amsterdam.jpg',
            },
            attrs: {
              [attribute]: value,
            },
          });
          const ele = wrapper.find('source');
          const eleAttr = ele.element.getAttribute(attribute);
          expect(eleAttr).toBe(value);
          wrapper.unmount();
        });
      },
    );

    it('should pass params from imgixParams', () => {
      const wrapper = mount(IxSource, {
        shallow: false,
        props: {
          src: 'https://sdk-test.imgix.net/amsterdam.jpg',
          'data-testid': 'test-source',
          imgixParams: { w: 100 },
        },
      });
      const eleSrcset = wrapper.find('source').element.getAttribute('srcset');
      expect(eleSrcset).toBeTruthy();
      expect(eleSrcset).toMatch(/w=100/);
    });
  });
});
