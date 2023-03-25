/**
 * 多个异步请求如何同时获取结果
 */

function after(times, callback) {
    return function(){
        if(--times == 0){
            callback()
        }
    }

}

const cb = after(2,function(){
    console.log(123)
})