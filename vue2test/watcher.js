// 依赖
import Dep from "./dep.js";
export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.$vm = vm;
    this.$expOrFn = expOrFn;
    this.$cb = cb;
    this.depend();
    this.update();
  }
  depend() {
    Dep.target = this;
    this.$vm[this.$expOrFn];
    console.log("depend", this.$vm[this.$expOrFn]);
    Dep.target = null;
  }
  update() {
    console.log("update");
    this.$cb.call(this.$vm, this.$vm[this.$expOrFn]);
  }
}
