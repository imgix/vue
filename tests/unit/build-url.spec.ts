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

  it('builds an imgix url', () => {
    const url = client.buildUrl('/examples/pione.jpg', {});
    expect(url).toMatch(/assets.imgix.net\/examples\/pione.jpg/);
  });
});
