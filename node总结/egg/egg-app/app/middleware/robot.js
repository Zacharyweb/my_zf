module.exports = (options,app)=>{
    return async function(ctx,next){
        const source = ctx.get('user-agent') || '';
        const matches = options.ua.some(ua => ua.test(source));
        console.log(source);

        // Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.87 Mobile Safari/537.36
        // Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1
        if(matches){
            ctx.status = 403;
            ctx.body = '你没有权限';
        }else{
            await next();
        }
    }
}