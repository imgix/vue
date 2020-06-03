export const stringMatchingFixedSrcSet = (width: number) =>
  expect.stringMatching(new RegExp(`.*w=${width}&.*dpr=1.* 1x,`));

export const expectSrcSetToBeFixed = (
  srcset: string | null | undefined,
  width: number,
) => expect(srcset).toEqual(stringMatchingFixedSrcSet(width));

export const expectElementToHaveFixedSrcSet = (
  el: HTMLElement,
  width: number,
) => expectSrcSetToBeFixed(el.getAttribute('srcset'), width);

export const stringMatchingFixedSrc = (width: number) =>
  expect.stringMatching(new RegExp(`.*w=${width}`));

export const expectSrcToBeFixed = (
  src: string | null | undefined,
  width: number,
) => expect(src).toEqual(stringMatchingFixedSrc(width));

export const expectElementToHaveFixedSrc = (el: HTMLElement, width: number) =>
  expectSrcToBeFixed(el.getAttribute('src'), width);

export const expectElementToHaveFixedSrcAndSrcSet = (
  el: HTMLElement,
  width: number,
) => {
  expectElementToHaveFixedSrc(el, width);
  expectElementToHaveFixedSrcSet(el, width);
};

export const stringMatchingFluidSrcSet = () =>
  expect.stringMatching(new RegExp(`.*w=100.* 100w,`));

export const expectSrcSetToBeFluid = (srcset: string | null | undefined) =>
  expect(srcset).toEqual(stringMatchingFluidSrcSet());

export const expectElementToHaveFluidSrcSet = (el: HTMLElement) =>
  expectSrcSetToBeFluid(el.getAttribute('srcset'));

export const stringMatchingFluidSrc = () =>
  expect.stringMatching(new RegExp(`^(?!.*w=).*$`));

export const expectSrcToBeFluid = (src: string | null | undefined) =>
  expect(src).toEqual(stringMatchingFluidSrc());

export const expectElementToHaveFluidSrc = (el: HTMLElement) =>
  expectSrcToBeFluid(el.getAttribute('src'));

export const expectElementToHaveFluidSrcAndSrcSet = (el: HTMLElement) => {
  expectElementToHaveFluidSrc(el);
  expectElementToHaveFluidSrcSet(el);
};
