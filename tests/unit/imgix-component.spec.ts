import { Imgix, initVueImgix } from '@/plugins/vue-imgix';
import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
describe('imgix component', () => {
  beforeAll(() => {
    initVueImgix({
      domain: 'assets.imgix.net',
    });
  });
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

    const firstSrcSet = srcset.split(',').map(v => v.trim())[0];
    expect(firstSrcSet.split(' ')).toHaveLength(2);
    const aSrcFromSrcSet = firstSrcSet.split(' ')[0];
    expect(aSrcFromSrcSet).toContain('examples/pione.jpg');
    const aWidthFromSrcSet = firstSrcSet.split(' ')[1];
    expect(aWidthFromSrcSet).toMatch(/^\d+w$/);
  });
});
