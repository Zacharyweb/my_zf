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
// 类型保护
// 1.typeof
function double(input) {
    // return input + input; // 直接这样写会报错 因为无法确定传入值得类型
    if (typeof input == 'string') {
        return input + input;
    }
    else if (typeof input == 'number') {
        return input * 2;
    }
    else {
        return !input;
    }
}
// 2.instanceof类型保护
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Bird = /** @class */ (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bird;
}(Animal));
function createNiNi(a) {
    if (a instanceof Bird) {
        console.log(a.swing);
    }
    else {
        console.log(a.name);
    }
}
// 3.null保护
// 如果开启了strictNullChecks选项，那么对于可能为null的变量不能调用它上面的方法和属性
function getFirstLetter(str) {
    if (str == null) {
        return '';
    }
    str = str || '';
    return str.charAt(0);
}
;
//它并不能处理一些复杂的判断，需要加非空断言操作符
function getFirstLetter2(s) {
    function log() {
        console.log(s.trim());
    }
    s = s || '';
    log();
    return s.charAt(0);
}
var a;
var btn;
if (btn.class == 'waring') {
    console.log(btn.text1);
}
else {
    console.log(btn.text2);
}
;
// 6. in 操作符
if ('text1' in btn) {
    console.log(btn.text1);
}
else {
    console.log(btn.text2);
}
//  7.自定义的类型保护
function isWarning(b) {
    return b.text1 == '修改2'; // 断言写法 
    //    return (b as WarningBtn).text1 == '修改';
}
function createBtn(b) {
    if (isWarning(b)) {
        console.log(b.text1);
    }
    else {
        console.log(b.text2);
    }
}
