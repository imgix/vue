import { createApp } from 'vue';
import VueImgix, { IxImg } from '@/plugins/vue-imgix';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import _App from '../../src/App.vue';
import {
  expectElementToHaveFixedSrcAndSrcSet,
  expectElementToHaveFluidSrcAndSrcSet,
} from '../helpers/url-assert';

const App = createApp(_App);

describe('imgix component', () => {
  beforeAll(() => {
    App.use(VueImgix, {
      domain: 'assets.imgix.net',
    });
  });
  it('an img should be rendered', () => {
    render(IxImg, {
      props: {
        src: 'examples/pione.jpg',
        // TODO(luis): remove this when we have a better way of testing
        dataTestId: 'img-rendering',
      },
    });

    expect(screen.getByTestId('img-rendering'));
  });
  it(`the rendered img's src should be set`, () => {
    render(IxImg, {
      props: {
        src: 'examples/pione.jpg',
        dataTestId: 'img-rendering',
      },
    });

    expect(screen.getByTestId('img-rendering')).toHaveAttribute(
      'src',
      expect.stringMatching('examples/pione.jpg'),
    );
  });
  it(`the rendered img's srcset should be set correctly`, () => {
    render(IxImg, {
      props: {
        src: 'examples/pione.jpg',
        dataTestId: 'img-rendering',
      },
    });

    const srcset = screen.getByTestId('img-rendering').getAttribute('srcset');

    expect(srcset).not.toBeFalsy();
    if (!srcset) {
      fail('srcset is null');
    }

    const firstSrcSet = srcset.split(',').map((v) => v.trim())[0];
    expect(firstSrcSet.split(' ')).toHaveLength(2);
    const aSrcFromSrcSet = firstSrcSet.split(' ')[0];
    expect(aSrcFromSrcSet).toContain('examples/pione.jpg');
    const aWidthFromSrcSet = firstSrcSet.split(' ')[1];
    expect(aWidthFromSrcSet).toMatch(/^\d+w$/);
  });

  it('imgixParams should be set on the rendered src and srcset', () => {
    render(IxImg, {
      props: {
        dataTestId: 'img-rendering',
        src: 'examples/pione.jpg',
        imgixParams: { crop: 'faces' },
      },
    });

    expect(screen.getByTestId('img-rendering')).toHaveAttribute(
      'src',
      expect.stringMatching('crop=faces'),
    );
    expect(screen.getByTestId('img-rendering')).toHaveAttribute(
      'srcset',
      expect.stringMatching('crop=faces'),
    );
  });

  describe('in fluid mode (no fixed props set)', () => {
    it('ix-img should render a fluid image if width is passed as attribute', () => {
      render(IxImg, {
        props: {
          dataTestId: 'img-rendering',
          src: 'examples/pione.jpg',
          width: 100,
        },
      });

      const el = screen.getByTestId('img-rendering');
      expectElementToHaveFluidSrcAndSrcSet(el);
    });
  });

  describe('in fixed mode (fixed prop set, or width/height passed to imgixParams)', () => {
    it('the src and srcset should be in fixed size mode when a width is passed to imgixParams', () => {
      render(IxImg, {
        props: {
          dataTestId: 'img-rendering',
          src: 'examples/pione.jpg',
          imgixParams: {
            w: 100,
          },
        },
      });

      const el = screen.getByTestId('img-rendering');
      expectElementToHaveFixedSrcAndSrcSet(el, 100);
    });
    it('the src and srcset should be in fixed size mode when a fixed prop is passed to the element', () => {
      render(IxImg, {
        props: {
          dataTestId: 'img-rendering',
          src: 'examples/pione.jpg',
          width: 100,
          height: 150,
          fixed: true,
        },
      });

      const el = screen.getByTestId('img-rendering');
      expectElementToHaveFixedSrcAndSrcSet(el, 100);

      expect(el).toHaveAttribute('src', expect.stringMatching('h=150'));
      expect(el).toHaveAttribute('srcset', expect.stringMatching('h=150'));
    });

    it('a width attribute should be passed through to the underlying component', () => {
      render(IxImg, {
        props: {
          dataTestId: 'img-rendering',
          src: 'examples/pione.jpg',
          width: 100,
        },
      });

      expect(screen.getByTestId('img-rendering')).toHaveAttribute(
        'width',
        '100',
      );
    });
    it('a height attribute should be passed through to the underlying component', () => {
      render(IxImg, {
        props: {
          dataTestId: 'img-rendering',
          src: 'examples/pione.jpg',
          height: 100,
        },
      });

      expect(screen.getByTestId('img-rendering')).toHaveAttribute(
        'height',
        '100',
      );
    });
  });

  describe('attributeConfig', () => {
    const ATTRIBUTES = ['src', 'srcset'];
    ATTRIBUTES.forEach((attribute) => {
      it(`${attribute} can be configured to use data-${attribute}`, () => {
        render(IxImg, {
          props: {
            dataTestId: 'img-rendering',
            src: 'examples/pione.jpg',
            attributeConfig: {
              [attribute]: `data-${attribute}`,
            },
          },
        });

        expect(screen.getByTestId('img-rendering')).toHaveAttribute(
          `data-${attribute}`,
          expect.stringMatching(/ixlib/),
        );
        expect(screen.getByTestId('img-rendering')).not.toHaveAttribute(
          attribute,
        );
      });
    });
  });
  describe('disableVariableQuality', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockImgixClient: any;
    let _IxImg: typeof IxImg;
    beforeEach(() => {
      /* eslint-disable @typescript-eslint/no-var-requires */
      jest.resetModules();
      const _Vue = require('vue');
      const _VueImgix = require('@/plugins/vue-imgix');
      _IxImg = _VueImgix.IxImg;
      jest.mock('@imgix/js-core');
      mockImgixClient = {
        settings: {},
        buildSrcSet: jest.fn(),
        buildURL: jest.fn(),
      };
      const ImgixClient = require('@imgix/js-core');
      ImgixClient.mockImplementation(() => mockImgixClient);
      App.use(_VueImgix, {
        domain: 'assets.imgix.net',
      });
      /* eslint-enable @typescript-eslint/no-var-requires */
    });
    it('should not pass disableVariableQuality: true to @imgix/js-core by default', () => {
      render(_IxImg, {
        props: {
          src: 'examples/pione.jpg',
          height: 100,
          fixed: true,
        },
      });

      expect(mockImgixClient.buildSrcSet).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({
          disableVariableQuality: false,
        }),
      );
    });
    it('should pass disableVariableQuality: true to @imgix/js-core when disableVariableQuality prop set', () => {
      render(_IxImg, {
        props: {
          src: 'examples/pione.jpg',
          height: 100,
          disableVariableQuality: true,
          fixed: true,
        },
      });

      expect(mockImgixClient.buildSrcSet).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({
          disableVariableQuality: true,
        }),
      );
    });
  });
});
