let recast = require('recast');
const TNT = recast.types.namedTypes;
recast.run(function(ast,printSource){
    // console.log(ast)
    // printSource(ast);
    recast.visit(ast,{
        visitExpressionStatement:function(path){
            let node = path.node; // ast树
            if(TNT.ExpressionStatement.check(node)){
                console.log('这是一个ExpressionStatement')
            };

            return false; 
            // 每个遍历函数后必须加上return false，或者选择以下写法，否则报错
            // this.traverse(path);

    
        }
    })
})
