// 使用Object.defineProperty 重新定义ES5

import { arrayMethods} from './array.js'
import {isObject, def} from '../utils/index.js'
class Observe{
    constructor(value){
        def(value, '__ob__', this)
        if(Array.isArray(value)){
            // 对数组的方法进行劫持 重写
            value.__proto__ = arrayMethods
            // 如果数组里面放的是对象在监控 
            this.observeArray(value)
        }else{
            this.walk(value)
        }
      
    }
    observeArray(value){
        for(let i = 0; i < value.length; i++){
            observe(value[i])
        }
    }
    walk(data){
       let keys =  Object.keys(data)
       for(let i = 0; i < keys.length; i++){
        let key = keys[i]
        let value = data[key]
        defineReactive(data, key, value)
       }
    }
}
function defineReactive(data,key,value){
    observe(value)
    Object.defineProperty(data, key, {
        get(){
            return value
        },
        set(newValue){
            if(newValue === value) return 
            observe(newValue)
            value = newValue

        }
    })
}
export function observe(data){
   let isObj = isObject(data)
   if(!isObj){
    return
   }
   new Observe(data)
}