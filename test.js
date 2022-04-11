// proxy的配置
let config = {
  get(obj, key) {
    let val = Reflect.get(obj, key);
    track(obj, key);
    return isObject(val) ? reactive(val) : val;
  },
  set(obj, key, val) {
    Reflect.set(obj, key, val);
    trigger(obj, key, val);
  },
};
// 响应式数据
let data = reactive({
  test: "test reactive",
  date: 2022,
});
// 数据劫持
function reactive(obj) {
  return new Proxy(obj, config);
}
// 依赖存储
let weakmap = new WeakMap();
// 当前的依赖
let stack = [];
// fn是把数据放到依赖数据的地方
function effect(fn) {
  let effectFn = createEffect(fn);
  effectFn();
}
// 初始化effect
function createEffect(fn) {
  function effect(...args) {
    return run(effect, fn, args);
  }
  // 返回出去可以控制什么时候执行
  return effect;
}
// 管理当前的effect
function run(effect, fn, args) {
  // 当前依赖不为空，读取数据的时候就会被收集进去
  stack.unshift(effect);
  let res = fn.apply(null, args);
  stack.pop();
  return res;
}
// 收集依赖
function track(obj, key) {
  // 取出栈顶依赖
  let effect = stack[0];
  // 没有对象就把对象加进去
  // 没有key就把key加进去
  // 没有effect就把effect加进去
  if (effect) {
    let depsMap = weakmap.get(obj);
    if (!depsMap) {
      depsMap = new Map();
      weakmap.set(obj, depsMap);
    }
    let deps = depsMap.get(key);
    if (!deps) {
      // 可以去重
      deps = new Set();
      depsMap.set(key, deps);
    }
    if (!deps.has(effect)) {
      deps.add(effect);
    }
  }
}
// 触发依赖
function trigger(obj, key, val) {
  //  对象的键和依赖它的地方的映射
  let depsMap = weakmap.get(obj);
  // 去重
  let effects = new Set();
  if (key) {
    let deps = depsMap.get(key);
    deps.forEach((effect) => {
      effects.add(effect);
    });
    effects.forEach((fn) => fn());
  }
}
// 判断是否为对象
function isObject(a) {
  return typeof a == "object" && a != null;
}
export { data, effect };
