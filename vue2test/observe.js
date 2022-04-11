import { isArray, isObject, arrayMethods } from "./utils.js";
import Dep from "./dep.js";
// 判断数据类型
function observe(target) {
  if (!isObject(target)) {
    return;
  }
  if (isArray(target)) {
    // 使用拦截器覆盖Array原型
    target.__proto__ = arrayMethods;
  } else {
    for (let key in target) {
      defineReactive(target, key, target[key]);
    }
  }
}
// 数据劫持
function defineReactive(target, key, value) {
  if (isObject(value)) {
    observe(value);
  }
  let dep = new Dep();
  Object.defineProperty(target, key, {
    get() {
      console.log("get", Dep.target);
      Dep.target && dep.addSub(Dep.target);
      return value;
    },
    set(newValue) {
      value = newValue;
      console.log("set");
      dep.notify(newValue);
    },
    enumerable: true,
    configurable: true,
  });
}
export default observe;
