let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');
module.exports = {
    mode:'development',
    entry:'./src/app.js',
    output:{
        filename:'js/buldle.js',
        path:path.resolve(__dirname,'dist')
    },
    resolveLoader:{
        modules:['node_modules',path.resolve(__dirname,'loaders')]
    },
    module:{
        rules:[
            // {
            //     test:/\.js$/,
            //     use:'loader1',
            //     enforce:'post'
            // },
            // {
            //     test:/\.js$/,
            //     use:'loader2',
            // },
            // {
            //     test:/\.js$/,
            //     use:'loader3',
            //     enforce:'pre'
            // },
        ]
    },
    plugins:[
        // new HtmlWebpackPlugin({
        //     template:path.resolve(__dirname,'index.html'),
        //     filename:'app.html'
        // })
    ]

}