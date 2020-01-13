let msg = {
    name:'zj',
    age:[11,12,13]
};

let arr = [1,2,3];


let wm = new WeakMap();

let wm2 = new WeakMap();

function trigger(){
    console.log('视图更新了~');
}
function propertyReact(target){
    if(wm.get(target)){
        return target;
    }

    if(wm2.get(target)){
        return wm2.get(target)
    }


    let p = new Proxy(target,{
        set(obj,key,value){
            if(obj.hasOwnProperty(key)){
                  trigger();
            };
            return Reflect.set(obj,key,value);
        },
        get(obj,key){
            if(typeof obj[key] === 'object' && obj[key] !== null){
                return propertyReact(obj[key])
            };
            return Reflect.get(obj,key)
        }
    });
    console.log('1111111111111111111');
    wm.set(p,target);
    wm2.set(target,p);
    return p;
};

let p = propertyReact(msg);
// let p2 = propertyReact(p);
let p3 = propertyReact(msg);

p3.age.push(14);

// console.log(p);

// let a = propertyReact(arr);


// console.log(a[1]);
// console.log(a.push(55));


