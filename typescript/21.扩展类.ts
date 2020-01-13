export default {};

// 1.使用命名空间扩展类
class Form{
    username:string;
    password:string;
};
namespace Form{
    export class Item{ gender:string};
};
let item:Form ={
    username:'',
    password:''
};
let item2:Form.Item = {
  gender:''
};
let item3:Form.Item = new Form.Item();

// 2.使用命名空间扩展函数
function say(name:string):string {
    return name + say.word;
}
namespace say{
    export let word = 'hello'
}
say('hi')

// 3.使用命名空间扩展枚举类型

enum Color {
    red,
    yellow
}
namespace Color{
    export let green = 2;
    export let pink = 3;
}
Color.green;


