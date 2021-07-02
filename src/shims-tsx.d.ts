import { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
