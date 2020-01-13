
let a = {
    name:'zj',
    say(){
        console.log(this.name);
    },
    add(a,b,c){
        console.log(a + b + c);
    }
}

let b = {
    name:'wmj'
}


Function.prototype.call2 = function(){
    let from = this;
    let to =  arguments[0];
    let params = [...arguments].slice(1);
    to.a =  from;
    to.a(...params);
    delete to.a;
}
a.say.call2(b);



Function.prototype.apply2 = function(){
    let from = this;
    let to =  arguments[0];
    let params = arguments[1];
    to.a =  from;
    to.a(...params);
    delete to.a;
};
a.add.apply2(b,[3,4,5]);



Function.prototype.bind2 = function(){
    let from = this;
    let to = arguments[0];
    let params1 = [...arguments].slice(1);
    return function(){
        let  params2 = [...arguments];
        let params = [...params1,...params2];
        from.apply(to,params);
    }
}

a.add.bind2(b,3)(4,5);