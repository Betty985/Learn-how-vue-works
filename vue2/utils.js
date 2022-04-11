function isObject(obj) {
  return typeof obj == "object" && obj != null;
}
function isArray(obj) {
  return Array.isArray(obj);
}
export { isObject, isArray };
