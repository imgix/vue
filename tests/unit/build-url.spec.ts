import {
    buildImgixClient,
    IVueImgixClient
} from '@/plugins/vue-imgix/vue-imgix';

describe('buildUrl', () => {
  let client: IVueImgixClient;
  beforeAll(() => {
    client = buildImgixClient({
      domain: 'assets.imgix.net',
    });
  });

  it('should build an imgix url', () => {
    const url = client.buildUrl('/examples/pione.jpg', {});
    expect(url).toMatch(/assets.imgix.net\/examples\/pione.jpg/);
  });

  it('should accept absolute URLs', () => {
    let customUrl = client._buildUrl(
      'https://sdk-test.imgix.net/amsterdam.jpg',
      {},
    );

    expect(customUrl).toMatch(/https:\/\/sdk-test.imgix.net\/amsterdam.jpg/);
  });
});
