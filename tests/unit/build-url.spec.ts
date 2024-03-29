import {
  buildImgixClient,
  IVueImgixClient,
} from '@/plugins/imgix-vue/imgix-vue';

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
    const customUrl = client._buildUrl(
      'https://sdk-test.imgix.net/amsterdam.jpg',
      {},
    );

    expect(customUrl).toMatch(/https:\/\/sdk-test.imgix.net\/amsterdam.jpg/);
  });
});
