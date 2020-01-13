

let oldArrayProperty =  Array.prototype;

let proto = Object.create(oldArrayProperty);

['push','unshift','splice'].forEach(method => {
  proto[method] =  function(...args){
      let inserted;
      if(method == 'push' || method == 'unshift'){
        inserted = args;
      }
      if(method == 'splice'){
        inserted = args.splice(2);
      };
      inserted.forEach(item=>{
         obeserve(item);
      });
      
      update();
      oldArrayProperty[method].call(this,...args)
  }
})


function update(){
    console.log('更新了');
}

function isObject(obj){
   return  typeof obj === "object" && obj !== null
};



function obeserve(obj){
    if(!isObject(obj)){
        return obj;
    };
    if(Array.isArray(obj)){
        Object.setPrototypeOf(obj,proto);
        obj.forEach(item=>{
            obeserve(item);
        })
    }else{
        for(let key in obj){
            reactiveData(obj,key,obj[key]);
        }  
    }
    
};

function reactiveData(obj,key,value){
    if(isObject(value)){
        obeserve(value);
    };
    Object.defineProperty(obj,key,{
        get(){
           return value;
        },
        set(val){
            if(val !== value){
                if(isObject(val)){
                    obeserve(val);
                };
                value = val;
                update()
            }
        }
    })

}


let obj = {
    name:'zj',
    msg:{
        age:25
    },
    arr:[1,2,3]

};
obeserve(obj);

// obj.name = 'pbb';
// obj.msg = {
//     age:89
// };
// obj.msg.age = 28;

obj.arr.push(4);
obj.arr.unshift(8);

obj.arr.splice(3);
obj.arr.splice(1,0,6);

