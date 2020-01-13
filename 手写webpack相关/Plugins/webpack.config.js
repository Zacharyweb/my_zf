const path = require('path');
const DonePlugin = require('./plugins/donePlugin')
module.exports = {
    mode:'development',
    entry:'./src/app.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new DonePlugin()
    ]
}