import ImgixClient from 'imgix-core-js';
import { IBuildUrlObjectResult, IImgixClientOptions, IVueImgixClient } from './types';

class VueImgixClient implements IVueImgixClient {
  #client: ImgixClient;
  constructor(options: IImgixClientOptions) {
    this.#client = new ImgixClient(options)
  }

  buildUrlObject(url: string, options: {}): IBuildUrlObjectResult {
    const src = this.#client.buildURL(url, options)
    const srcset = this.#client.buildSrcSet(url, options)

    return {src, srcset}
  }
}

export const buildImgixClient = (options: IImgixClientOptions) => {
  const client = new VueImgixClient({
    ...options,
  });

  return client;
};

export type { IVueImgixClient };

