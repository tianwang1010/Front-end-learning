
function mockNew(fn, ...args){
    const obj = Object.create(fn)
    const res = fn.apply(obj, args)
    return res instanceof Object ? res : obj
}

function mockNew2(){
    let constructor = [].shift.call(arguments)
    let obj = {}
    obj.__proto__ = constructor.prototype
    let r = constructor.call(arguments)
    return r instanceof Object ? r : obj
}