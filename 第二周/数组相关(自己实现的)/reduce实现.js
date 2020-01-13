Array.prototype.reduce = function(fn,prev){
    let arr = this;
    let result = prev ? prev : arr.shift();

    arr.forEach((item,index,arr)=>{
        result = fn(result,item,index,arr)
    })
    return result;
}

let arr = [1,2,3,4,5];

let result = arr.reduce((prev,item)=>{
   return prev + item;
});

console.log(result);

