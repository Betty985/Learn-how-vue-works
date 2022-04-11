// 判断是否为对象
function isObject(data) {
  return typeof data == "object" && data != null;
}
// 判断是否为数组
function isArray(data) {
  return Array.isArray(data);
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
export { isArray, isObject, arrayMethods };
