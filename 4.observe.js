/**
 * 观察者模式 有观察者 有被观察者 观察者需要放到被观察中
 */

// 内部也是基于发布订阅模式 收集观察者 状态变化后要通知观察者

// 被观察者
class Subject{
    constructor(){
        this.state = '开心'
        this.observers = []
    }
    attach(o){
        this.observers.push(o)
    }
    setState(state){
        this.state = state
        this.observers.forEach(observer => observer.update(this))
    }
}

// 观察者
class Observer{
    constructor(name){
        this.name = name
    }
    update(baby){
        console.log('我被通知了')
    }
}