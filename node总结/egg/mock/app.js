const express = require('express');
const mock = require('mockjs');
const app =express();

app.get('/news',(req,res,next)=>{
    let limit = req.query.limit;
    let list = mock.mock({
        [`data|${limit}`]:[{
            "id":"@id",
            "title":"@csentence",
            "url":"@url",
            "img":"@image(100X200)",
            "createAt":"@datetime"
        }]
    });
    res.json(list);
});

let num = 0;

app.get('/title',(req,res,next)=>{
    res.json({title:'服务端'+ (num++)})
});

app.listen(3030);