/**
 * 1.var let const
 *  全局作用域 函数作用域 块级作用域
 *  var是函数作用域 存在变量提升 var a = undefined; 可重复声明 会在window全局对象上添加同名属性
 *  let const 是块级作用域 不存在变量提升 不可重复声明 存在暂时性死区会报错   花括号内是块级作用域
 * 2. ... 对象数组的拆分 
 * 3.set map weakMap
 *   set 集合 去重数据 传入一个值或者数组 对象类型   new Set()
 *    set.has() set.add() set.delete() set.size() set.clear() set.forEach()
 *    set.keys() 键==值 set.values() set.entries() 键值对集合
 *   map 对象 键可以是js的任意数据类型 对象类型的键是强引用 即使键被销毁 也会存在引用 new Map()
 *   map.get() map.has() map.delete() map.entries() map.keys() map.valus() map.clear()
 *   weakMap 对象 键只能是对象 且对键的引用是弱类型 销毁 形成空映射 new WeapMap()
 *  for of不能便利对象 只能遍历实现了迭代器的数据
 *    
 * 4.深浅拷贝
 *  ...浅拷贝 Object.assign() concat() slice()
 *  JSON.parse(JSON.stringify())深拷贝 函数 undefined null会被忽略
 * 5.Object.defineProperty
 *  定义对象属性 Object.defineProperty(target, key {
 *  configurable: true  可配置
 *  enumerable: true 可枚举
 * 
 *  writable: true 可修改 
 *  value: xxx 值 属性
 *  两者不能同时出现
 *  get(){ return xxx}
 *  set(){}
 * })
 *  其他形式
 *  const obj = {
 *  value: xxx,
 *  get name(){}
 *  set name(){}
 * }
 * 6.箭头函数
 *  没有this  没有arguments 谁调用函数this就指向谁 全局环境下this指向window
 * 
 */


function deepCopy(obj, hash=new WeakMap()){
    if(obj == null) return obj
    if(obj instanceof Date) return new Date(obj)
    if(obj instanceof RegExp) return new RegExp(obj)
    if(typeof obj != 'object') return obj
    if(hash.has(obj)) return hash.get(obj)
    const cloneObj = new obj.constructor()
    hash.set(obj, cloneObj)
    for(let key in obj){
        cloneObj[key] = deepCopy(obj[key],hash)

    }
    return cloneObj
}
const obj = {a: 123}
// obj.xx = obj
console.log(deepCopy(obj))
