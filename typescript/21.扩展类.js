"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {};
// 1.使用命名空间扩展类
var Form = /** @class */ (function () {
    function Form() {
    }
    return Form;
}());
;
(function (Form) {
    var Item = /** @class */ (function () {
        function Item() {
        }
        return Item;
    }());
    Form.Item = Item;
    ;
})(Form || (Form = {}));
;
var item = {
    username: '',
    password: ''
};
var item2 = {
    gender: ''
};
var item3 = new Form.Item();
// 2.使用命名空间扩展函数
function say(name) {
    return name + say.word;
}
(function (say) {
    say.word = 'hello';
})(say || (say = {}));
say('hi');
// 3.使用命名空间扩展枚举类型
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["yellow"] = 1] = "yellow";
})(Color || (Color = {}));
(function (Color) {
    Color.green = 2;
    Color.pink = 3;
})(Color || (Color = {}));
Color.green;
