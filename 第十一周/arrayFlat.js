Array.prototype.flat = Array.prototype.flat ? Array.prototype.flat: function(deep){
    let that = this;
    let result = [];
    deep = deep ? deep : 1;
    let curDeep = 0;
    function flatArr(arr){
        arr.reduce((result,cur)=>{
            if(arr === that){
                curDeep = 0;
            };
            if(Array.isArray(cur)){
                curDeep++;
                if(curDeep > deep){
                    result.push(cur);
                }else{
                    flatArr(cur);  
                };
            }else{
                result.push(cur);
            };
            return result;
        },result);
    };
    flatArr(this);
    return result;
};




let arr = [1,2,[3,4,[5,6,7,[8],9],10,11],12,13,14,[15,16,[17,18],19],20];
console.log(arr.flat(2))

