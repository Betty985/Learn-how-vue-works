import { observe } from "./observe.js";
import { Watcher } from "./watcher.js";
window.state = {
  a: 1,
  b: 0,
  list: [1, 2, 3],
};
observe(window.state);
let el = document.querySelector("#app");
new Watcher(state, "a", (newValue) => {
  el.innerHTML = `${newValue} ${state.b}`;
});
new Watcher(state, "b", (newValue) => {
  el.innerHTML = `${state.a} ${newValue}`;
});
export default window.state;
