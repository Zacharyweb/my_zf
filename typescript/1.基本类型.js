"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tsc --init 生成tsconfig.json文件
// 声明了export default {}  ts就把当前文件当模块处理了 不然ts会把所有的ts文件当成一个模块 容易有命名冲突
exports.default = {};
var a = '1';
var b = true;
var c = 1;
var arr = ['1', '2'];
var arr2 = ['1', '2'];
var tuple = ['1', 2]; // 元组：长度跟每项类型都确定的数组
var Gender;
(function (Gender) {
    Gender[Gender["GIRL"] = 0] = "GIRL";
    Gender[Gender["BOY"] = 1] = "BOY";
})(Gender || (Gender = {}));
;
var color = [0 /* Red */, 1 /* Green */];
// 此时编译后直接就如下了 因为const声明后续不可更改了
// var color = [0 /* Red */, 1 /* Green */];
var jquery = 1;
jquery = '2';
// tsconfig.json里的strictNullChecks为true会报错，设置为false后就不会报错了
var x;
x = 1;
x = undefined;
x = null;
var y;
y = 1;
y = undefined;
y = null;
// void 表示没有任何类型
function fn() {
    console.log('1');
}
// never (null undefined)的子类型，代表不会出现的值，用于一些不会正常执行的函数
function error(message) {
    throw new Error(message);
}
// 由类型推论得到返回值为 never
function fail() {
    return error("Something failed");
}
// 返回never的函数 必须存在 无法达到（ unreachable ） 的终点
function infiniteLoop() {
    while (true) { }
}
;
var v = null;
var und = undefined;
// let nene:never = null; // 报错
// 断言
var dy;
dy.toLocaleLowerCase();
dy.toFixed(2);
var lu = 1;
