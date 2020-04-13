export interface IImgixClientOptions {
  domain: string;
}

export interface IBuildUrlObjectResult {
  src: string;
  srcset: string;
}
export type IBuildUrlObject = (
  url: string,
  options: {},
) => IBuildUrlObjectResult;

export interface IVueImgixClient {
  buildUrlObject: IBuildUrlObject;
}
