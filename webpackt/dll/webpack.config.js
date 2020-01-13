let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'./dist'),
    },
    devServer:{
       contentBase:'./dist'
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
        new htmlWebpackPlugin({
            template:'./index.html',
            filename:'index.html',
        }),
        new webpack.DllReferencePlugin({
            manifest:path.resolve(__dirname,'dist','mainfest.json')
        })
    ]
}