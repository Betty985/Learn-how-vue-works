import {
  isArray,
  isObject,
  arrayMethods,
  protoAugment,
  copyAugment,
  def,
  parsePath,
  hasOwn,
} from "./utils.js";
import Dep from "./dep.js";
// 隐式原型是否可用
const hasProto = "__proto__" in {};
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);
// 判断数据类型
class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep();
    def(value, "__ob__", this);
    if (!isObject(value)) {
      return;
    }
    // 在getter中收集依赖，在拦截器中触发依赖，存在observe实例上
    if (isArray(value)) {
      this.obserArray(value);
    } else {
    }
  }
  /**
   * 侦测数组中的每一项
   * @param {*} items
   */
  obserArray(items) {
    const augment = hasProto ? protoAugment : copyAugment;
    // 使用拦截器覆盖Array原型
    augment(items, arrayMethods, arrayKeys);
    console.log("observe array", items);
    for (let item of items) {
      observe(item);
    }
  }
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
}
// 数据劫持
function defineReactive(target, key, value) {
  if (isObject(value)) {
    new Observer(value);
  }
  let childOb = observe(value);
  let dep = new Dep();
  Object.defineProperty(target, key, {
    get() {
      console.log("get");
      dep.depend();
      // 收集数组依赖
      childOb && childOb.dep.addSub();
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
// 为value创建一个Observe实例，如果创建成功，直接返回新创建的Observer实例，如果已经存在实例直接返回。
function observe(value, asRootData) {
  if (!isObject(value)) {
    return;
  }
  let ob;

  if (hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
    // __ob__可用在拦截器中访问Observer实例，还可以标记当前的value是否已经被转换成响应式数据
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}
export default Observer;
