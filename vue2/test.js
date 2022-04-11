import compile from "./compile.js";

window.state = {
  a: 1,
  b: 0,
  list: ["hello", 2, "world", 3, "你好"],
};

compile("#app", state);
