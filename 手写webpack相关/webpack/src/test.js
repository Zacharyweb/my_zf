const path = require('path');
console.log(path.resolve());
console.log('-------------  __dirname  --------------------')
console.log(__dirname);
console.log(path.resolve(__dirname));
console.log('-------------  process.cwd() --------------------')
console.log(process.cwd());
console.log(path.resolve(process.cwd()));
