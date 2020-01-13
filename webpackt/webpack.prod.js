
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const TerserJSPlugin = require('terser-webpack-plugin');// 压缩js
const path = require('path');
module.exports = {
    mode:'production',
    plugins:[
       
    ],
    optimization:{
        minimizer:[new TerserJSPlugin(), new optimizeCssAssetsPlugin()]
    },
}