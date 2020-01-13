
/**
 * 用来发请求
 * 
 * */
const http = require('http');
const querystring = require('querystring');
const postData = querystring.stringify({
    'msg': '你好世界'
  });
let config ={
    hostname:'172.20.13.247',
    port:8081,
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    method:'POST',
    path: '/length_request'
}
let  clinet = http.request(config,(res)=>{
    console.log('getResult')
    let dataArr = [] 
    res.on('data',(data)=>{
        dataArr.push(data);
    });
    res.on('end',()=>{
       let buffer = Buffer.concat(dataArr);
       let content = buffer.toString();
       console.log(content);
    })
})  

// 可写流 此时发出的请求 
clinet.end(postData,()=>{
    console.log('endinnner')
});