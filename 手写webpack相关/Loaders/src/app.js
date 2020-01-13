import a from '!!inline-loader!./a.js'
import './style.css';
import './style2.less';
console.log('Hello world~')
console.log(a)

let imgSrc = require('./icon.png');

let img = new Image();
img.src = imgSrc;
img.onload = function(){
    console.log('图片已载入');
};

document.body.append(img);