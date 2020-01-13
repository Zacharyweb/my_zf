const webpackMerge = require('webpack-merge');
const webpackDevConfig = require('./webpack.dev');
const webpackProdConfig = require('./webpack.prod');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 每次打包时先清空原来打包的内容的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 其MiniCssExtractPlugin.loader可替代'style-loader'
const webpack = require('webpack');
const path = require('path');

module.exports = (env)=>{
    let config = {
        // 单入口
        // entry:'./src/index.js',
        // output:{
        //     filename:'bundle.js',
        //     path:path.resolve(__dirname,'dist'),
        //     publicPath: env === 'production'?'/':'/'
        // },

        // 多入口
        entry:{
            index:'./src/index.js', // 每个入口配一条，下面需要配置多个new HtmlWebpackPlugin()
            other:'./src/other.js',
        },
        output:{
            filename:'js/[name].[hash:8].js', // 多入口时文件名不能写死，需要[name]这样可变的命名
            path:path.resolve(__dirname,'dist'),
            publicPath: env === 'production'?'/':'/'
        },
        // externals:{
        //     jquery:'$' // 引用cnd资源时用
        // },

        resolve:{
           alias:{
               '@':'./src', // 路径别称，这样项目里 import xx form '@/xxx.js' 相当于直接找src下面的xxx.js文件
           },
           extensions:['js','.vue','.json'], // 如果项目里引用文件不带后缀名，按这样的顺序依次添上后缀名组成完整路径后再去查找文件
        },
     
        module:{
            rules:[
                // 内联inlineLoader的用法，这里是把jquery暴露到window上
                // {
                //     test: require.resolve('jquery'),
                //     loader:'expose-loader?$'
                // },
                {
                    test:/\.css$/,
                    loader:[ MiniCssExtractPlugin.loader, 'css-loader','postcss-loader'] // postcss-loader调用autoprefixer没有效果的话 要配置个.browerslistrc文件告诉它你需要兼容多少的浏览器
                },
                {
                    test:/\.less$/,
                    loader:[ MiniCssExtractPlugin.loader,'css-loader','postcss-loader','less-loader']
                },
                {
                    test:/\.js$/,
                    loader:['babel-loader']
                },
                {
                    test:/\.(ttf|eot|otf|woff|svg)$/,
                    loader:['file-loader']
                },
                {
                    test:/\.(png|jpg|jepg|gif)$/,
                    loader:[{
                        loader:'url-loader',
                        options:{
                            limit:2*1024,
                            name:'img/[name].[hash:8].[ext]'
                            // outputPath:'img/',
                            // publicPath:'../'
                        }
                    }]
                },
                {
                    test:/\.html$/,
                    loader:['html-withimg-loader']
                }
            ]
        },

        plugins:[
            new CleanWebpackPlugin({
                path:[path.resolve(__dirname,'dist')]
            }),
            // 单入口
            // new HtmlWebpackPlugin({
            //     template:path.resolve(__dirname,'public','template.html'),
            //     filename:'index.html'
            // }),

            // 多入口 注意每个的filename要不一样
            new HtmlWebpackPlugin({
                template:path.resolve(__dirname,'public','template.html'),
                filename:'index.html',
                chunks:['index']  // 引用打包后的index模块
            }),

            new HtmlWebpackPlugin({
                template:path.resolve(__dirname,'public','template.html'),
                filename:'other.html',
                chunks:['other'] // 引用打包后的other模块
            }),

            new HtmlWebpackPlugin({
                template:path.resolve(__dirname,'public','template.html'),
                filename:'total.html',
                chunksSortMode:'manual', // 加载多个模块的话，打包后的html里引用顺序是随机的，这里指定引用顺序为手动才会使引用顺序与数组里的顺序一致
                chunks:['other','index'] // 也可以两个都引用
            }),

            new MiniCssExtractPlugin({
                filename:'css/common.css',
            }),

            // 全局注入$作为jquery
            // new webpack.ProvidePlugin({
            //     $:'jquery'
            // })
        ],
       
        optimization:{
            // 抽离公共代码
            splitChunks:{ //分割代码块
                cacheGroups:{ // 缓存组
                    common:{
                        chunks:'initial', // 只打包同步的意思 有"initial" | "async" | "all"可选 ，异步值 import(..) 这样引入的模块
                        minSize:0, // 文件大于多少抽离
                        minChunks:2, // 文件被引用几次或以上才抽离
                    },
                    vendor:{
                        priority:1, //权重值，权重要比上面的common高，不然就先走的common打包，第三方库就打包进common里去了
                        test:/node_modules/, // 抽离第三方的库
                        chunks:'initial', // 只打包同步的意思 有"initial" | "async" | "all"可选
                        minSize:0, // 文件大于多少抽离
                        minChunks:2, // 文件被引用几次或以上才抽离
                    }
                }
            }
        }
    };
    if(env === 'production'){
       return webpackMerge(config,webpackProdConfig);
    }else{
       return webpackMerge(config,webpackDevConfig);
    }
};