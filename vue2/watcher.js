import { Dep } from "./dep.js";
class Watcher {
  constructor(vm, expOrFn, cb) {
    this.$vm = vm;
    this.$expOrFn = expOrFn;
    this.$cb = cb;

    Dep.target = this;
    this.$vm[this.$expOrFn];
    Dep.target = null;
    this.init();
  }
  init() {
    this.update();
  }
  update() {
    this.$cb.call(this.$vm, this.$vm[this.$expOrFn]);
  }
}
export { Watcher };
