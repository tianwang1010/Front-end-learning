/**
 * Promise 低版本浏览器支持es6 需要polyfill
 * 解决问题
 * 1.多个异步请求并发 希望同步最终的结果 Promise.all
 * 2.链式异步请求的问题 希望上一个的输出是下一个的输入  链式调用
 * 3.缺陷 还是基于回调函数
 */

/**
 * 1.三个状态 成功态reslove 失败态reject 等待态 pending（不成功也不失败）
 * 2.
 * 
 */

// promise就是一个类 
// 1.promise 有三个状态： 成功态（resolve） 失败态（reject） 等待态（pending） (又不成功又不失败)
// 2.用户自己决定失败的原因和成功的原因  成功和失败也是用户定义的
// 3.promise 默认执行器时立即执行
// 4.promise的实例都拥有一个then方法 , 一个参数是成功的回调，另一个失败的回调
// 5.如果执行函数时发生了异常也会执行失败逻辑
// 6.如果promise一旦成功就不能失败 ， 反过来也是一样的 (只有等待态的时候才能去更改状态)


const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
const PENDING = 'PENDING'


const resolvePromise =  (promise2, x, resolve, reject) => {
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    let called
    if ((typeof x === 'object' && x != null) || typeof x === 'function') {
        try {
            let then = x.then
            if (typeof then === 'function') { // 只能认为是一个promise了
                  // 不要写成x.then  直接then.call就可以了 因为x.then 会再次取值
                then.call(x, y => { // 根据promise的状态决定是成功还是失败
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)  // 递归解析的过程
                }, e => {
                    if (called) return
                    called = true
                    reject(e) // 只要失败就失败
                })
            } else {
                resolve(x)
            }
        } catch (e) { // 防止失败了再次进入成功
            if (called) return
            called = true
            reject(e)
        }
    } else{
        resolve(x)
    }
}




class Promise {

    constructor(executor) {
        this.status = PENDING;
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
        let resolve = (value) => {

            if (value instanceof Promise) {
                return value.then(resolve, reject); // 递归解析resolve中的参数,直到这个值是普通值
            }

            if (this.status === PENDING) {
                this.value = value
                this.status = RESOLVED;
                this.onResolvedCallbacks.forEach(callback => callback());
            }

        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach(callback => callback())
            }
        }
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }

    }
    // 1. promise 成功和失败的回调的返回值 可以传递到外层的下一个then
    // 2. 如果返回的是普通值的话 (传递到下一次的成功中,不是错误不是promise就是普通值) ，出错的情况(一定会走到下一次的失败),可能还要promise的情况(会采用promise的状态，决定走下一次的成功还是失败 )
    // 3.错误处理 如果离自己最近的then 没有错误处理(没有写错误函数) 会向下找
    // 4. 每次执行完promise.then方法后返回的都是一个“新的promise" (promisey一旦成功或者失败就不能修改状态)
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        // x可能是Promise
                        resolvePromise(promise2, x, resolve, reject)
                    }
                    catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    }
                    catch (e) {
                        reject(e)
                    }
                }, 0)
            }

            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        }
                        catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        }
                        catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }

        })

        return promise2

    }

    catch(errCallback){
        return this.then(null, errCallback)
    }
    static resolve(data){
        return new Promise((resolve,reject)=>{
            resolve(data);
        })
    }
    static reject(reason){
        return new Promise((resolve,reject)=>{
            reject(reason);
        })
    }
}

// Promise的延迟对象
Promise.defer = Promise.deferred  = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

// const dfd = Promise.defer()
// dfd.resolve()
// dfd.reject()
// return dfd.promise


module.exports = Promise