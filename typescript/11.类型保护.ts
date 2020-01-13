export default {}
// 类型保护
// 1.typeof
function double(input:string | number | boolean){
    // return input + input; // 直接这样写会报错 因为无法确定传入值得类型
    if(typeof input == 'string'){
       return input + input;
    }else if(typeof input == 'number'){
       return input * 2;
    }else{
        return !input;
    }
}

// 2.instanceof类型保护

class Animal{
    name:string;
}
class Bird extends Animal{
    swing:number
}

function createNiNi(a:Animal){
    if(a instanceof Bird){
        console.log(a.swing);
    }else{
        console.log(a.name);
    }
}

// 3.null保护
// 如果开启了strictNullChecks选项，那么对于可能为null的变量不能调用它上面的方法和属性
function getFirstLetter(str:string | null){
    if(str == null){
        return '';
    }
    str = str || '';
    return str.charAt(0);
};

//它并不能处理一些复杂的判断，需要加非空断言操作符
function getFirstLetter2(s: string | null) {
    function log() {
        console.log(s!.trim())   
    }
    s = s || '';
    log();
    return s.charAt(0);
}

type A = {b:string,x:number} | null;
let a:A ;
// 4.链判断运算符
// a?.b; //如果a是null/undefined,那么返回undefined，否则返回a.b的值.
// a == null ? undefined : a.b;

// a?.[x]; //如果a是null/undefined,那么返回undefined，否则返回a[x]的值
// a == null ? undefined : a[x];

// a?.b(); // 如果a是null/undefined,那么返回undefined
// a == null ? undefined : a.b(); //如果a.b不函数的话抛类型错误异常,否则计算a.b()的结果

// a?.(); //如果a是null/undefined,那么返回undefined
// a == null ? undefined : a(); //如果A不是函数会抛出类型错误
//否则 调用a这个函

// 5.可辨识的联合类型
interface WarningBtn{
    class:'waring',
    text1:string
}
interface DangerBtn{
    class:'danger',
    text2:'删除'
}

let btn:WarningBtn | DangerBtn;
if(btn.class == 'waring'){
    console.log(btn.text1);
}else{
    console.log(btn.text2);
};


// 6. in 操作符
if('text1' in btn){
    console.log(btn.text1);
}else{
    console.log(btn.text2);
}

//  7.自定义的类型保护
function isWarning(b:WarningBtn| DangerBtn):b is WarningBtn{
   return (<WarningBtn>b).text1 == '修改2'; // 断言写法 
//    return (b as WarningBtn).text1 == '修改';
}

function createBtn(b:WarningBtn| DangerBtn){
    if(isWarning(b)){
        console.log(b.text1);
    }else{
        console.log(b.text2);
    }
}