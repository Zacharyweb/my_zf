let obj = {
    name:'zj',
    age:26,
    msg:{
        city:'hz'
    }
};
let handler = {
    get(target,key){
         console.log('get');
         console.log(key);
        // 如果是对象 就返回这个对象的代理
         if(typeof target[key] == 'object'){
             return new Proxy(target[key],handler);  
         };
         console.log(Reflect.get(target,key));
         console.log('------------------------------')
         return Reflect.get(target,key); // 等于 return target[key];
    },
    set(target,key,value){
        if(key === length) return true;
        console.log('set');
        
        return Reflect.set(target,key,value);// 等于return target[key] =value;
    }
};

let proxy = new Proxy(obj,handler);

console.log(proxy.msg);
console.log(proxy.msg.city[Symbol.iterator]);
