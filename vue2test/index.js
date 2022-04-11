import observe from "./observe.js";
import Watcher from "./watcher.js";
class Vue {
  constructor(obj) {
    let { el, data } = obj;
    let dom = document.querySelector(el);
    observe(data);
    new Watcher(data, "a", (newValue) => {
      dom.innerHTML = `${newValue} ${data.b}`;
    });
    new Watcher(data, "b", (newValue) => {
      dom.innerHTML = `${data.a} ${newValue}`;
    });
  }
}
window.o = {
  a: 1,
  b: { c: "d" },
};

new Vue({
  el: "#app",
  data: o,
});
