const fs = require('fs');
const path = require('path');
const vm = require('vm');

class Module{
    constructor(id){
        this.id = id;
        this.exports = {}
    }
    load(){
        let extname = path.extname(this.id);
        Module.extension[extname](this);
    }
    static resolveFileName(fileName){
        let absPath = path.resolve(__dirname,fileName);
        let flag = fs.existsSync(absPath);
        let current = absPath;
        if(!flag){
            let keys = Object.keys(Module.extension);
            for(let i = 0; i < keys.length;i++){
                current = absPath + keys[i];
                let flag = fs.existsSync(newPath);
                if(flag){
                    break;
                }else{
                    current = null;
                }
            }
        };
        if(!current){
            throw new Error('file not exist');
        }
        return current;
    }
}
Module.cache = {};
Module.wrapper = ['(function(module,exports,require){','})'];
Module.extension = {
    '.js'(module){
        let str = fs.readFileSync(module.id,'utf-8');
        let fnStr = Module.wrapper[0] + str + Module.wrapper[1];
        let fn = vm.runInThisContext(fnStr);
        fn.call(module.exports,module,module.exports,req,module.id,path.dirname(module.id))
    },
    'json'(module){
        let str = fs.readFileSync(module.id,'utf-8');
        module.exports = JSON.parse(str);
    }
};


function req(fileName){
    let current = Module.resolveFileName(fileName);
    if(Module.cache[current]){
        return Module.cache[current].exports;
    }
    let module = new Module(current);
    module.load();
    Module.cache[current] = module;
    return module.exports;
}

let a = req('a.js');
console.log(a);
// let a = require('./app');


/**
 * 为啥可以写 module.exports = xxx 或者 exports.x = xxx
 * 但不能写 exports = xxx 的简单逻辑如下
 */
let obj = {
    msg:{}
}
function c(obj,msg){
    // msg = 'aaaa'; // msg里保存obj.msg的指针,当给它重写赋值后里面保存新的值,而不是指针了
    // msg.a = 'aaaa'; 
    obj.msg = 'aaaa';
}
c(obj,obj.msg);