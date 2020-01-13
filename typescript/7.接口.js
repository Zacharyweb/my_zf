"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {};
;
var obj = {
    name: 'zj',
    age: 11
};
var beh = {
    say: function () {
    },
    eat: function () {
    }
};
var p = {
    name: 'zj',
    say: function () {
    },
    age: 26,
    money: true
};
var obj2 = {
    name: '',
    age: 1,
    speak: function () {
    }
};
// 类继承接口
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var dog = new Animal();
dog.age = 11;
var tom = {
    id: 1,
    name: 'zhufeng'
};
var fn = function (name) {
    return 1;
};
fn('zj');
var fn2 = function (name) {
    return 1;
};
fn2('zj');
var arr = ['1', '2'];
var objLike = {
    3: '1',
    2: '2'
};
// let arr2:arrLikeFace2 = ['1','2']; 报错
var objLike2 = {
    3: '1',
    2: '2',
    'aa': 'xixi'
};
var Speaker = /** @class */ (function () {
    function Speaker() {
    }
    Speaker.prototype.speak = function (word) {
        return word;
    };
    return Speaker;
}());
var jack = new Speaker();
jack.speak('chinese');
;
var Cat = /** @class */ (function () {
    function Cat(name) {
        this.name = name;
    }
    return Cat;
}());
var Mimi = Cat; // 新类融合了 Cat与catFace
var mini = new Mimi('mimi');
var a = true;
