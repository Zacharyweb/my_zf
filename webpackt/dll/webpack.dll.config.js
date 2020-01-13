let path = require('path');
let webpack = require('webpack');
module.exports = {
    entry:{
        react:['react','react-dom']
    },
    output:{
        filename:'_dll_[name].js',
        path:path.join(__dirname,'./dist'),
        library:'_dll_[name]', // 这样打包后的文件内容就变成了 var x = (function(){打包后的内容})(),
        // libraryTarget:'umd' // 上面的library默认输出是var x = xxxx, libraryTarget为commonjs后就是 exports["x"] = xxxx,还有umd this...默认是var，dll里用需要用默认的var模式
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:[{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }]
            }
        ]
    },
    plugins:[
        new webpack.DllPlugin({
            name:'_dll_[name]', // 需要跟library里面的值一致
            path:path.resolve(__dirname,'dist','mainfest.json')
        })
    ]
}