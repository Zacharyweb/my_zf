const pathToRegExp = require('path-to-regexp');
function Layer(path,handler){
    this.path = path;
    this.handler = handler;
    // this.keys = [];
    this.regExp = pathToRegExp(path,this.keys=[])
}
Layer.prototype.match = function(pathname){
    // if(this.route){
        let [,...matches] = pathname.match(this.regExp);
        if(matches){
            this.params = this.keys.reduce((obj,item,i)=>{
                obj[item.name] = matches[i];
                return obj;
            },{})
    
            return true;
        }
    // };

    // use时
    if(!this.route){
        if(this.path === '/'){
            return true;
        }
        // 加/是为了防止 pathname为 /username/add 也能匹配到/user 
        if(pathname.startsWith(this.path+'/')){
            return true;
        }
    };
    if(this.path === pathname){
        return true;
    }
    return false;

}
module.exports = Layer;