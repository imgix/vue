import { Imgix } from '@/plugins/vue-imgix';
import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
describe('imgix component', () => {
  it('an img should be rendered', () => {
    const wrapper = render(Imgix, {
      propsData: {
        src: 'examples/pione.jpg',
        'data-testid': 'img-rendering',
      },
    });

    expect(wrapper.getByTestId('img-rendering'));
  });
  it(`the rendered img's src should be set`, () => {
    const wrapper = render(Imgix, {
      propsData: {
        src: 'examples/pione.jpg',
        'data-testid': 'img-rendering',
      },
    });

    expect(wrapper.getByTestId('img-rendering')).toHaveAttribute(
      'src',
      expect.stringMatching('examples/pione.jpg'),
    );
  });
});
