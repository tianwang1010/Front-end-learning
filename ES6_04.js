/**
 * 1.通过构造函数实例化对象 构造函数的原型prototype与实例的__proto__一致 
 * 
 *  类是一类事物 具体的实例
 *  1.实例上的属性 即通过构造函数内部得到的
 *  2.公共属性 即原型上的属性和方法
 *  3.静态方法与静态属性 即类上的属性和方法 只能通过类来调用
 */


function Animal(){
    this.type = '哺乳类'            
}

Animal.prototype.home = { location: 123}
Animal.prototype.getLocation = function(){ return this.home }

let animal1 = new Animal()
let animal2 = new Animal()

console.log(animal1.__proto__ === animal2.__proto__)
console.log(Animal.prototype === animal1.__proto__)
console.log(Animal.prototype.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__)

// 以xx为原型创建一个对象
// Object.create()

function create(obj){
    let Fn = function(){}
    fn.prototype = obj
    return new Fn()
}

function Tiger(){
}
Tiger.prototype.__proto__ = Object.create(Animal)
Tiger.constructor = Tiger

console.log(Tiger.constructor)


// console.log(Object.__proto__ == Function.prototype)
// console.log(Function.__proto__ == Function.prototype);
// console.log(Object.__proto__ === Function.__proto__);

// // constructor
// console.log(Animal.prototype.constructor === Animal);
// console.log(animal1.constructor); // 获取的是类 无法拿到类实例的属性 可以拿到静态属性或者方法
