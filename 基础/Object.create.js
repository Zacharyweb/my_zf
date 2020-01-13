Object.create = Object.create || function(proto){
    var F = function(){};
    F.prototype = proto;
    return new F();
}
var a = Object.create({x:1,y:1});