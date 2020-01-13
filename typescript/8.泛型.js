"use strict";
//  泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
//  泛型T作用域只限于函数内部使用
// 泛型函数
function createArray(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result.push(value);
    }
    ;
    return result;
}
createArray(10, '1');
// 用泛型后
// 泛型函数
function createArray2(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result.push(value);
    }
    ;
    return result;
}
createArray2(10, 'a');
// 泛型类
var MyArray = /** @class */ (function () {
    function MyArray() {
        this.list = [];
    }
    MyArray.prototype.add = function (value) {
        this.list.push(value);
    };
    ;
    MyArray.prototype.getItemByIndex = function (index) {
        return this.list[index];
    };
    return MyArray;
}());
var arr = new MyArray();
arr.add(1);
arr.add(2);
arr.add(3);
console.log(arr.list);
var my = function (a, b) {
    return a + b;
};
var my2 = function (a, b) {
    return a;
};
// 泛型可以同时有多个
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
;
swap([2, '1']);
// 默认泛型类型
function createArray3(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
var result2 = createArray3(3, 'xx');
console.log(result2);
function getLength(k) {
    return k.length;
}
;
getLength('sdsd');
getLength(['1', 1]);
var mimi = {
    list: [{ name: 'zh', age: 1 }]
};
var mt1 = {
    list: [1],
    age: 1
};
var mt2 = {
    list: ['1'],
    age: '1'
};
