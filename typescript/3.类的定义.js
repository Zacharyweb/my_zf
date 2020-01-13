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
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.getName = function () {
        console.log(this.name);
    };
    return Person;
}());
;
var p1 = new Person;
p1.name = 'zhujian';
p1.getName();
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.setName = function (name) {
        this.name = name;
    };
    return User;
}());
var u1 = new User('zj');
console.log(u1.name);
// 参数属性 User
// public声明了的属性，就会自动在类内部声明，相当于上面User里声明name了
// readonly like: string; 只读
// public name: string;  //类里面 子类 其它任何地方外边都可以访问
// protected age: number; //类里面 子类 都可以访问,其它任何地方不能访问
// private money: number; //类里面可以访问， 子类和其它任何地方都不可以访问
var User2 = /** @class */ (function () {
    function User2(name, age) {
        this.age = age;
        this.name = name;
    }
    User2.prototype.getName = function () {
        return this.name;
    };
    User2.prototype.setName = function (name) {
        this.name = name;
    };
    return User2;
}());
var u2 = new User2('sbzzzjjj', 19);
console.log(u2.name);
var Son = /** @class */ (function (_super) {
    __extends(Son, _super);
    function Son(name, age, no) {
        var _this = _super.call(this, name, age) || this;
        _this.no = no;
        return _this;
    }
    return Son;
}(User2));
var son1 = new Son('zzh', 18, 1);
// static静态属性静态方法
var Father = /** @class */ (function () {
    function Father(money) {
        this.money = money;
    }
    Father.getMoney = function () {
        // 不能访问到 this.money
        return Father.className;
    };
    Father.className = 'Father';
    return Father;
}());
;
Father.getMoney();
Father.className;
// 抽象类
// 抽象描述一种抽象的概念，无法被实例化，只能被继承
// 无法创建抽象类的实例
// 抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现，而且必须实现
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.speak = function () {
        console.log('喵喵喵');
    };
    return Cat;
}(Animal));
var cat = new Cat();
cat.speak();
