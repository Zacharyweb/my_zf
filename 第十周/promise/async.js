let p1 = function(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('22');
        },3000)
    })
};
async function fn(){
    let a = await p1();
    return '1';
};
fn().then((res)=>{
    console.log(res);
});