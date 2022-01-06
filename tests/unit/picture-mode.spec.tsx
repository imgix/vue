import IxPictureSimple from '@/components/simple/ix-picture.vue';
import VueImgix from '@/plugins/vue-imgix/index';
import { IxImg } from '@/plugins/vue-imgix/ix-img';
import { IxPicture } from '@/plugins/vue-imgix/ix-picture';
import { IxSource } from '@/plugins/vue-imgix/ix-source';
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

    it('should render a <source> component as a child', () => {
      const wrapper = mount(IxPictureSimple, {
        shallow: false,
      });
      const sourceElement = wrapper.find('picture > source');
      expect(sourceElement.exists()).toBe(true);
      expect(sourceElement.element.tagName).toBe('SOURCE');
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

    it(`should allow developer to set sizes, media, and type attributes`, () => {
      const wrapper = mount(IxPictureSimple, {
        shallow: false,
        props: {
          foo: 'bar',
          sizes: '100vw',
          media: '(min-width: 100em)',
          type: 'image/webp',
        },
      });

      const sourceElement = wrapper.find('picture > source');
      // log the component props
      console.log('props', wrapper.props());
      console.log('outerHtml', sourceElement.element.outerHTML);
      
      const eleSizes = sourceElement.element.getAttribute('sizes');
      const eleMedia = sourceElement.element.getAttribute('media');
      const eleType = sourceElement.element.getAttribute('sizes');
      
      console.log('attrs', eleSizes, eleMedia, eleType);

      expect(eleSizes).toBeTruthy()
      expect(eleType).toBeTruthy();
      expect(eleMedia).toBeTruthy();
      wrapper.unmount();
    });
  });
});

// describe('Picture Mode', () => {
//   beforeAll(() => {
//     App.use(VueImgix, {
//       domain: 'assets.imgix.net',
//     });
//   });

//     it('should have a srcset attribute', () => {
//     const subsetOfImportantSourceAttributes = {
//       sizes: '100vw',
//       media: '(min-width: 100em)',
//       type: 'image/webp',
//     };
//     Object.entries(subsetOfImportantSourceAttributes).forEach(
//       ([attribute, value]) => {
//         it(`should allow developer to set ${attribute} attribute`, () => {
//           render(
//             App.component('test-component', {
//               render() {
//                 return (
//                   <ix-source
//                     data-testid="test-source"
//                     src="image.png"
//                     // Don't understand why this works? Me neither. Just joking - take a read of this to see why attrs={} is necessary https://github.com/vuejs/babel-plugin-transform-vue-jsx/issues/143
//                     attrs={{ [attribute]: value }}
//                   />
//                 );
//               },
//             }),
//           );

//           expect(screen.getByTestId('test-source')).toHaveAttribute(
//             attribute,
//             value,
//           );
//         });
//       },
//     );

//     it('should pass params from imgixParams', () => {
//       render(
//         App.component('test-component', {
//           render() {
//             return (
//               <ix-source
//                 data-testid="test-source"
//                 src="image.png"
//                 imgixParams={{ w: 100 }}
//               />
//             );
//           },
//         }),
//       );

//       expect(screen.getByTestId('test-source')).toHaveAttribute(
//         'srcset',
//         expect.stringMatching('w=100'),
//       );
//     });
//   });
// });
