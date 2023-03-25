/**
 * if() true/false  false undefined null '' 0 NaN
 * ! 将值转化成Boolean类型
 * 运算 + - * /  转化数字 1 / 'a' NaN
 * + 字符串拼接  如果一方是字符串就会变成字符串相加
 * 1.数字和非字符串相加
 *   1 + true  会被转化成1 2
 *   1+nulll 会被换化成0 1
 *   1+undefined NaN
 *   1+{} 将对象转为字符串 1[object Object]
 * 2.非数字相加
 *  true + true 转化为数字 2
 *  true + {}  true[object Object]
 *  对象中两个方法 挨个尝试 valueOf 原始数据类型 否则就尝试toString()
 *  let obj = {
 *      [Symbol.toPrimitive](){
 *      }
 *      valueOf(){
 *          return  100
 *      }
 *          toString(){
 *      return 200
 *      }
 *  }
 *  true + obj = 101
 * 
 * // + -这个符号 字符串转数字
 * typeof +'a'  number
 * 1+ +'123' => 124      
 * 
 * 比较运算 > = <
 * 'a' < 'b' 转化成ASCII 'a'.charCodeAt(0) 'b'.charCodeAt(0) 
 * 
 * 'a' < 'bbb' 字符串的第一位
 * 
 *  1 < '123' 字符串转可以数字 
 *  1 < 'aaa' 如果不能转化数字都会返回false 
 * ==
 * null == undefined true
 * 
 * null == 0  false 
 * null和undefined与其他类型比较都返回false
 * 
 * 
 * 
 *  {} == {} false  命名空间
 * NaN == NaN false 和任何类型都不相等
 * 
 * '1' == 1  true 字符串和数字比较 将字符串转化成数字
 * 1 == true true 如果是布尔类型 将布尔类型转化成数字
 * 对象和字符串 数字 Symbol 比较 会把对象转化成原始数据类型 调用valueOf toString
 * 
 * {} == '[object Object]' true
 * [] ==  ![]  单目运算 优先级最高  ![] 为 false  
 * [] == false
 * [] == 0 // [].valueOf
 * [] == 0 // [].toString()
 * '' == 0 Number('')
 * 0 == 0 true
 */

console.log('a' < '手机', '手'.charCodeAt(0))