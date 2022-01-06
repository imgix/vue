/**
 * This test had to split out of the main test suite because there is a bug in
 * the test runner that causes the test to fail if it is run after the main
 * test suite.
 *
 * See https://github.com/vuejs/vue-jest/issues/389#issuecomment-960248054.
 *
 * For similar issues you can also see:
 * https://github.com/vuejs/vue-test-utils-next/issues/1043,
 * https://github.com/vuejs/vue-test-utils-next/pull/1202, or
 * https://github.com/vuejs/vue-test-utils-next/issues/1046
 */

import IxPictureSimple from '@/components/simple/ix-picture.vue';
import VueImgix from '@/plugins/vue-imgix/index';
import { config, mount } from '@vue/test-utils';

config.global.plugins = [[VueImgix, { domain: 'assets.imgix.net' }]];

describe('Picture Mode', () => {
  describe('ix-picture', () => {
    it.only('the developer can pass an ix-img component as a fallback src', () => {
      const wrapper = mount(IxPictureSimple, {
        shallow: false,
      });
      const fallbackImgEl = wrapper.get('img');
      const fallBackSrc = fallbackImgEl.element.getAttribute('src');
      const fallBackSrcSet = fallbackImgEl.element.getAttribute('srcset');
      expect(fallBackSrc).toBeDefined();
      expect(fallBackSrc).toMatch(/ixlib=vue/);
      expect(fallBackSrcSet).toBeDefined();
      expect(fallBackSrcSet).toMatch(/ixlib/);
    });
  });
});
