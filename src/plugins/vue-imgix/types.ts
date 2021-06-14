import ImgixClient from '@imgix/js-core';

export type IImgixParams = Record<string, unknown>;

export type IBuildSrcSetOptions = Parameters<ImgixClient['buildSrcSet']>[2];
export type IBuildUrlOptions = Record<string, unknown>;
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

export type IVueImgixClient = {
  buildUrlObject: IBuildUrlObject;
  buildUrl: IBuildUrl;
  _buildUrl: IBuildUrl;
  buildSrcSet: IBuildSrcSet;
  _buildSrcSet: IBuildSrcSet;
};

export type IVueUseImgixOptions = IImgixClientOptions;
