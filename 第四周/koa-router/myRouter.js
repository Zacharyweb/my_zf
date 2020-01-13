class Router{
    constructor(){
       this.middlewares = [];
    }
    get(path,middleware){
        this.middlewares.push({
            path,
            middleware,
            method:'GET'
        })
    }
    compose(arr,ctx,next){
        function dispatch(index){
            if(index == arr.length) return next();
            let middleware = arr[index].middleware;
            return Promise.resolve(middleware(ctx,()=>{
                dispatch(index+1);
            }))
        }
        return dispatch(0);
    }

    // async await实现
    // async compose(arr,ctx,next){
    //     let l = arr.length;
    //     async function dispatch(index){
    //         if(index == l) return await dispatch();
    //         let middleware = arr[index].middleware;
    //         return await middleware(ctx,()=>{dispatch(index+1)})
    //     }
    //     return dispatch(0)
    // }
    routes(){
        return (ctx,next)=>{
            let path = ctx.path;
            let method = ctx.method;
            let arr = this.middlewares.filter((item)=>{
                if(item.path == path && item.method == method){
                    return true;
                }
            });
            this.compose(arr,ctx,next);
        }
    }

}
module.exports = Router;