"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {};
function sum() {
    var n = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        n[_i] = arguments[_i];
    }
    var args = arguments;
    for (var i = 0; i < args.length; i++) {
        console.log(args[i]);
    }
}
;
sum(1, 2, 3);
var root = document.getElementById('root');
var childern = root.children;
var nodeList = root.childNodes;
