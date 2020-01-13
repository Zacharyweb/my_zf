let recast = require('recast');
let {
    expressionStatement,
    assignmentExpression,
    memberExpression,
    identifier,
    arrowFunctionExpression,
    blockStatement
} = recast.types.builders;

recast.run((ast,printSource)=>{

    // console.log('\n\n')
    // printSource(blockStatement([]));

    // console.log('\n\n')
    // printSource(arrowFunctionExpression([],blockStatement([])));

    // console.log('\n\n')
    // printSource(arrowFunctionExpression([],blockStatement([])));

    // console.log('\n\n')
    // printSource( assignmentExpression('=',identifier('add'),arrowFunctionExpression([],blockStatement([]))) )

    // console.log('\n\n')
    // printSource( assignmentExpression('=',memberExpression(identifier('exports'),identifier('add')),arrowFunctionExpression([],blockStatement([]))) );

    // console.log('\n\n')

    // printSource( expressionStatement(assignmentExpression('=',memberExpression(identifier('exports'),identifier('add')),arrowFunctionExpression([],blockStatement([])))) );
    
    let fnIds = [];
    recast.visit(ast,{
        visitFunctionDeclaration(path){
            let node = path.node;
            let fnName = node.id;
            let params = node.params;
            let body = node.body;

            let rep = expressionStatement(assignmentExpression('=',memberExpression(identifier('exports'),fnName),arrowFunctionExpression(params,body)));

            fnIds.push(fnName.name);

            path.replace(rep);
           
            return false;
        }
    })
    

    // 转换 add() => exports.add()
    recast.visit(ast,{
        visitCallExpression(path){
            let node = path.node;
            if(fnIds.includes(node.callee.name)){
                console.log(fnIds)
                node.callee = memberExpression(identifier('exports'),node.callee);
            };
            return false;
        }
    })

    getResult(ast);
})

function getResult(ast){
    console.log(recast.print(ast).code)
}