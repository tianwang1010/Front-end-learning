
import { compileToFunction } from "./compile/index.js";
import { initState } from "./initState"
export function initMixin(Vue){
    Vue.prototype._init = function(options){
        const vm = this
        vm.$options = options || {}

        initState(vm)


        // 如果用户传入了el属性就要渲染出来
        if(vm.$options.el){
            vm.$mount(vm.$options.el)
        }
    }
    Vue.prototype.$mount = function(el){
        const vm = this
        const options = vm.$options
        el = document.querySelector(el)
        // 默认查找render方法 没有会采用template 没有就用el中的内容
        if(!options.render){
            // 对模板进行编译
            let template = options.template
            if(!template && el){
                template = el.outerHTML            
            }
            // template转化为render方法
            const render = compileToFunction(template)
        }
    }
}