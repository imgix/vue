/* eslint-disable @typescript-eslint/no-var-requires */
import {
  buildImgixClient,
  IVueImgixClient,
} from '@/plugins/vue-imgix/vue-imgix';

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

    client.buildSrcSet('image.jpg', {}, { widths: [100, 200] });

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
