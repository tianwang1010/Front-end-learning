import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
    input: './src/index.js', // 入口
    output: {
      file: 'dist/umd/vue.js', //出口
      name: 'Vue', //指定打包后全局变量的名字
      format: 'umd', // 同意模块规范
      sourcemap: true //es6 -es5 开启源码调试 找到源代码的报错位置
    },
    plugins:[
        babel({
            exclude: "/node_modules/**",
        }),
        process.env.ENV === 'development' ? serve({
            open:true,
            openPage: '/public/index.html',
            port: 3000,
            contentBase: '',
        }) : null
    ]
}