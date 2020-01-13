const fs = require('fs');
const path = require('path');
const vm = require('vm');

let wrap = [`(function(exports,module,require){`,`})`]
class Module{
    constructor(id){
        this.id = id;
        this.exports = {};
    }
    load(){
        let content = fs.readFileSync(this.id,'utf-8');
        let fnStr = wrap[0] + content + wrap[1];
        let fn = vm.runInThisContext(fnStr);
        fn(this.exports,this,req);
    }
}


function req(file){
    let id = path.resolve(__dirname,file);
    let module = new Module(id);
    module.load();
    return module.exports;
}

console.log(req('./a.js'));