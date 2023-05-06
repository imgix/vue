/* eslint-disable @typescript-eslint/no-var-requires */
import {
  buildImgixClient,
  IVueImgixClient,
} from '@/plugins/imgix-vue/imgix-vue';
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockImgixClient: any;
    let vueImgixClient: IVueImgixClient;
    beforeEach(() => {
      vi.resetModules();
      vi.doMock('@imgix/js-core');
      vi.doMock('@/plugins/imgix-vue/');
      mockImgixClient = {
        settings: {},
        buildUrlObject: vi.fn(),
        buildSrcSet: vi.fn(),
        buildURL: vi.fn(),
      };
      vueImgixClient = buildImgixClient({
        domain: 'testing.imgix.net',
      });
    });
    afterAll(() => {
      vi.resetAllMocks();
      vi.resetModules();
    });
    it('custom widths are passed to @imgix/js-core', () => {
      const spy = vi
        .spyOn(vueImgixClient, 'buildUrlObject')
        .mockImplementation(() => mockImgixClient.buildUrlObject());
      vueImgixClient.buildUrlObject('image.jpg', {}, { widths: [100, 200] });

      expect(spy).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({
          widths: [100, 200],
        }),
      );
    });
    it('a custom width tolerance is passed to @imgix/js-core', () => {
      const spy = vi
        .spyOn(vueImgixClient, 'buildUrlObject')
        .mockImplementation(() => mockImgixClient.buildSrcSet());
      vueImgixClient.buildUrlObject('image.jpg', {}, { widthTolerance: 0.2 });

      expect(spy).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({ widthTolerance: 0.2 }),
      );
    });
    it('custom min/max widths are passed to @imgix/js-core', () => {
      const spy = vi
        .spyOn(vueImgixClient, 'buildUrlObject')
        .mockImplementation(() => mockImgixClient.buildUrlObject());
      vueImgixClient.buildUrlObject(
        'image.jpg',
        {},
        { minWidth: 500, maxWidth: 2000 },
      );

      expect(spy).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({ minWidth: 500, maxWidth: 2000 }),
      );
    });
  });
});
