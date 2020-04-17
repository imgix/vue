import {
  buildImgixClient,
  IVueImgixClient,
} from '@/plugins/vue-imgix/vue-imgix';

describe('buildUrlObject', () => {
  let client: IVueImgixClient;
  beforeAll(() => {
    client = buildImgixClient({
      domain: 'assets.imgix.net',
    });
  });

  it('builds an imgix url', () => {
    const url = client.buildUrl('/examples/pione.jpg', {});
    expect(url).toMatch(/assets.imgix.net\/examples\/pione.jpg/);
  });
});
