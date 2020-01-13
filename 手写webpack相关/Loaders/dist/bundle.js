/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./loaders/css-loader.js!./loaders/less-loader.js!./src/style2.less":
/*!**************************************************************************!*\
  !*** ./loaders/css-loader.js!./loaders/less-loader.js!./src/style2.less ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

let list = []
list.push("body img {\n  width: 30px;\n  height: 30px;\n}\n")
module.exports = list.join('')

/***/ }),

/***/ "./loaders/css-loader.js!./src/style.css":
/*!***********************************************!*\
  !*** ./loaders/css-loader.js!./src/style.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

let list = []
list.push("body{\r\n    background-color: pink;\r\n}")
module.exports = list.join('')

/***/ }),

/***/ "./loaders/inline-loader.js!./src/a.js":
/*!*********************************************!*\
  !*** ./loaders/inline-loader.js!./src/a.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = 'zjnbnb';

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _a = _interopRequireDefault(__webpack_require__(/*! !inline-loader!./a.js */ "./loaders/inline-loader.js!./src/a.js"));

__webpack_require__(/*! ./style.css */ "./src/style.css");

__webpack_require__(/*! ./style2.less */ "./src/style2.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log('Hello world~');
console.log(_a["default"]);

var imgSrc = __webpack_require__(/*! ./icon.png */ "./src/icon.png");

var img = new Image();
img.src = imgSrc;

img.onload = function () {
  console.log('图片已载入');
};

document.body.append(img);

/***/ }),

/***/ "./src/icon.png":
/*!**********************!*\
  !*** ./src/icon.png ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "img/icon.835f6ff7.png"

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    let style = document.createElement('style');
    style.innerHTML = __webpack_require__(/*! !../loaders/css-loader.js!./style.css */ "./loaders/css-loader.js!./src/style.css");
    document.head.appendChild(style);
  

/***/ }),

/***/ "./src/style2.less":
/*!*************************!*\
  !*** ./src/style2.less ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    let style = document.createElement('style');
    style.innerHTML = __webpack_require__(/*! !../loaders/css-loader.js!../loaders/less-loader.js!./style2.less */ "./loaders/css-loader.js!./loaders/less-loader.js!./src/style2.less");
    document.head.appendChild(style);
  

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map