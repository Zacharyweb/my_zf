let a = {
    name:'zk'
}
module.exports = a;


let arr = [1,2,[3,[4]],5,[6,7,8,[9,10,11,12],13,14],15,16];
Array.prototype.flat = function(){
     console.log(this);
};
arr.flat()
