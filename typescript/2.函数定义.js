"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {};
// 函数定义 加?表示可选参数  =后面是给参数默认赋值
function hello(name, age) {
    if (name === void 0) { name = 'zhujian'; }
    console.log('hello' + name);
}
;
hello('pbb');
// ...剩余参数
function sum() {
    var number = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        number[_i] = arguments[_i];
    }
    console.log(number); // [1,2,3]
}
;
sum(1, 2, 3);
var fn1 = function (a) {
    return 1;
};
fn1('1');
// 函数重载
// 以下定义了attr参数只能是string或者number，需要紧紧写在函数上面，其中间不能有其他语句
var obj = {};
function attr(val) {
    if (typeof val == "number") {
        obj.age = val;
    }
    else {
        obj.name = val;
    }
}
attr('zj');
attr(16);
