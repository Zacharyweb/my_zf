let recast = require('recast');

let code = `
  function add(a,b){
      return a + b
  }
`
let result = recast.parse(code);
const add = result.program.body[0]


const {variableDeclaration, variableDeclarator, functionExpression} = recast.types.builders;

result.program.body[0] = variableDeclaration('let',[
    variableDeclarator(add.id,functionExpression(
        null,
        add.params,
        add.body
    ))
])

let output = recast.print(result).code;
console.log(output)
