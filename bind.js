let obj = {
    name: 'jw'
}
function fn(){
    console.log(this.name)
}

Function.prototype.bind = function(context){
    let that = this
    let bindArgs = Array.prototype.slice.call(arguments, 1)
    function Fn(){}
     function fBound(){ //this
        let args = Array.prototype.slice.call(arguments)
       return  that.apply(this instanceof fBound ? this : context, bindArgs.concat(args))
    }
    Fn.prototype = this.prototype
    fBound.prototype = new Fn()
    return fBound
}

fn.prototype.flag = "哺乳类"
let bindFn = fn.bind(obj, 'xx')
let instance = new bindFn(9)
// 如果绑定的函数被new了 当前的函数this就是当前的实例
// new出来的结果可以找到原有类的原型