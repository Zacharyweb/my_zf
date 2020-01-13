/**
 *  .	匹配除换行符以外的任意字符
 * \w	匹配字母或数字或下划线或汉字
 * \s	匹配任意的空白符
 * \d	匹配数字
 * \b	匹配单词的开始或结束
 * ^	匹配字符串的开始
 * $	匹配字符串的结束
 */

// 正则实例的两个方法 test() exec() 
// 字符串的匹配两个方法 match() replace()


let  reg1 = /\d?([a-z]+)/g;
let str = 'abc1fd4';

// console.log(reg1.exec(str));
// console.log(reg1.lastIndex);
// console.log(reg1.exec(str));


let email = /^([_a-zA-Z0-9])([_a-zA-Z0-9]*)\@([_a-zA-Z0-9]+)\.[_a-zA-Z0-9]+/;
let begin = /(^)/;
let estr = 'zhujian@163.com';

// console.log(estr.replace(email,'$1xxxxx$2'));  // $1 => z  $2 =>hujian  $3=>163
// 比如如果上面正则里 @后面的括号把+号包在外面 那么 $3就是取最后一个匹配到的 即就是 3

estr.replace(email,function(...args){
    // console.log(args);  // [ 'zhujian@163.com', 'z', 'n', '3', 0, 'zhujian@163.com' ]
    return args[0];
});


// console.log(estr.replace(begin,'A'));
// console.log(estr)

// console.log(estr.match(email));  // [ 'zhujian@163.com','z', 'hujian', '163', index: 0,input: 'zhujian@163.com',groups: undefined ];

let css = `
  body{
      background:url('./public.jpg')
  }
  div{
    background:url('./icon.png');
    font-size:14px;
  }
`

let cssReg = /url\((.+?)\)/g;

console.log(css.replace(cssReg,'url(require($1))'));







let reg = /url\((.+?)\)/g;
let pos = 0;
let current;
let arr = ['let list = []'];
while (current = reg.exec(css)) { // [matchUrl,g] => ['url(xxx)','xxx']
  let [matchUrl, g] = current;
  //console.log(matchUrl, g)  
  let last = reg.lastIndex - matchUrl.length;
  arr.push(`list.push(${JSON.stringify(css.slice(pos, last))})`);
  pos = reg.lastIndex;
  // 把 g 替换成 require的写法  => url(require('xxx'))
  arr.push(`list.push('url('+require(${g})+')')`);
}
arr.push(`list.push(${JSON.stringify(css.slice(pos))})`)
arr.push(`module.exports = list.join('')`);
console.log(arr.join('\r\n'));


// let list = []
// list.push("\n  body{\n      background:")
// list.push('url('+require('./public.jpg')+')')
// list.push("\n  }\n  div{\n    background:")
// list.push('url('+require('./icon.png')+')')
// list.push(";\n    font-size:14px;\n  }\n")
// module.exports = list.join('');