/**
 * 发布订阅模式 主要拆分成两个部分 on emit
 * 
 * on就是把一些函数维护到一个数组中
 * emit就是让数组中的方法依次执行
 */

// 订阅和发布没有明显的关联 靠中介来事
let event = {
 arr: [],
 on(fn){
    this.arr.push(fn);
 },
 emit(){
    this.arr.forEach(fn=> fn())
 }
}

event.on(function(){

})

event.emit()