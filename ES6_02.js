/**
 * Symbol 独一无二
 * let s1 = Symbol('my') 描述这个symbol 内部会将描述符 toString
 */

let s1 = Symbol('my');
let s2 = Symbol('my');
let obj = {
    [s1]: 1
}

console.log(s1 == s2) // false
console.log(s1, obj)

for (let key in obj) {
    console.log(obj[key])  // 对象内用Symbol 声明的属性是不可枚举的
}

console.log(typeof s1)

console.log(Object.getOwnPropertySymbols(obj)) // Symbol的Object.keys()

let s3  = Symbol.for('xxx') // 如果有这个symbol 并不重复声明
let s4 = Symbol.for('xxx')
console.log(Symbol.keyFor(s4)) // 寻找与某个symbol关联的键

// js中原始数据类型 string number boolean null undefined Symbol / object

// Symbol 具备这原编程的功能 想改变默认系统级的方法
// 当对象使用instanceof运算符 判断对象是否为该对象时候 会调用这个方法
class MyArray{
    static a = 123
    static getA(){
        return MyArray.a
    }
     static [Symbol.hasInstance](instance){
        console.log(123)
        return Array.isArray(instance)
    }
    [Symbol.hasInstance](instance){
        console.log(123)
        return Array.isArray(instance)
    }
}
var arr = new MyArray()

// [1,2,3] instanceof MyArray
console.log(arr, typeof arr)
arr[Symbol.hasInstance]([1])
// instance instanceof MyArray   MyArray[Symbol.hasInstance]()

// 实例无法访问类上面的静态属性以及静态方法

// 可以做私有属性 默认js中没有私有属性




/**
 * 1.解构赋值
 *  结构相同 可以直接通过相同的结构来获取
 * 2.对象的展开... 剩余运算符可以在函数中使用 可以在结构中使用
 *  剩余运算符只能用在最后一项 有收敛的功能 会将剩下的内容重新组装
 * 3.将类数组转化成数组 
 * Array.from  是个对象 有数字索引 有长度 就能被转化成数组
 * [...{}] 是通过迭代器实现的
 * 
 *  类数组 有数字索引 有长度length 是个对象 能被迭代
 *  
 * 
 */

const { length } = []
console.log(length); // 数组的长度

let [,age] = ['zf', 18]
console.log(age)

let [a, ...args] = [1,2,3,6]
console.log(args);
let {name,...x} = {name:'tw', age: 18}
console.log(x);


let likeArray = {
    '0': 123,
    '1': 9999,
    length: 2
}

let arr1 = Array.from(likeArray)
console.log(arr1, arr1 instanceof Array)
let likeArray2 = {
    '0': 456,
    '1': 123,
    '2': 999,
    length: 3,
    [Symbol.iterator]:function(){
        let index = 0
        let next = () => {
            // console.log(this.length === ++index)
            return  {
                value: this[index],
                done: this.length < ++index
            }
        }
        return  {
            next
        }
    }
}
let arr2 = [...likeArray2]
console.log(arr2)

let arr3 =Array.from(likeArray2)
console.log(arr3);



