// 管理依赖
class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    console.log("addSub", sub);
    this.subs.push(sub);
  }
  removeSub(sub) {
    this.remove(this.subs, sub);
  }
  remove(subs, sub) {
    for (let i = 0; i < subs.length; i++) {
      if (subs[i] === sub) {
        subs.splice(i, 1);
      }
    }
  }
  depend() {
    Dep.target && this.addSub(Dep.target);
  }
  notify(newValue) {
    console.log("notify", this.subs);
    const subs = this.subs.slice();
    // 通知更新
    for (let sub of subs) {
      sub.update(newValue);
    }
  }
}
export default Dep;
