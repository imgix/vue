import ImgixClient from 'imgix-core-js';

export type IImgixParams = {};

export type IBuildSrcSetOptions = Parameters<
  ImgixClient['buildSrcSet']
>[2] & {};
export type IBuildUrlOptions = {};
export type IBuildUrlObjectOptions = IBuildSrcSetOptions & IBuildUrlOptions;

export interface IImgixClientOptions {
  domain: string;
  includeLibraryParam?: boolean;
  defaultIxParams?: IImgixParams;
}

export interface IBuildUrlObjectResult {
  src: string;
  srcset: string;
}
export type IBuildUrlObject = (
  url: string,
  ixParams?: IImgixParams,
  options?: IBuildUrlObjectOptions,
) => IBuildUrlObjectResult;

export type IBuildUrl = (url: string, ixParams?: IImgixParams) => string;

export type IBuildSrcSet = (
  url: string,
  ixParams?: IImgixParams,
  options?: IBuildSrcSetOptions,
) => string;

export interface IVueImgixClient {
  buildUrlObject: IBuildUrlObject;
  buildUrl: IBuildUrl;
  buildSrcSet: IBuildSrcSet;
}

export type IVueUseImgixOptions = IImgixClientOptions;
