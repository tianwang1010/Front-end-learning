function fn1() {
    console.log(this)
}

/**
 * 1.改变当前this指向
 * 2.执行当前函数
 */

Function.prototype.apply = function (context, args) {
    context = context ? Object(context) : window
    context.fn = this
    if(!args) {
        return context.fn()
    }
    let r = eval('context.fn(' + args + ')')
    delete context.fn
    return r
}