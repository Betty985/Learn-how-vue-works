// 判断是否为对象
function isObject(data) {
  return typeof data == "object" && data != null;
}
// 判断是否为数组
function isArray(data) {
  return Array.isArray(data);
}
// 解析简单路径
// 正则匹配以字母开始以"."结尾的内容
const bailRE = /[^\w.$]/;
function parsePath(path) {
  // 路径中含有中括号就返回
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split(".");
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}
// 拦截数组原型方法
//  通过数组原型上的方法改变不触发getter，setter。不能进行变化侦测
const arrayProto = Array.prototype;
// 拦截器
const arrayMethods = Object.create(arrayProto);
["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(
  (method) => {
    // 缓存原始方法
    const original = arrayProto[method];
    Object.defineProperty(arrayMethods, method, {
      value: function mutator(...args) {
        // 访问Observer实例
        const ob = this.__ob__;
        // 判断数组方法类型
        let inserted;
        switch (method) {
          case "push":
            break;

          case "unshift":
            inserted = args;
            break;
          case "splice":
            inserted = args.slice(2);
            break;
        }
        // 侦测新增元素
        if (inserted) ob.observeArray(inserted);
        // 向依赖发送消息
        ob.dep.notify();
        return original.apply(this, args);
      },
      enumerable: false,
      writable: true,
      configurable: true,
    });
  }
);
function protoAugment(target, src, keys) {
  target.__proto__ = src;
}
// 直接将arrayMethod的方法设置到被侦测数组上
function copyAugment(target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    def(target, key, src[key]);
  }
}
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    // 转为布尔值
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  });
}
// 对象上是否有该属性
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
export {
  isArray,
  isObject,
  arrayMethods,
  protoAugment,
  copyAugment,
  def,
  parsePath,
  hasOwn,
};
