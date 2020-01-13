// 例 函数被调用n次后执行

// 例 函数被调用n次后执行
function after(n,fn){
    return ()=>{
        if(--n === 0){
            return fn()
        }
    } 
}

function say(){
    console.log('say');
    return 'say'
}

let newFn = after(3,say);
newFn();
newFn();
console.log(newFn());// 此时执行


// 我自己琢磨的
function after2(n,fn){
   return ()=>{
       n--;
       if(n > 0){
          return after2(n,fn)
       }else{
          return fn()
       }

   } 

}
let newFn2 = after2(3,say);
console.log(newFn2()()())
