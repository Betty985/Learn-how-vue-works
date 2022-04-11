// 需要写后缀名，否则无法解析
import { isObject, isArray } from "./utils.js";
import { Dep } from "./dep.js";
// 类型判断
// 数据劫持
function observe(data) {
  if (!isObject(data)) {
    return;
  }
  if (isArray(data)) {
    return;
  } else {
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key]);
    });
  }
}

function defineReactive(data, key, value) {
  observe(value);
  let dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      Dep.target && dep.addSub(Dep.target);
      return value;
    },
    set(newValue) {
      value = newValue;
      dep.notify(newValue);
    },
  });
}
export { observe };
