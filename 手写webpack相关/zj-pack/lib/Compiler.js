const path = require('path');
const fs = require('fs');

const babylon = require('babylon'); // 从源码提取ast
const traverse = require('@babel/traverse').default;  // 遍历ast
const types = require('@babel/types');  // 生成新的ast节点类型
const generator = require('@babel/generator').default; // 重新生成ast

class Compiler{
    constructor(config){
        this.config = config;
        this.entryId;
        this.entry = config.entry;
        this.output = path.join(config.output.path,config.output.filename);
        this.root = process.cwd();
        this.modules = {};
    };
    getSource(filePath){
       let content =  fs.readFileSync(filePath,'utf-8');
       return content;
    };
    parse(source,dirname){
        let ast = babylon.parse(source);
        let dependencies = [];
        traverse(ast,{
           CallExpression(p){
               let node = p.node;
               if(node.callee.name === 'require'){
                   node.callee.name = '__webpack_require__';
                   let moduleName = node.arguments[0].value;
                   moduleName = moduleName + (path.extname(moduleName)?'':'.js');
                   moduleName = './'+ path.join(dirname,moduleName);
                   dependencies.push(moduleName);
                   node.arguments = [types.stringLiteral(moduleName)];
               }
           }
        });

        let sourceCode = generator(ast).code;
    
        return {
            sourceCode,
            dependencies
        }
    }

    buildModules(modulePath,isEntry){
        let source = this.getSource(modulePath);
        let moduleName = './' + path.relative(this.root,modulePath);  // './' + 'src\app.js' 
        if(this.isEntry){
            this.modulePath = moduleName;
        };
        
        let {sourceCode,dependencies} = this.parse(source,path.dirname(moduleName))  // (source,'./src')

        this.modules[moduleName] = sourceCode;
        dependencies.forEach(dep => {
            this.buildModules(path.join(this.root,dep),false)
        })
    }
    emitFile(){
        let main = this.output;
        
    }

    run(){
       this.buildModules(path.join(this.root ,this.entry),true);

        this.emitFile();
    }


}
module.exports =Compiler;
