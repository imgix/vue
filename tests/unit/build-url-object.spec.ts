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
    const { src, srcset } = client.buildUrlObject('/examples/pione.jpg', {});

    expect(src).toMatch(/assets.imgix.net\/examples\/pione.jpg/);
    expect(srcset).toMatch(/assets.imgix.net\/examples\/pione.jpg/);
  });
  it('adds ixlib to imgix url', () => {});
});
