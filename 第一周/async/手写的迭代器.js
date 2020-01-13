// 迭代器就是有一个next方法，每次调用都返回一个对象有value跟done属性

let arr = ['wo','ai','ni','ma'];

function myGen(arr){
    let index = 0;
    let len = arr.length;
    return {
        next(){
            let value = arr[index] || undefined;
            let done = index > len-1;
            index++;
            return {
                value,
                done
            };
        }
    }
}

var mg = myGen(arr);
console.log(mg.next());
console.log(mg.next());
console.log(mg.next());
console.log(mg.next());
console.log(mg.next());
