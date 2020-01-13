let HtmlWebpackPlugin = require('html-webpack-plugin');
// let path = require('path');
// module.exports = {
//     mode:'development',
//     entry:'./src/app.js',
//     output:{
//         filename:'js/buldle.js',
//         path:path.resolve(__dirname,'dist')
//     },
//     resolveLoader:{
//         modules:['node_modules',path.resolve(__dirname,'loaders')]
//     },
//     module:{
//         rules:[
//             {
//                 test:/\.js$/,
//                 use:'loader1',
//                 enforce:'post'
//             },
//             {
//                 test:/\.js$/,
//                 use:'loader2',
//             },
//             {
//                 test:/\.js$/,
//                 use:'loader3',
//                 enforce:'pre'
//             },
//         ]
//     },
//     plugins:[
//         // new HtmlWebpackPlugin({
//         //     template:path.resolve(__dirname,'index.html'),
//         //     filename:'app.html'
//         // })
//     ]

// }


const path = require('path');
module.exports = {
    mode:'development',
    entry:'./src/app.js',
    output:{
        filename:'bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    resolveLoader:{
        modules:['node_modules',path.resolve(__dirname,'loaders')]
    },
    devtool:'source-map',
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:[
                    {
                        loader:'loader1',
                        options:{
                            presets:[
                                '@babel/preset-env'
                            ]
                        }
                    },'loader2','loader3']
            },
            {
                test:/\.css$/,
                loader:['style-loader','css-loader']
            },
            {
                test:/\.less$/,
                loader:['style-loader','css-loader','less-loader']
            },
            {
                test:/\.(png|jpg|jpeg|gif)$/,
                loader:[{
                    loader:'url-loader',
                    options:{
                        name:'img/[name].[hash:8].[ext]',
                        limit:2*1024
                    }
                }]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
           template:'./index.html',
           filename:'index.html'
        
        })
    ]
}