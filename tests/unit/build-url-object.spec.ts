/* eslint-disable @typescript-eslint/no-var-requires */
import {
  buildImgixClient,
  IVueImgixClient,
} from '@/plugins/vue-imgix/vue-imgix';
import readPkg from 'read-pkg';

describe('buildUrlObject', () => {
  let client: IVueImgixClient;
  beforeAll(() => {
    client = buildImgixClient({
      domain: 'assets.imgix.net',
    });
  });

  it('builds an imgix url', () => {
    const { src, srcset } = client.buildUrlObject('/examples/pione.jpg', {});

    expect(src).toMatch(/assets.imgix.net\/examples\/pione.jpg/);
    expect(srcset).toMatch(/assets.imgix.net\/examples\/pione.jpg/);
  });
  it('adds ixlib to imgix url', async () => {
    const { src, srcset } = client.buildUrlObject('/examples/pione.jpg', {});

    const expectedIxLibRegex = RegExp(
      `ixlib=vue-${await (await readPkg()).version}`,
    );

    expect(src).toMatch(expectedIxLibRegex);
    expect(srcset).toMatch(expectedIxLibRegex);
  });
  it('parameters are correctly rendered', () => {
    const { src, srcset } = client.buildUrlObject('/examples/pione.jpg', {
      w: 400,
    });

    expect(src).toMatch(/w=400/);
    expect(srcset).toMatch(/w=400/);
  });

  describe('srcset generation', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockImgixClient: any;
    let vueImgixClient: IVueImgixClient;
    beforeEach(() => {
      jest.resetModules();
      jest.mock('imgix-core-js');
      const { buildImgixClient } = require('@/plugins/vue-imgix/');
      const ImgixClient = require('imgix-core-js');
      mockImgixClient = {
        settings: {},
        buildSrcSet: jest.fn(),
        buildURL: jest.fn(),
      };
      ImgixClient.mockImplementation(() => mockImgixClient);
      vueImgixClient = buildImgixClient({
        domain: 'assets.imgix.net',
      });
    });
    afterAll(() => {
      jest.resetAllMocks();
      jest.resetModules();
    });
    it('custom widths are passed to imgix-core-js', () => {
      vueImgixClient.buildUrlObject('image.jpg', {}, { widths: [100, 200] });

      expect(mockImgixClient.buildSrcSet).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({
          widths: [100, 200],
        }),
      );
    });
    it('a custom width tolerance is passed to imgix-core-js', () => {
      vueImgixClient.buildUrlObject('image.jpg', {}, { widthTolerance: 0.2 });

      expect(mockImgixClient.buildSrcSet).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({ widthTolerance: 0.2 }),
      );
    });
    it('custom min/max widths are passed to imgix-core-js', () => {
      vueImgixClient.buildUrlObject(
        'image.jpg',
        {},
        { minWidth: 500, maxWidth: 2000 },
      );

      expect(mockImgixClient.buildSrcSet).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({ minWidth: 500, maxWidth: 2000 }),
      );
    });
  });
});
