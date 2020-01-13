function Layer(path,handler){
    this.path = path;
    this.handler = handler;
}
Layer.prototype.match = function(pathname){
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