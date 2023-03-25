/**
 * 高阶函数 
 * 1.函数作为参数
 * 2.函数作为返回值
 */

/**
 * 1.函数柯里化
 */

const isArray = (type) => {
    return function(value){
        return Object.prototype.toString.call(value) === `[object ${type}]`
    }
}

// 通过一个柯里化函数 实现通用的柯里化方法

const currying = (fn, arr=[]) => {
    let len = fn.length
    return function (...args){
        arr = [...arr,...args]
        if(arr.length < len){
            return currying(fn, arr)
        }else{
           return fn(...arr)
        }
    }
}

