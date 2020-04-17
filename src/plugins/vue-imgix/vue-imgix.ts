import ImgixClient from 'imgix-core-js';
import {
  IBuildUrl,
  IBuildUrlObject,
  IBuildUrlObjectResult,
  IImgixClientOptions,
  IImgixParams,
  IVueImgixClient,
} from './types';

const VERSION = '0.1.0';

class VueImgixClient implements IVueImgixClient {
  client: ImgixClient;
  constructor(options: IImgixClientOptions) {
    this.client = new ImgixClient({
      ...options,
    });
    // This is not a public API, so it is not included in the type definitions for ImgixClient
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.client as any).settings.libraryParam = `vue-${VERSION}`;
  }

  buildUrlObject(url: string, options?: IImgixParams): IBuildUrlObjectResult {
    const src = this.client.buildURL(url, options);
    const srcset = this.client.buildSrcSet(url, options);

    return { src, srcset };
  }

  buildUrl(url: string, options?: IImgixParams): string {
    return this.client.buildURL(url, options);
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
  vueImgixClientSingleton = new VueImgixClient(options);
};

const ensureVueImgixClientSingleton = (): IVueImgixClient => {
  if (vueImgixClientSingleton == null) {
    throw new Error(
      '[vue-imgix] initVueImgix must be called before using exported methods. This is usually done in App.vue :)',
    );
  }
  return vueImgixClientSingleton;
};

export const buildUrlObject: IBuildUrlObject = (...args) => {
  const client = ensureVueImgixClientSingleton();
  return client.buildUrlObject(...args);
};

export const buildUrl: IBuildUrl = (...args) => {
  const client = ensureVueImgixClientSingleton();
  return client.buildUrl(...args);
};

export { IVueImgixClient };
