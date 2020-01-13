
 // 对象的加乘
let obj = {a:1,b:2};

console.log(obj + 1);  // [object Object]1
console.log(obj * 1) // NaN

let obj2 = {
    a:1,
    valueOf(){
        return 88;
    }
};

console.log(obj2 + 1);  // 89
console.log(obj2 * 1) // 88

let obj3 = {
    a:1,
    toString(){
        return 33;
    }
};
console.log(obj3 + 1);  // 34
console.log(obj3 * 1) // 33


// 以下可以得出valueOf权限更高
let obj4 = {
    a:1,
    toString(){
        return 33;
    },
    valueOf(){
        return 88;
    }
};

console.log(obj4 + 1);  // 89
console.log(obj4 * 1) // 88



// 数组
// 空数组当0处理，只又一项则取第一项并转成字符串，多项则多项转字符串
// 其实就是先调用 arr.toString()把数组转成字符串再进行运算

console.log([] == false) // true


let arr1 = [];
console.log(arr1 + 1);  // 1
console.log(arr1 * 1);  // 0

let arr2 = [66];

console.log(arr2 + 1); // 661
console.log(arr2 * 1); // 66

let arr3 = ['66'];
console.log(arr3 + 1); // 661
console.log(arr3 * 1); // 66

let arr4 = [{a:1}];
console.log(arr4 + 1); // [object Object]1
console.log(arr4 * 1); // NaN

let arr5 = [66,'77'];
console.log(arr5 + 1); // 66，771
console.log(arr5 * 1);// NaN

// 重写toSring会生效
let arr6 = [66];
arr6.toString = function(){
    return 99;
}
console.log(arr6 + 1); // 100
console.log(arr6 * 1); // 99


// 重写valueOf也会生效
let arr7 = [66];
arr7.valueOf = function(){
    return 88;
}
console.log(arr7 + 1); // 89
console.log(arr7 * 1); // 88



// 同时重写valueO与toString valueOf权重更高
let arr8 = [66];
arr8.valueOf = function(){
    return 88;
}
arr8.toString = function(){
    return 99;
}
console.log(arr8 + 1);  // 89
console.log(arr8 * 1);  // 88


let a = 3;
let b = 8;
console.log(a+++b);
console.log(a);

