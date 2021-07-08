import { createApp } from 'vue';
import { render, screen } from '@testing-library/vue';
import '@testing-library/jest-dom';

import VueImgix from '@/plugins/vue-imgix';
import { IxPicture } from '@/plugins/vue-imgix/ix-picture';
import _App from '../../src/App.vue';

const App = createApp(_App);

describe.skip('Picture Mode', () => {
  beforeAll(() => {
    App.use(VueImgix, {
      domain: 'assets.imgix.net',
    });
  });

  describe('ix-picture', () => {
    it('should render a picture', () => {
      render(IxPicture, {
        props: {
          src: 'examples/pione.jpg',
          ['data-testid']: 'test-picture',
        },
      });

      expect(screen.getByTestId('test-picture').tagName).toBe('PICTURE');
    });

    it('should render a source as a child', () => {
      const { getByTestId } = render(
        App.component('test', {
          template: `
        <ix-picture data-testid="test-picture">
          <ix-source src="image.jpg" />
          <ix-img src="image.jpg" />
        </ix-picture>
      `,
        }),
      );
      expect(
        getByTestId('test-picture').querySelectorAll('source'),
      ).toHaveLength(1);
    });

    it('the developer can pass an ix-img component as a fallback src', () => {
      render(
        App.component('test-component', {
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

      const fallbackImgEl = screen
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
      render(
        App.component('test-component', {
          render() {
            return <ix-source src="image.jpg" data-testid="test-source" />;
          },
        }),
      );

      expect(screen.getByTestId('test-source').tagName).toBe('SOURCE');
    });

    it('should have a srcset attribute', () => {
      render(
        App.component('test-component', {
          render() {
            return <ix-source data-testid="test-source" src="image.png" />;
          },
        }),
      );

      expect(screen.getByTestId('test-source')).toHaveAttribute(
        'srcset',
        expect.stringMatching('100w'),
      );
    });

    const subsetOfImportantSourceAttributes = {
      sizes: '100vw',
      media: '(min-width: 100em)',
      type: 'image/webp',
    };
    Object.entries(subsetOfImportantSourceAttributes).forEach(
      ([attribute, value]) => {
        it(`should allow developer to set ${attribute} attribute`, () => {
          render(
            App.component('test-component', {
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

          expect(screen.getByTestId('test-source')).toHaveAttribute(
            attribute,
            value,
          );
        });
      },
    );

    it('should pass params from imgixParams', () => {
      render(
        App.component('test-component', {
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

      expect(screen.getByTestId('test-source')).toHaveAttribute(
        'srcset',
        expect.stringMatching('w=100'),
      );
    });
  });
});
