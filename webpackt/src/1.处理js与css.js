require('./asset/style.css');
require('./asset/common.less');

let B = require('./b');

class A{
    constructor(){
        this.name = 'zj'
    }
}
let a = new A();
console.log(a.name) 

let b = new B();
console.log(b.age);

@log
class C{
    like = 'eat';
}
function log(target){
  console.log(target);
}

let c = new C();

[1,2,3].includes(3);
