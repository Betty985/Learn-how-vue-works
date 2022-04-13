// 依赖
import Dep from "./dep.js";
import { parsePath } from "./utils.js";
export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.$vm = vm;
    this.$expOrFn = parsePath(expOrFn);
    this.$cb = cb;
    this.value = this.get();
  }
  get() {
    Dep.target = this;
    let value = this.$cb.call(this.$vm, this.$vm[this.$expOrFn]);
    console.log("depend", this.$vm[this.$expOrFn]);
    Dep.target = null;
    return value;
  }
  update() {
    console.log("update");
    this.$cb.call(this.$vm, this.$vm[this.$expOrFn]);
  }
}
