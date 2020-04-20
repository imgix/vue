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
  it(`the rendered img's srcset should be set correctly`, () => {
    const wrapper = render(Imgix, {
      propsData: {
        src: 'examples/pione.jpg',
        'data-testid': 'img-rendering',
      },
    });

    const srcset = wrapper.getByTestId('img-rendering').getAttribute('srcset');

    expect(srcset).not.toBeFalsy();
    if (!srcset) {
      fail('srcset is null');
    }
    expect(srcset.split(', ')[0].split(' ')).toHaveLength(2);
    const aSrcFromSrcSet = srcset.split(', ')[0].split(' ')[0];
    expect(aSrcFromSrcSet).toContain('examples/pione.jpg');
    const aWidthFromSrcSet = srcset.split(', ')[0].split(' ')[1];
    expect(aWidthFromSrcSet).toMatch(/^\d+w$/);

    expect(srcset);
  });
});
