const {Subscription} = require('egg');
class CacheSubscription extends Subscription{
    static get schedule(){
        return {
            interval:'30s',
            type:'all'
        }
    }
    async subscribe(){
        console.log('每30s执行一次');
         this.ctx.app.cache = {title:'30s返回的'};
        // const result = await this.ctx.curl(this.config.cache.title,{dataType:'json'});
        // this.ctx.app.cache = result.data;
    }
}
module.exports = CacheSubscription;