"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {};
;
function attrDec(target, prototypeKey) {
    console.log(target); // 原型对象 Animal {}
    console.log(prototypeKey);
}
;
function staticDec(target, prototypeKey) {
    console.log(target); // 构造函数 [Function: Animal]
    console.log(prototypeKey);
}
;
function methodDec(target, prototypeKey, descriptor) {
    console.log(target); // 构造函数 [Function: Animal]
    console.log(prototypeKey);
    console.log(descriptor);
    descriptor.enumerable = false; // 变成不可枚举
}
;
var Animal = /** @class */ (function () {
    function Animal() {
        this.name = 'zhujian';
    }
    Animal.prototype.getName = function () {
        console.log(this.name);
    };
    __decorate([
        attrDec
    ], Animal.prototype, "name", void 0);
    __decorate([
        methodDec
    ], Animal.prototype, "getName", null);
    __decorate([
        staticDec
    ], Animal, "age", void 0);
    return Animal;
}());
var a = new Animal();
console.log(Object.keys(a)); // [ 'name' ]
for (var key in a) {
    console.log(key); // name 若getName不用@methodDec 则 name getName
}
