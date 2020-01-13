const fs = require('fs');
const path = require('path');
const copyPath = path.resolve(__dirname,'./copy.js')

let rs = fs.createReadStream(copyPath,{highWaterMark:6,encoding:'utf8'});

let arr =[];
rs.on('data',(data)=>{
 
    arr.push(data);

})
rs.on('end',()=>{

    console.log(arr);

    // let buff = Buffer.concat(arr);

    // console.log(buff.toString('utf-8'));
})
