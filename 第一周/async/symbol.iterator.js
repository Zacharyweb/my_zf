/**
 * 以下这种..展开的情况会默认调用[Symbol.iterator]的next方法，再取到next方法返回的{value:xx,done:xx}对象，把其中的value返回给...对应项
 */


var arr = {
    '0':'a',
    '1':'b',
    '2':'c',
    length:3,
    // 生成器函数写法

    // [Symbol.iterator]:function * (){
    //     let index = 0;
    //     while(index !== this.length){
    //         yield  this[index++];
    //     }
    // }

    // 普通函数写法

    [Symbol.iterator](){
        let l = this.length;
        let index = 0;
        return {
            next:()=>{
                 return {value:this[index++],done:index == l+1};
            }
        }
       
    }
}

console.log([...arr])