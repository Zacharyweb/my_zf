export default {};
// 声明文件可以让我们不需要将JS重构为TS，只需要加上声明文件就可以使用系统

// 1. 普通类型声明

declare const $ :(selector:string)=>{
    click():void;
    width(length:number):void;
}

$('#root').click()

declare let age:number;
declare let name:string;
declare class Animal{}
declare function  getName():string;

// 2.外部枚举
declare enum Seasons {
    Spring,
    Summer,
    Autumn,
    Winter
}

let seasons = [
    Seasons.Spring,
    Seasons.Summer,
    Seasons.Autumn,
    Seasons.Winter
];

// declare 定义的类型只会用于编译时的检查，编译结果中会被删除。上例的编译结果如下
// var seasons = [
//     Seasons.Spring,
//     Seasons.Summer,
//     Seasons.Autumn,
//     Seasons.Winter
// ];

// 也可以同时使用declare 和 const

declare const enum Seasons2 {
    Spring,
    Summer,
    Autumn,
    Winter
}

let seasons2 = [
    Seasons2.Spring,
    Seasons2.Summer,
    Seasons2.Autumn,
    Seasons2.Winter
];

// 编译后
// var seasons2 = [
//     0 /* Spring */,
//     1 /* Summer */,
//     2 /* Autumn */,
//     3 /* Winter */
// ];

// 3.namespace
declare namespace $2{
    function ajax(url:string,settings:any):void;
    let name:string;
    namespace fn {
        function extend(object:any):void;
    }
}

$2.ajax('/api/users',{});
$2.fn.extend({
    log:function(message:any){
        console.log(message);
    }
});
export {};