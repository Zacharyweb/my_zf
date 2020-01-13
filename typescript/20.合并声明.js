"use strict";
// 同一名称的两个独立声明会被合并成一个单一声明
// 合并后的声明拥有原先两个声明的特性
// 类既可以作为类型使用，也可以作为值使用，接口只能作为类型使用
Object.defineProperty(exports, "__esModule", { value: true });
// 关键字	    作为类型使用	作为值使用
// class	       yes	        yes
// enum	           yes	        yes
// interface	   yes	        no
// type	           yes	        no
// function    	   no	        yes
// var,let,const   no	        yes
var Person = /** @class */ (function () {
    function Person() {
        this.name = '';
    }
    return Person;
}());
//作为类型使用
var p1 = {
    name: 'd'
};
//作为值使用
var p2 = new Person();
var a1;
var t1;
var a3 = { name: 'zhufeng', age: 10 };
console.log(a3.name);
console.log(a3.age);
exports.default = {};
