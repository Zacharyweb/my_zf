let arr = []

function a(cb){
    let a = b(cb)
    a();
};

function b(cb){
    let fn = function(){
        return c(fn,cb);
    }
    return fn;
};

function c(fn,cb){
   arr.push(fn);
   cb();
   arr.pop()
}

a(()=>{
    console.log('cbcbcbcbcbcb');
})

console.log(arr);
