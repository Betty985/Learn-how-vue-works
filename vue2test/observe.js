import { isArray, isObject } from "./utils.js";
import Dep from "./dep.js";
// 判断数据类型
function observe(target) {
  if (!isObject(target)) {
    return;
  }
  if (isArray(target)) {
    return;
  } else {
    for (let key in target) {
      defineReactive(target, key, target[key]);
    }
  }
}
// 数据劫持
function defineReactive(target, key, value) {
  observe(value);
  let dep = new Dep();
  Object.defineProperty(target, key, {
    get() {
      Dep.target && dep.addSub(Dep.target);
      return value;
    },
    set(newValue) {
      value = newValue;
      dep.notify(newValue);
    },
    enumerable: true,
    configurable: true,
  });
}
export default observe;
