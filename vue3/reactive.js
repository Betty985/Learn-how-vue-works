import { isObject } from "./utils.js";
// effectstatck
let stack = [];
// dep key

// weakmap{ map 【desmap obj】{set【deps key】:[dep,dep,dep]}
let weakmap = new WeakMap();

const config = {
  get(obj, key) {
    let val = Reflect.get(obj, key);
    //收集
    track(obj, key);
    return isObject(val) ? reactive(val) : val;
  },
  set(obj, key, val) {
    Reflect.set(obj, key, val);
    //触发
    trigger(obj, key, val);
  },
};

// effect是订阅者，响应式数据是发布者
// 数据劫持：proxy
export const reactive = function (data) {
  return new Proxy(data, config);
};
// 数据改变触发effect
export const effect = function (fn, option) {
  let ef = createEffect(fn, option);
  ef();
  return ef;
};

// track收集依赖到dep中
function track(obj, key) {
  let effect = stack[stack.length - 1];
  if (effect) {
    let depsMap = weakmap.get(obj);
    if (!depsMap) {
      depsMap = new Map();
      weakmap.set(obj, depsMap);
    }
    let deps = depsMap.get(key);
    if (!deps) {
      deps = new Set();
      depsMap.set(key, deps);
    }
    if (!deps.has(effect)) {
      deps.add(effect);
      //
    }
  }
}

// trigger触发依赖
function trigger(obj, key, val) {
  let depsMap = weakmap.get(obj);
  let effects = new Set();
  if (key) {
    let deps = depsMap.get(key);
    Array.from(deps).forEach((effect) => {
      effects.add(effect);
    });
  }
  effects.forEach((fn) => fn());
}

function createEffect(fn, option = {}) {
  let effect = function (...args) {
    return run(effect, fn, args);
  };
  return effect;
}

function run(effect, fn, args) {
  try {
    stack.push(effect);
    return fn.apply(null, args);
  } finally {
    stack.pop();
  }
}

// 懒加载的effect
export const computed = function computed() {};
// effect：数据和需要用到数据的地方
// 执行effect传递的函数参数，触发数据劫持
// 将effect收集进去

// # vue3
// - 完整流程
// # 各个函数作用
//  - effectstack
//   - 作用xx
//   - []
//  - deps
//   - 作用xxx
//   - weakmap depsmap[obj->map] deps [key ->set] -> dep [effect]
//  - reactive
//     - Proxy
//  - track
//  - trigger

//  # vue2
//  - ？
