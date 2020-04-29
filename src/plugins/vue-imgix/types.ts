export type IImgixParams = {};

export interface IImgixClientOptions {
  domain: string;
}

export interface IBuildUrlObjectResult {
  src: string;
  srcset: string;
}
export type IBuildUrlObject = (
  url: string,
  options?: IImgixParams,
) => IBuildUrlObjectResult;

export type IBuildUrl = (url: string, options?: IImgixParams) => string;

export type IBuildSrcSet = (url: string, options?: IImgixParams) => string;

export interface IVueImgixClient {
  buildUrlObject: IBuildUrlObject;
  buildUrl: IBuildUrl;
  buildSrcSet: IBuildSrcSet;
}

export type IVueUseImgixOptions = IImgixClientOptions;
