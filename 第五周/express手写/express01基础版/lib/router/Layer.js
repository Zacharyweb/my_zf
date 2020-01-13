function Layer(path,handler){
    this.path = path;
    this.handler = handler;
}
Layer.prototype.match = function(pathname){
    if(this.path === pathname){
        return true;
    }
    return false;

}
module.exports = Layer;