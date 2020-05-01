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
      domain: 'testing.imgix.net',
    });
  });

  it('builds an imgix url', () => {
    const { src, srcset } = client.buildUrlObject('/examples/pione.jpg', {});

    expect(src).toMatch(/testing.imgix.net\/examples\/pione.jpg/);
    expect(srcset).toMatch(/testing.imgix.net\/examples\/pione.jpg/);
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
    it('custom widths are passed to imgix-core-js', () => {
      jest.resetModules();
      jest.mock('imgix-core-js');
      const { buildImgixClient } = require('@/plugins/vue-imgix/');
      const ImgixClient = require('imgix-core-js');
      const ImgixMock = {
        settings: {},
        buildSrcSet: jest.fn(),
        buildURL: jest.fn(),
      };
      ImgixClient.mockImplementation(() => ImgixMock);

      const client = buildImgixClient({
        domain: 'testing.imgix.net',
      });

      client.buildUrlObject('image.jpg', {}, { widths: [100, 200] });

      expect(ImgixMock.buildSrcSet).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({
          widths: [100, 200],
        }),
      );

      jest.resetAllMocks();
      jest.resetModules();
    });
  });
});
