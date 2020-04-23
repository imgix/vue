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

  it('imgixParams should be set on the rendered src and srcset', () => {
    const wrapper = render(Imgix, {
      propsData: {
        'data-testid': 'img-rendering',
        src: 'examples/pione.jpg',
        imgixParams: { crop: 'faces' },
      },
    });

    expect(wrapper.getByTestId('img-rendering')).toHaveAttribute(
      'src',
      expect.stringMatching('crop=faces'),
    );
    expect(wrapper.getByTestId('img-rendering')).toHaveAttribute(
      'srcset',
      expect.stringMatching('crop=faces'),
    );
  });

  describe('in fixed mode (width or height passed to url, imgixParams, or dom attribute)', () => {
    it('when a width passed to imgixParams', () => {
      const wrapper = render(Imgix, {
        propsData: {
          'data-testid': 'img-rendering',
          src: 'examples/pione.jpg',
          imgixParams: {
            w: 100,
          },
        },
      });

      expect(wrapper.getByTestId('img-rendering')).toHaveAttribute(
        'src',
        expect.stringMatching('w=100'),
      );
      const srcset = wrapper
        .getByTestId('img-rendering')
        .getAttribute('srcset');

      expect(srcset).not.toBeFalsy();
      if (!srcset) {
        fail('srcset is null');
      }
      const firstSrcSet = srcset.split(',').map(v => v.trim())[0];
      expect(firstSrcSet).toMatch('w=100');
      expect(firstSrcSet).toMatch('dpr=1');
      expect(firstSrcSet).toMatch(' 1x');
    });

    it('when a width passed to element', () => {
      const wrapper = render(Imgix, {
        propsData: {
          'data-testid': 'img-rendering',
          src: 'examples/pione.jpg',
          width: 100,
        },
      });

      expect(wrapper.getByTestId('img-rendering')).toHaveAttribute(
        'src',
        expect.stringMatching('w=100'),
      );
      const srcset = wrapper
        .getByTestId('img-rendering')
        .getAttribute('srcset');

      expect(srcset).not.toBeFalsy();
      if (!srcset) {
        fail('srcset is null');
      }
      const firstSrcSet = srcset.split(',').map(v => v.trim())[0];
      expect(firstSrcSet).toMatch('w=100');
      expect(firstSrcSet).toMatch('dpr=1');
      expect(firstSrcSet).toMatch(' 1x');
    });
  });
});
