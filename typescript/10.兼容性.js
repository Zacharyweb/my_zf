"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {};
function getName(a) {
    return a.name;
}
;
var p = {
    name: 'zj',
    age: 18,
    gender: 1
};
getName(p);
// 只有在传参的时候两个变量之间才会进行兼容性的比较，赋值的时候并不会比较,会直接报错
// let a:Animal = {
//     name:'zj',
//     age:18,
//     gender:1
// };
// 2.基本类型兼容性
var num;
var str = 'zj';
num = str;
// 只要有toString()方法就可以赋给字符串变量
var num2;
var str2 = 'zj';
num2 = str2;
// 3.类的兼容性
var Animal2 = /** @class */ (function () {
    function Animal2() {
    }
    return Animal2;
}());
var Bird = /** @class */ (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bird;
}(Animal2));
var a;
a = new Bird();
//并不是父类兼容子类，子类不兼容父类
var b;
console.log(a);
var sum1 = function (a, b) {
    return a + b;
};
// 这个报错
// let sum2:sumFunc = function(a:number,b:number,c:number){
//     return a+b;
// };
var sum3 = function (a) {
    return a;
};
var getPerson1;
var getPerson2;
var getPerson3;
function g1() {
    return { name: "zj", age: 28 };
}
;
function g2() {
    return { name: "zj" };
}
;
function g3() {
    return { name: "zj", age: 28, gender: 'male' };
}
;
getPerson1 = g1;
// getPerson2 = g2; // 报错
getPerson3 = g3;
var log1;
function log(a) { }
;
log1 = log;
var x;
var y;
x = y;
var xx2;
var yy2;
xx2 = yy2;
// 枚举兼容性
//数字可以赋给枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Yellow"] = 1] = "Yellow";
})(Color || (Color = {}));
;
var c = Color.Red;
c = 3;
// c= '3'; // 字符串不行 报错
//枚举值可以赋给数字
var c2 = 1;
c2 = Color.Yellow;
