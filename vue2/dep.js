// 管理依赖
class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  removeSub(sub) {
    remove(this.subs, sub);
  }
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
  remove(subs, sub) {
    for (let i = 0; i < subs.length; i++) {
      if (subs[i] === sub) {
        subs.splice(i, 1);
        break;
      }
    }
  }
}
export { Dep };
