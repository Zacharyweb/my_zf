// var写法 输出 6 6 6 6 6
for(var i = 1; i < 6; i++){
    setTimeout(()=>{
      console.log(i);
    })
}

// 闭包写法
for(var i = 1; i < 6; i++){
    (function(i){
      setTimeout(()=>{
        console.log(i);
      }) 
    })(i)
}

// setTimeout第三个参数写法
for(var i = 1; i < 6; i++){
    setTimeout((a)=>{
      console.log(a);
    },0,i)
}

// let写法 输出 1 2 3 4 5
for(let i = 1; i < 6; i++){
    setTimeout(()=>{
      console.log(i);
    })
}