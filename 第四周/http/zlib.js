const zlib = require('zlib');
const fs = require('fs');
let file = fs.readFileSync('./1.txt');
zlib.gzip(file,(err,data)=>{
    fs.writeFileSync('./2.txt.gz',data);
});
