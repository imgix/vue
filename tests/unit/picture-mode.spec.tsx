import VueImgix from '@/plugins/vue-imgix';
import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import Vue from 'vue';
describe('imgix component', () => {
  beforeAll(() => {
    Vue.use(VueImgix, {
      domain: 'assets.imgix.net',
    });
  });

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
              <ix-img />
            </ix-picture>
          );
        },
      }),
    );

    expect(wrapper.getByTestId('test-picture').getElementsByTagName('source'));
  });
});
