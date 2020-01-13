const http = require('http');
const querystring = require('querystring');
let app = http.createServer()

function sign(value){
    // 加盐用法
    return require('crypto').createHmac('sha256','salt').update(value).digest('base64').replace(/\+|\/|\=/g,''); // replace的原因是  + / = 浏览器不支持
}

app.on('request',async (req,res)=>{
    if(req.url === '/favicon.ico'){
        res.end();
        return;
    };
    if(req.url == '/set'){
        // httoOnly=true; // 可修改但不能在document.cookie里访问到
        // path=/get2 // 只有/get2及其开头的子路由 即/get2/a 这些路径下才能访问到该属性
        // domain=.taobao.com 只有.taobao.com结尾的域下面可以访问到该属性
        // res.setHeader('Set-Cookie',['name=zj;domain=localhost;path=/get2','age=26']);// 同时设置多项必须这么写 可以自己封装个setCookie方法
        res.setHeader('Set-Cookie',['name=zj']);
        res.end('Set-Cookie OK')
    }
    if(req.url == '/get'){
        let cookie = req.headers['cookie'];
        res.end(cookie);
    }
    if(req.url == '/get2'){
        let cookie = req.headers['cookie'];
        // 获取过来是 name=zj;age=26这种形式的
        let cookieObj = querystring.parse(cookie,';','=');
        res.end(JSON.stringify(cookieObj));
    }
    if(req.url == '/get2/a'){
        let cookie = req.headers['cookie'];
        let cookieObj = querystring.parse(cookie,';','=');
        res.end(JSON.stringify(cookieObj));
    }

    if(req.url == '/sign'){
        let cookie = req.headers['cookie'];
        let value;
        let s;
        if(cookie){
            let cookieObj = querystring.parse(cookie,';');
            signData = cookieObj.sign.split('.');
            value = signData[0];
            s = signData[1];
        }
        if(s){
            let newSign = sign(value);
            res.setHeader('Content-Type','text/plain;charset=utf-8');
            if(newSign == s){
                res.end('签名正确')
            }else{
               res.end('签名被改')
            }
        }else{
            res.setHeader('Set-Cookie',['sign='+'zhujian'+'.'+sign('zhujian')]);
            res.end('Set-Cookie OK')
        }
    }
    res.end('index');
});


app.listen(3000,()=>{
    console.log(`server is running at 3000`);
})