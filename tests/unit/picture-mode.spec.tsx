import VueImgix from '@/plugins/imgix-vue';
import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import Vue from 'vue';
describe('Picture Mode', () => {
  beforeAll(() => {
    Vue.use(VueImgix, {
      domain: 'assets.imgix.net',
    });
  });

  describe('ix-picture', () => {
    it('should render a picture', () => {
      const wrapper = render(
        Vue.component('test-component', {
          render() {
            return <ix-picture data-testid="test-picture" />;
          },
        }),
      );

      expect(wrapper.getByTestId('test-picture').tagName).toBe('PICTURE');
    });

    it('should render a source as a child', () => {
      const wrapper = render(
        Vue.component('test-component', {
          render() {
            return (
              <ix-picture data-testid="test-picture">
                <ix-source src="image.jpg" />
                <ix-img src="image.jpg" />
              </ix-picture>
            );
          },
        }),
      );

      expect(
        wrapper.getByTestId('test-picture').querySelectorAll('source'),
      ).toHaveLength(1);
    });

    it('the developer can pass an ix-img component as a fallback src', () => {
      const wrapper = render(
        Vue.component('test-component', {
          render() {
            return (
              <ix-picture data-testid="test-picture">
                <ix-source src="image.jpg" />
                <ix-img src="image.jpg" />
              </ix-picture>
            );
          },
        }),
      );

      const fallbackImgEl = wrapper
        .getByTestId('test-picture')
        .querySelectorAll('img')[0];
      expect(fallbackImgEl).toHaveAttribute(
        'src',
        expect.stringMatching(/ixlib=vue/),
      );
      expect(fallbackImgEl).toHaveAttribute(
        'srcset',
        expect.stringMatching(/ixlib/),
      );
    });
  });

  describe('ix-source', () => {
    it('should render a <source> component', () => {
      const wrapper = render(
        Vue.component('test-component', {
          render() {
            return <ix-source src="image.jpg" data-testid="test-source" />;
          },
        }),
      );

      expect(wrapper.getByTestId('test-source').tagName).toBe('SOURCE');
    });

    it('should have a srcset attribute', () => {
      const wrapper = render(
        Vue.component('test-component', {
          render() {
            return <ix-source data-testid="test-source" src="image.png" />;
          },
        }),
      );

      expect(wrapper.getByTestId('test-source')).toHaveAttribute(
        'srcset',
        expect.stringMatching('100w'),
      );
    });

    const subsetOfImportantSourceAttributes = {
      sizes: '100vw',
      media: '(min-width: 100em)',
      type: 'image/webp',
    };
    Object.entries(subsetOfImportantSourceAttributes).map(
      ([attribute, value]) => {
        it(`should allow developer to set ${attribute} attribute`, () => {
          const wrapper = render(
            Vue.component('test-component', {
              render() {
                return (
                  <ix-source
                    data-testid="test-source"
                    src="image.png"
                    // Don't understand why this works? Me neither. Just joking - take a read of this to see why attrs={} is necessary https://github.com/vuejs/babel-plugin-transform-vue-jsx/issues/143
                    attrs={{ [attribute]: value }}
                  />
                );
              },
            }),
          );

          expect(wrapper.getByTestId('test-source')).toHaveAttribute(
            attribute,
            value,
          );
        });
      },
    );

    it('should pass params from imgixParams', () => {
      const wrapper = render(
        Vue.component('test-component', {
          render() {
            return (
              <ix-source
                data-testid="test-source"
                src="image.png"
                imgixParams={{ w: 100 }}
              />
            );
          },
        }),
      );

      expect(wrapper.getByTestId('test-source')).toHaveAttribute(
        'srcset',
        expect.stringMatching('w=100'),
      );
    });
  });
});
