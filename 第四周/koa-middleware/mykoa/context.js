let context = {}
       

function defineGetter(property,key){
    context.__defineGetter__(key,function(){
        return this[property][key];
    })
};

function defineSetter(property,key){
    context.__defineSetter__(key,function(newVal){
        this[property][key] = newVal;
    })
};

defineGetter('request','url')
defineGetter('request','method');
defineGetter('request','path')
defineGetter('response','body')
defineSetter('response','body')

module.exports = context;