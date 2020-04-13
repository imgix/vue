import ImgixClient from 'imgix-core-js';
import { IBuildUrlObject, IBuildUrlObjectResult, IImgixClientOptions, IVueImgixClient } from './types';

class VueImgixClient implements IVueImgixClient {
  #client: ImgixClient;
  constructor(options: IImgixClientOptions) {
    this.#client = new ImgixClient(options)
  }

  buildUrlObject(url: string, options?: {}): IBuildUrlObjectResult {
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

let vueImgixClientSingleton: IVueImgixClient | undefined = undefined;

export const initVueImgix = (options: IImgixClientOptions) => {
  vueImgixClientSingleton = new VueImgixClient(options)
}

const ensureVueImgixClientSingleton = (): IVueImgixClient => {
  if (vueImgixClientSingleton == null) {
    throw new Error('[vue-imgix] initVueImgix must be called before using exported methods. This is usually done in App.vue :)')
  }
  return vueImgixClientSingleton
}

export const buildUrlObject: IBuildUrlObject = (...args) => {
  const client = ensureVueImgixClientSingleton();
  return client.buildUrlObject(...args)
}

export type { IVueImgixClient };

