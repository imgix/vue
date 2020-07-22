import ImgixClient from 'imgix-core-js';
import { IxImg } from '@/plugins/vue-imgix/ix-img';
import {
  IBuildSrcSet,
  IBuildSrcSetOptions,
  IBuildUrl,
  IBuildUrlObject,
  IBuildUrlObjectOptions,
  IBuildUrlObjectResult,
  IImgixClientOptions,
  IImgixParams,
  IVueImgixClient,
} from './types';

// Do not change this
const VERSION = '2.8.1';

const clientOptionDefaults = {
  includeLibraryParam: true,
};

class VueImgixClient implements IVueImgixClient {
  client: ImgixClient;
  private readonly options: IImgixClientOptions;

  constructor(options: IImgixClientOptions) {
    this.options = { ...clientOptionDefaults, ...options };

    this.client = new ImgixClient({
      domain: this.options.domain,
      includeLibraryParam: false, // force false so that imgix-core-js doesn't include its own library param
    });
    // This is not a public API, so it is not included in the type definitions for ImgixClient
    if (this.options.includeLibraryParam) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.client as any).settings.libraryParam = `vue-${VERSION}`;
    }
  }

  buildIxParams = (ixParams?: IImgixParams) => {
    return {
      ...this.options.defaultIxParams,
      ...ixParams,
    };
  };

  buildUrlObject = (
    url: string,
    ixParams?: IImgixParams,
    options: IBuildUrlObjectOptions = {},
  ): IBuildUrlObjectResult => {
    const {
      widths,
      widthTolerance,
      minWidth,
      maxWidth,
      ...sharedOptions // Right now this is only passed to buildSrcSet, but in the future it might be passed to buildUrl
    } = options;

    const src = this.buildUrl(url, ixParams);
    const srcset = this.buildSrcSet(url, ixParams, {
      widths,
      widthTolerance,
      minWidth,
      maxWidth,
      ...sharedOptions,
    });

    return { src, srcset };
  };

  buildUrl = (url: string, ixParams?: IImgixParams): string => {
    return this.client.buildURL(url, this.buildIxParams(ixParams));
  };

  buildSrcSet = (
    url: string,
    ixParams?: IImgixParams,
    options?: IBuildSrcSetOptions,
  ): string => {
    return this.client.buildSrcSet(url, this.buildIxParams(ixParams), options);
  };
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

export const ensureVueImgixClientSingleton = (): IVueImgixClient => {
  if (vueImgixClientSingleton == null) {
    throw new Error(
      '[vue-imgix] Vue.use(VueImgix, {}) must be called before using exported methods. This is usually done in App.vue :)',
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

export const buildSrcSet: IBuildSrcSet = (...args) => {
  const client = ensureVueImgixClientSingleton();
  return client.buildSrcSet(...args);
};

export { IVueImgixClient, IxImg };
