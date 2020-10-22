// https://mp.weixin.qq.com/s?__biz=MzU5NDM5MDg1Mw==&mid=2247489062&idx=1&sn=a65cd8f53f6456e6605029e5f17d9321&chksm=fe00ac0cc977251acd0b812a8ae75778fba0ffa76f4ce4f0ccd2e1238cb69f2ded41febef565&scene=126&sessionid=1603247686&key=106fc03887f5fbd756357de78b019567bb3b2773b01c0cda1d6a9c9ed1d18a34f10c2754a934a59bc9ddeb7c205eb3a525fda350e3a184b8183e175f16201e55565518b2cb74de721811ca23268831b1afdeac17f20ecb6e102eb790f492db3f2157184d7f07f9abb001588b458365f2a901627cf29141cb9d34e90768340029&ascene=1&uin=OTEyMzMxMjYx&devicetype=Windows+10+x64&version=6300002f&lang=zh_CN&exportkey=AfdKz0Pz6gnT0GpdfYrTcYA%3D&pass_ticket=gQbWQtxWErbj1zG%2FkfDtoo%2BDrEeCRL6kxTCHhVzQBVgNAI7cMziUbLpxF3%2F7zBdn&wx_header=0

//自定义Promise函数模块：IIFE
(function (window) {
  /**
   *
   * @param {Function} executor 执行器函数
   */
  function Promise(executor) {
    const self = this;
    this.status = "pending"; // 给promise对象指定status属性，初始值为pending   resolved rejected
    this.data = undefined; // 给promise对象指定一个存储结果的data
    this.callbacks = []; // 每个元素的结构：{resolved(){}resolved(){}}

    function resolve(v) {
      // 如果当前状态不是pending，则不执行
      if (self.status !== "pending") {
        return;
      }
      self.status = "resolved";
      self.data = v;
      if (self.callbacks.length) {
        self.callbacks.forEach((cb) => {
          cb.resolved();
        });
      }
    }
    function reject(v) {
      // 如果当前状态不是pending，则不执行
      if (self.status !== "pending") {
        return;
      }

      self.status = "rejected";
      self.data = v;
      if (self.callbacks.length) {
        self.callbacks.forEach((cb) => {
          cb.rejected();
        });
      }
    }

    try {
      // 立即同步执行executor
      executor(resolve, reject);
    } catch (e) {
      // 如果执行器抛出异常，promise对象变为rejected状态
      reject(e);
    }
  }

  /**
   *
   * @param {Function} resolved 成功回调
   * @param {Function} rejected 失败回调
   * @returns {Object} promise对象
   */
  Promise.prototype.then = function (resolved, rejected) {
    resolved = typeof resolved === "function" ? resolved : (v) => v;
    rejected =
      typeof rejected === "function"
        ? rejected
        : (err) => {
            throw err;
          };

    return new Promise((resolve, reject) => {
      const handle = (callback) => {
        try {
          const result = callback(this.data);
          if (result instanceof Promise) {
            // 2. 如果回调函数返回的是promise，return的promise的结果就是这个promise的结果
            result.then(
              (value) => {
                resolve(value);
              },
              (err) => {
                reject(err);
              }
            );
          } else {
            // 1. 如果回调函数返回的不是promise，return的promise的状态是resolved，value就是返回的值。
            resolve(result);
          }
        } catch (e) {
          //  3.如果执行onResolved的时候抛出错误，则返回的promise的状态为rejected
          reject(e);
        }
      };

      if (this.status === "pending") {
        this.callbacks.push({
          resolved() {
            handle(resolved);
          },
          rejected() {
            handle(rejected);
          },
        });
      } else if (this.status === "resolved") {
        setTimeout(() => {
          handle(resolved);
        });
      } else {
        setTimeout(() => {
          handle(rejected);
        });
      }
    });
  };

  /**
   *
   * @param {Function} rejected 失败回调
   * @returns {Object} promise对象
   */
  Promise.prototype.catch = function (rejected) {
    this.then(undefined, rejected);
  };

  /**
   *
   * @param {*} value
   * @returns {Object} 指定结果的promise对象
   */
  Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(
          (value) => {
            resolve(value);
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        resolve(value);
      }
    });
  };

  /**
   *
   * @param {*} err
   * @returns {Object} 指定失败状态的promise对象
   */
  Promise.reject = function (err) {
    return new Promise((resolve, reject) => {
      reject(err);
    });
  };

  /**
   *
   * @param {Array} promises
   * @returns {Object} promise对象
   */
  Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
      const values = new Array(promises.length);
      let resolvedCount = 0;
      promises.forEach((promise, index) => {
        Promise.resolve(promise).then(
          (value) => {
            values[index] = value;
            resolvedCount++;
            if (resolvedCount === promises.length) resolve(values);
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  };

  /**
   *
   * @param {*} promises
   * @returns {Object} promise对象 状态由第一个完成的promise决定
   */
  Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((promise) => {
        Promise.resolve(promise).then(
          (value) => {
            resolve(value);
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  };
  // 向外暴露Promise
  window.myPromise = Promise;
})(window);
