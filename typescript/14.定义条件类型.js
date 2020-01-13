"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {};
var fish = { water: '水' };
// 2.条件类型的分发
var condition1 = { water: '水' };
var condition2 = { sky: '天空' };
var e1 = '1'; // e1就只能是字符串类型了
var e2 = 1; // e2就只能是数字类型了
var e3 = '1';
// 3.4 ReturnType 获取函数类型的返回类型
function getUserMsg() {
    return { name: 'zj', age: 27 };
}
var e4 = { name: 'pbb', age: 1 };
// 3.5 InstanceType 获取构造函数的实例类型
var Person = /** @class */ (function () {
    function Person() {
    }
    ;
    Person.prototype.getName = function () {
        return this.name;
    };
    return Person;
}());
var e5 = { name: 'zj', getName: function () { return 'xixi'; } };
