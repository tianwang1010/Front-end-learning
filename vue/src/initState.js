import { observe } from './observe/index.js'
export function initState(vm) {
    const opts = vm.$options
    // vue的数据来源 属性 方法 数据 计算属性 watch
    if(opts.props){
        initProps(vm)
    }
    if(opts.methods){
        initMethods(vm)
    }
    if(opts.data){
        initData(vm)
    }
    if(opts.computed){
        initComputed(vm)
    }
    if(opts.watch){
        initWatch(vm)
    }
}

function initProps(vm) {
}
function initMethods(vm) {
}
function initData(vm) {
    let data = vm.$options.data
    data = typeof data === 'function' ? data.call(vm) : data
    // 对象劫持 用户改变数据我希望可以得到通知 => 刷新页面
    // Object.defineProperty
    observe(data)
}
function initComputed(vm) {
}
function initWatch(vm) {
}