// AST语法树 用对象来描述原生语法 虚拟dom用对象来描述DOM节点
export function compileToFunction(template){
    /**
     * 1.生成AST语法树
     * 2.标记静态节点 静态根节点
     * 3.生成render函数
     */
    return function render(){

    }
}
/**
 *  <div id="app"></div>
    let root = {
        tag: 'div',
        type: 1,
        attrs:[
            {name:'id', value:'app'}
        ],
        parent:null,
        children:{}
    }
 * 
 */
