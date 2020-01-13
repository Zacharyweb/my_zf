"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {};
function addAge(target, methodName, paramsIndex) {
    console.log(target);
    console.log(methodName);
    console.log(paramsIndex);
    target.age = 10;
}
;
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.login = function (username, password) {
        console.log(this.age, username, password);
    };
    __decorate([
        __param(1, addAge)
    ], Person.prototype, "login", null);
    return Person;
}());
var p = new Person();
p.login('zj', '123');
