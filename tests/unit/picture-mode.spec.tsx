import VueImgix from '@/plugins/vue-imgix';
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
                <ix-source />
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
  });

  describe('ix-source', () => {
    it('should render a <source> component', () => {
      const wrapper = render(
        Vue.component('test-component', {
          render() {
            return <ix-source data-testid="test-source" />;
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
  });
});
