
/**
 *  dll动态连接库配置步骤
 *  1.新建一个webpack配置文件，命名随意，可命名为webpack.dll.config.js
 * 
 *  2.webpack.dll.config.js的配置中 
 *      entry:{ 
 *           react: ['react','react-dom]
 *      },
 *      output:{ 
 *        filename:'_dll_[name].js', 
 *        path:path.join(__dirname,'./dist'),library:'_dll_[name]'
 *      }
 *      注：filename不一定与library相同，可随意
 * 
 *  3.webpack.dll.config.js的plugins中加入
 *      new webpack.DllPlugin({
 *          name:'_dll_[name]', // name需要跟上面library的值一致
 *          path:path.resolve(__dirname,'dist','mainfest.json') // mainfest.json输出的目录
 *      })
 * 
 *  4.执行webpack.dll.config.js打包
 * 
 *  5.在模板的html中用script标签引入上面打包好的 _dll_react.js
 * 
 *  6.在开发项目的webpack.config.js配置文件的plugins中加入
 *    new webpack.DllReferencePlugin({
 *       manifest:path.resolve(__dirname,'dist','mainfest.json')
 *    })
 * 
 *  7.这样在开发时引用的react react-dom就会根据mainfest.json中的映射关系先找已经提前打包好的_dll_react.js中，里面没找打才会再重新打包
 *         
 */