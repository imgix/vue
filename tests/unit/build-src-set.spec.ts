/* eslint-disable @typescript-eslint/no-var-requires */
import {
  buildImgixClient,
  IVueImgixClient,
} from '@/plugins/imgix-vue/imgix-vue';

describe('buildSrcSet', () => {
  let client: IVueImgixClient;
  beforeAll(() => {
    client = buildImgixClient({
      domain: 'assets.imgix.net',
    });
  });

  it('builds an srcset list', () => {
    const url = client.buildSrcSet('/examples/pione.jpg', {});

    const firstSrcSet = url.split(',')[0].split(' ');
    expect(firstSrcSet[0]).toMatch(/assets.imgix.net\/examples\/pione.jpg/);
    expect(firstSrcSet[0]).toMatch(/w=[0-9]/);
    expect(firstSrcSet[1]).toMatch(/^[0-9]+w$/);
  });

  describe('srcset generation', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockImgixClient: any;
    let vueImgixClient: IVueImgixClient;
    beforeEach(() => {
      jest.resetModules();
      jest.mock('@imgix/js-core');
      const { buildImgixClient } = require('@/plugins/imgix-vue/');
      const ImgixClient = require('@imgix/js-core');
      mockImgixClient = {
        settings: {},
        buildSrcSet: jest.fn(),
        buildURL: jest.fn(),
      };
      ImgixClient.mockImplementation(() => mockImgixClient);
      vueImgixClient = buildImgixClient({
        domain: 'testing.imgix.net',
      });
    });
    afterAll(() => {
      jest.resetAllMocks();
      jest.resetModules();
    });
    it('custom widths are passed to @imgix/js-core', () => {
      vueImgixClient.buildSrcSet('image.jpg', {}, { widths: [100, 200] });

      expect(mockImgixClient.buildSrcSet).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({
          widths: [100, 200],
        }),
      );
    });
    it('a custom width tolerance is passed to @imgix/js-core', () => {
      vueImgixClient.buildSrcSet('image.jpg', {}, { widthTolerance: 0.2 });

      expect(mockImgixClient.buildSrcSet).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({ widthTolerance: 0.2 }),
      );
    });
    it('custom min/max widths are passed to @imgix/js-core', () => {
      vueImgixClient.buildSrcSet(
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
