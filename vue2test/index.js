import observe from "./observe.js";
import Watcher from "./watcher.js";
class Vue {
  constructor(obj) {
    let { el, data } = obj;
    let dom = document.querySelector(el);
    observe(data);
    Object.keys(data).forEach(
      (key) =>
        new Watcher(data, key, () => {
          dom.innerText = `${data.a}~~~~~~~~~~${data?.b?.c}`;
        })
    );
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
