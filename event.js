//通过h5 dataset属性 绑定事件 data-xxx
//只绑定一次事件 最上层的

export default class popEvent {
  constructor(option) {
    /*
     * 接收四个参数：
     * 1，对象的this
     * 2，要监听的元素, 不传则为对象this
     * 3，要监听的事件,默认监听点击事件
     * 4，是否冒泡, 默认冒泡
     * */

    this.eventObj = option.obj;
    this.target = option.target || this.eventObj;
    this.eventType = option.eventType || "click";
    this.popup = option.popup || true;
    this.bindEvent();
  }
  bindEvent() {
    this.target.addEventListener(this.eventType, (e) => {
      let target = e.target;
      let dataset, parent, num, b;

      const popup = (obj) => {
        if (obj === document) {
          return false;
        }
        dataset = obj.dataset;
        num = Object.keys(dataset).length;
        parent = obj.parentNode;
        if (num < 1) {
          popup(parent);
          num = 0;
        } else {
          for (b in dataset) {
            console.log(b);
            if (this.eventObj.__proto__[b]) {
              this.eventObj.__proto__[b].call(this.eventObj, {
                obj: obj,
                ev: e,
                target: dataset[b],
                data: this.eventObj,
              });
            }
          }
          this.popup && popup(parent);
        }
      };

      popup(target);
    });
  }
}
