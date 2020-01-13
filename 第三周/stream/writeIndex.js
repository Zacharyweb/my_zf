let fs = require('fs');
let path = require('path');
let writePath = path.resolve(__dirname,'write.md');

let ws = fs.createWriteStream(writePath,{
    highWaterMark:5
});

// let WriteStream = require('./writeStream.js');
// let ws = new WriteStream(writePath,{
//     highWaterMark:4
// });
let i = 0;
function write(){
    let flag = true;
    while(i < 8 && flag){
        flag = ws.write(i+'');
        i++;
    }
    if(i == 8){
        ws.end();
    }
};
ws.on('drain',()=>{
    console.log('空了');
    write();
});

ws.on('close',()=>{
    console.log('close');
});

write();


