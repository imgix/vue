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
});
