// 判断是否为对象
function isObject(data) {
  return typeof data == "object" && data != null;
}
// 判断是否为数组
function isArray(data) {
  return Array.isArray(data);
}
// 拦截数组原型方法
export { isArray, isObject };
