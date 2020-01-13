

// 柯里化就是把一个函数拆成一个个小函数

// 柯里化通用函数，核心是判断各步小函数执行后总计的参数个数是否达到原函数的参数个数，
// 如果达到了就把收集的参数一次传给原函数执行
// 没达到就继续柯里化
function curring(fn,arr = []){
    let len = fn.length;
    return (...arg)=>{
        // 注：箭头函数里没有arguments，里面的arguments就是外层函数的arguments，所以用(...arg),这样得来的arg是个数组，输出如[1,2,3]这样

        arr = arr.concat([...arg]);
        if(arr.length >= len){
            return fn(...arr);
        }else{
            return curring(fn,arr)
        }

    }
}


function add(a,b,c,d,e){
    return a+b+c+d+e;
};
let result = curring(add)(1)(2)(3)(4)(5);


function checkType(type,content){
    return Object.prototype.toString.call(content) == `[object ${type}]`
}


let util = {};
let typeArr = ['Number','String'];

typeArr.forEach((type)=>{
    util['is'+ type] = curring(checkType)(type);
});

console.log(util.isNumber(123));
