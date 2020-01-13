export default {};

// 我们可以把类型声明放在一个单独的类型声明文件中
// 可以在类型声明文件中使用类型声明
// 文件命名规范为*.d.ts
// 观看类型声明文件有助于了解库的使用方式

// 1. 创建typings\jquery.d.ts文件 写入一些类型声明
// 2. tsconfig.json include项配置要编译哪些文件夹下的文件

// 第三方声明文件
// 可以安装使用第三方的声明文件
// @types是一个约定的前缀，所有的第三方声明的类型库都会带有这样的前缀
// JavaScript 中有很多内置对象，它们可以在 TypeScript 中被当做声明好了的类型
// 内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准
// 这些内置对象的类型声明文件，就包含在TypeScript 核心库的类型声明文件中

// 例：使用jquery 
// cnpm i jquery -S
// 文件引用 import * as jQuery from 'jquery';
//         jQuery.ajax('/user/1');

// cnpm i @types/jquery -S 安装声明文件

// 自己编写声明文件
// 1.在 node_modules\@types\jquery/index.d.ts 中编写 里面export = jQuery;
// 2.自定义声明文件位置 在tsconfig.json 打开compilerOptions中配置的 baseUrl 跟 paths注释 配置  "baseUrl": "./", "paths": { "*":["types/*"]}
// paths里面放置类型声明文件所在文件夹，这样就不会引用默认的node_modules\@types\下面的类型文件了


// npm 声明文件可能的位置
// node_modules/jquery/package.json
// "types":"types/xxx.d.ts"
// node_modules/jquery/index.d.ts
// node_modules/@types/jquery/index.d.ts


// 生成声明文件
// 把TS编译成JS后丢失类型声明，我们可以在编译的时候自动生成一份JS文件
// 做法：tsconfig.json 打开compilerOptions中配置的 "declaration": true