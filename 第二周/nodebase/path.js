const path = require('path');
/**
 * resolve()返回的是绝对路径
 */
console.log(path.resolve()); // 启动项目的地址 即在哪个目录下启的node命令 
                             // 因为是在 zf 项目根目录下起的 所以是 c:\Users\zhujian\Desktop\zf 
                             //cd到nodebase目录下的话就是 C:\Users\zhujian\Desktop\zf\第二周\nodebase了
console.log(path.resolve(__dirname)); // 当前启动的文件所在的文件夹  C:\Users\zhujian\Desktop\zf\第二周\nodebase
console.log(path.resolve('a.js'));  // c:\Users\zhujian\Desktop\zf\a.js
console.log(path.resolve(__dirname,'a.js')); // 以当前文件所在文件夹拼接上路径 c:\Users\zhujian\Desktop\zf\第二周\nodebase\a.js
console.log(path.resolve(__dirname,'a.js','/')); // 参数中出现 '/' 就会跳到系统根目录 c:\

console.log('------------------------------------------------')

/**
 * join返回的是相对路径 功能就是简单的路径拼接
 */
console.log(path.join()); // .
console.log(path.join(__dirname)); // c:\Users\zhujian\Desktop\zf\第二周\nodebase
console.log(path.join('a.js'));  // a.js
console.log(path.join('dir','a.js')); // dir\a.js
console.log(path.join(__dirname,'a.js')); // c:\Users\zhujian\Desktop\zf\第二周\nodebase\a.js
console.log(path.join(__dirname,'a.js','/')); // c:\Users\zhujian\Desktop\zf\第二周\nodebase\a.js\

console.log(path.extname('a.js')); // 获取后缀名
console.log(path.basename('xsad.js','js')); // 获取文件名




