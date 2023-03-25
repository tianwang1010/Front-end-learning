function fn1() {
    console.log(this)
}

/**
 * 1.改变当前this指向
 * 2.执行当前函数
 */

Function.prototype.call = function (context) {
    context = context ? Object(context) : window
    context.fn = this
    let args = []
    for (let i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']')
    }

    let r = eval('context.fn(' + args + ')')
    delete context.fn
    return r
}