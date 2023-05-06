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
        .spyOn(vueImgixClient, 'buildSrcSet')
        .mockImplementation(() => mockImgixClient.buildSrcSet());

      vueImgixClient.buildSrcSet('image.jpg', {}, { widths: [100, 200] });

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
        .spyOn(vueImgixClient, 'buildSrcSet')
        .mockImplementation(() => mockImgixClient.buildSrcSet());

      vueImgixClient.buildSrcSet('image.jpg', {}, { widthTolerance: 0.2 });

      expect(spy).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({ widthTolerance: 0.2 }),
      );
    });
    it('custom min/max widths are passed to @imgix/js-core', () => {
      const spy = vi
        .spyOn(vueImgixClient, 'buildSrcSet')
        .mockImplementation(() => mockImgixClient.buildSrcSet());

      vueImgixClient.buildSrcSet(
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

describe('_buildSrcSet', () => {
  let client: IVueImgixClient;
  beforeAll(() => {
    client = buildImgixClient({
      domain: 'assets.imgix.net',
    });
  });

  it('builds an srcset list', () => {
    const url = client._buildSrcSet(
      'https://sdk-test.imgix.net/amsterdam.jpg',
      {},
    );

    const firstSrcSet = url.split(',')[0].split(' ');
    expect(firstSrcSet[0]).toMatch(/sdk-test.imgix.net\/amsterdam.jpg/);
    expect(firstSrcSet[0]).toMatch(/w=[0-9]/);
    expect(firstSrcSet[1]).toMatch(/^[0-9]+w$/);
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
        _buildSrcSet: vi.fn(),
        _buildURL: vi.fn(),
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
        .spyOn(vueImgixClient, '_buildSrcSet')
        .mockImplementation(() => mockImgixClient._buildSrcSet());

      vueImgixClient._buildSrcSet(
        'https://sdk-test.imgix.net/amsterdam.jpg',
        {},
        { widths: [100, 200] },
      );

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
        .spyOn(vueImgixClient, '_buildSrcSet')
        .mockImplementation(() => mockImgixClient._buildSrcSet());

      vueImgixClient._buildSrcSet(
        'https://sdk-test.imgix.net/amsterdam.jpg',
        {},
        { widthTolerance: 0.2 },
      );

      expect(spy).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({ widthTolerance: 0.2 }),
      );
    });
    it('custom min/max widths are passed to @imgix/js-core', () => {
      const spy = vi
        .spyOn(vueImgixClient, '_buildSrcSet')
        .mockImplementation(() => mockImgixClient._buildSrcSet());

      vueImgixClient._buildSrcSet(
        'https://sdk-test.imgix.net/amsterdam.jpg',
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
