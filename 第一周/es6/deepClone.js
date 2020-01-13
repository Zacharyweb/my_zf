function deepClone(source,hash = new WeakMap){
    if(source == null){
        return source;
    };
    if(typeof source !== 'object'){
        return source;
    };
    if(source instanceof RegExp){
        return new RegExp(source);
    };
    if(source instanceof Date){
        return new Date(source);
    };

    let instance = new source.constructor;
    if(hash.has(source)){
        return hash.get(source);
    }
    hash.set(source,instance);

    for(let key in source){
        if(source.hasOwnProperty(key)){
            instance[key] = deepClone(source[key],hash)
        }
    };
    return instance;
};

let obj = {
    a:{name:'zj'},
    b:'haha',
};
obj.c = obj;

let obj2 = deepClone(obj);
// obj2.c.a.name = 'wmj';
console.log(obj2);