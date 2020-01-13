"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {};
function enhancer(target) {
    target.prototype.name = 'zj';
    target.prototype.eat = function () {
        console.log('eat');
    };
}
;
var Person = /** @class */ (function () {
    function Person() {
    }
    Person = __decorate([
        enhancer
    ], Person);
    return Person;
}());
var p = new Person();
console.log(p.name);
;
function enhancer2(name) {
    return function (target) {
        target.prototype.name = name;
        target.prototype.eat = function () {
            console.log('eat');
        };
    };
}
;
var Person2 = /** @class */ (function () {
    function Person2() {
    }
    Person2 = __decorate([
        enhancer2('zzjj')
    ], Person2);
    return Person2;
}());
var p2 = new Person2();
console.log(p2.name);
function enhancer3(target) {
    return /** @class */ (function () {
        function class_1() {
            this.name = 'jiagou';
        }
        class_1.prototype.eat = function () {
            console.log('吃饭饭');
        };
        return class_1;
    }());
}
var Person3 = /** @class */ (function () {
    function Person3() {
    }
    Person3 = __decorate([
        enhancer3
    ], Person3);
    return Person3;
}());
var p3 = new Person3();
console.log(p3.name);
p3.eat();
