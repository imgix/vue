import { Imgix } from '@/plugins/vue-imgix';
import { render } from '@testing-library/vue';
describe('imgix component', () => {
  it('an img should be rendered', () => {
    const wrapper = render(Imgix, {
      propsData: {
        src: 'examples/pione.jpg',
        'data-testid': 'img-rendering',
      },
    });

    expect(wrapper.findByTestId('img-rendering'));
  });
});
