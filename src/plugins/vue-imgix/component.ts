import Vue, { CreateElement } from 'vue';
import Component from 'vue-class-component';

@Component
export class Imgix extends Vue {
  render(createElement: CreateElement) {
    return createElement('img');
  }
}
