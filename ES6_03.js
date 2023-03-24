/**
 * 1.数组的操作方法
 *  Array.from() Array.from()方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map
 *  Array.of() 用于将一组值，转换为数组
 *  find() findIndex() findLast() findLastIndex()
 *  fill() 使用给定值 填充一个数组 用于空数组的初始化非常方便
 *  entries() keys() values() 返回一个遍历器对象 可以用for of进行遍历 可以用next方法 进行调用 
 *  includes() 返回一个boolean 第二个参数表示起始位置
 *  flat() 用于将嵌套的数组拉平 返回一维数组 不改变原数组  默认拉平一层 传参表示拉平的层数 可以用Infinity来拉平多层嵌套
 *  flatMap() 方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()) 
 *  at() 获取元素支持负索引
 *  toReversed() toSorted() toSpliced() with(index,value)将指定位置替换成新成员  以上方法不会改变原数组
 * 
 * 
 * 2.Proxy 用于修改某些操作的默认行为 Reflect 将一些明显属于对象内部的方法 放到Reflect对象上 出现异常会返回false Reflect对象上的方法与Proxy对象上的方法一致
 *  
 * 
 * 3.模板字符串 可以跟在一个函数后面 模板解析
 * 
 * 4.Class
 * 5.ESModule
 * CommonJs规范通过require函数加载模块 只能在运行时加载 没法在编译时做静态优化 
 *  本质是加载整个对象 然后获取对象中的模块
 * ES6模块不是对象 而是通过export命令显示指定输出的代码 再通过import命令输入
 *  本质就是从模块中加载导出 其他方法不加载  这就是编译时加载或者静态加载 即ES6在编译时就完成模块加载 但是这样导致了没法引用ES6模块本身 因为它不是对象
 *  import * as circle from './circle';
 *  import().then(() => {}) 动态加载 按需加载 条件加载 动态模块路径
 *  awit import()  默认返回一个对象 可以使用解构
 * 
 * import.meta 返回模块的元信息 比如模块的路径
 * 
 * 6.Generator就是一个迭代器函数
 */

// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };

const arr = new Array(5).fill(66)
console.log(arr)

const iterator = arr.entries()
console.log(iterator.next())

console.log(arr.at(-1))

/**
 * 数组的sort方法 a-b是升序 b-a是降序
 * 
 * 如果传了 compareFunction ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：
如果 compareFunction(a, b) return 的结果小于 0 ，那么 a 会被排列到 b 之前；
如果 compareFunction(a, b) return 的结果等于 0 ， a 和 b 的相对位置不变。
如果 compareFunction(a, b) return 的结果大于 0 ， b 会被排列到 a 之前。
 */
const arr1 = [1,2,3,5,4]
arr1.sort((a, b)=> a-b)
console.log(arr1)

arr1.sort((a, b)=> b-a)
console.log(arr1)


const proxy = new Proxy({a: 123}, {
    get(target, key){
        
        return Reflect.get(target, key)
    }
})
console.log(proxy.a);

