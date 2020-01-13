
{
  "presets": [
      ["@babel/preset-env",{  // @babel/preset-env es6->es5
         "useBuiltIns":"usage", // 用来转化 [1,2,3].includes(3)这种实例上的新语法，按需加载，需要安装core-js@2或者3版本的
         "corejs": 2  // 使用core-js@2（需npm i core-js@2先安装），用来替代balel-polyfill，但balel-polyfill全加载 这么配置就是按需加载了
      }]
  ],
  "plugins": [
      ["@babel/plugin-proposal-decorators",{"legacy": true }], // 用来转化类的装饰器语法，需用在下面那个插件前，legacy为true时下面的loose也必须为ture
      ["@babel/plugin-proposal-class-properties",{"loose":true}],// 用来转换class C{ name = zj;}这种还在提案阶段的类语法loose：true编译后用this.name = 'zj' 为false用Object.definePrototype
      "@babel/plugin-transform-runtime" // 节约代码插件，比如不同文件定义了多个class类 就会在打包后的代码中产生多个_classCallCheck函数，这个插件可以只生成一个公共的_classCallCheck方法,
                                        // 它会调用 @babel/runtime 所以还需要npm i @babel/runtime --save 
  ]
}


/**
 * 引入jquery的三种用法：
 * 1. 直接 import $ from 'jquery'，这样可以直接拿到$,但 window.$ 还是undefined,可以使用一个暴露到全局的expose-loader
 *    expose-loader是一个内联loader,用法一：用 import $ from 'expose-loader?$!jquery'来引入jquery
 *                                 用法二：还是用import $ from 'jquery'引入jquery，但在webpack里的配置增加expose-loader的配置，详见webpack配置
 * 2. 使用webpack自身提供的插件 new webpack.ProvidePlugin({ $:'jquery' }) 来注入jquery，这样每个页面不需要再import $ from 'jquery'了，可以直接拿到$,但 window.$ 还是undefined,
 * 3. 使用cdn配合webpack的externals来使用，先在模板html文件里script引入cdn的jquery，再在webpack的externals里配置, window.$也能拿到$
 *    每个页面还是需要 import $ from 'jquery' ，好处是项目打包时jquery不会打包进去 会继续使用cdn 
 */ 
import $ from 'jquery'
console.log($);
console.log(window.$); // 本来输出是undefined 可以使用expose-loader来暴露$出来


/**
 * 处理图片
 * 本来file-loader就可以，file-loader就是简单的复制黏贴图片
 * 所以一般用 url-loader ，里面集成了file-loader，所以用了file-loader既可以不用file-loader了
 * url-loader除了file-loader的功能外还可以把图片大小小于limit的图片转成base64减少请求数量
 * 
 * 1.处理js里require进来的图片  url-loader
 * 2.处理css里背景引入的图片 url-loader
 * 3.处理html里面img标签引进的图片 html-withimg-loader
 * 4.处理字体文件这些 file-loader
 */

 /**
  * 打包时文件分类
  * 1.把css打包到dist里的css文件夹下：MiniCssExtractPlugin插件的finename前加个 css/即本来填 'style.css' 现在填 'css/style.css'
  * 2.把图片打包到dist里的img文件夹下：url-loader的options里配置 outputPath:'img/'
  * 3.打包的所有静态资源路径前加一段前置路径 如 /static: 在output里配置 publicPath:'/static/', 一般项目里用 './'比较多,默认为''，即什么都不加
  * 4.仅仅想在图片资源的路径前加一段前置路径： url-loader的options里配置 publicPath::'/common/',或者配置 name:'/img/[name].[hash:8].[ext]',
  *   这几个配置其实是来自file-loader的 所以file-loader里也能配置这些属性
  * 5.自己最终得出的最好结论：output里publicPath配置为'/'，url-loader或file-loader里options里配置 name:'img/[name].[hash:8].[ext]'，
  *   抽离的css的插件里 new MiniCssExtractPlugin({filename:'css/common.css' })
  */




/**
 * webpack4.0默认自带一些优化项，即不同手动配置自己默认会执行的一些优化项
 * 1. tree-sharking: 生产环境中 improt xx from 'xx' 引入的模块会自动执行，开发环境中不会执行，require('xx')引入的模块也不会执行（只有静态引入的会执行）
 * 2. 作用域提升： 即 let a = 1,b=2; let c = a+b;console.log(c); webpack打包时会直接打包consle.log(3);
 */

/**
 * 其他优化：
 * 1.module.noParse：不解析依赖库的意思, 比如我们明确知道jquery不依赖其他任何第三方库，所以可以用：在module里配置 noParse：/jquery/, 节约打包时间
 * 2.IgnorePlugin：webpack自带的插件 用法：如引用了moment库默认打包会把所有的语言库打包进来，可以用这个不把语言包打包进来，用法：plugins里加入 
 *   new webpack.IgnorePlugin(/\.\/locale/,/moment/);  再在js里把所需要的语言包手动引入进来 import 'moment/locale/zh-cn';monent.locale('zh-cn)
 * 3.dllPlugin DllReferencePlugin配合library :动态连接库dll，只用于项目开发时,上线用不到。比如我们项目开发时都需要引React React-dom时，每次更新都需要重新重新打包这两个库。
 *   动态连接库可以先把 React React-dom这两个提前打包好放在一个文件夹下，并生成一个查阅的文档，当项目里引用React时会先查阅这个文档找到对应的引用路径直接，去引用先前打包好的包，不用重新打包。
 * 4.
 */