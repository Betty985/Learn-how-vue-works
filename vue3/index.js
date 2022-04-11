import { reactive, computed, effect } from "./reactive.js";

window.state = reactive({
  name: "123",
  age: 0,
  cuntion:1
});

effect(() => {
  document.querySelector(
    "#app"
  ).innerHTML = `name:${state.name}:`;

});
