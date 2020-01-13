
Array.prototype.flat = function(depth){
    let total = depth ? depth : 1;
    let origin =  this;
    let result = [];
    function reduce(result,arr,deep){
        arr.reduce((init,item)=>{
            if(item instanceof Array){
                if(arr == origin){
                    deep = 0;
                }
                if(deep < total){
                     reduce(init,item,++deep);
                }else{
                    init.push(item);  
                }
            }else{
                init.push(item);
            }
            return init;
        },result);
    };

    reduce(result,origin,0);

    return result;
}

let arr = [1,2,3,[4,5,[6,7,[8]]],3,3,[4,5,[6,7,[8,[9]]]]];

// let arr2 = [1,2,3,4,5];
// let r = arr2.reduce((init,item)=>{
//      return init + item;
// },0)
// console.log(r);






