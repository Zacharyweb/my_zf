let events = require('events');
class Boy extends events{
    constructor(name){
        super();
        this.name = name;
    }
    say(){
        console.log(this.name);
        this.emit('buy');
    }
}

let xm = new Boy('小明');

xm.on('buy',()=>{
    console.log('小明买东西~!~');
});
xm.say();