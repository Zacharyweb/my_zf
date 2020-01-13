// 观察者模式里面包含发布订阅模式

class BeObserver{
    constructor(name){
       this.name = name;
       this.status = '';
       this.arr = [];
    };
    add(obj){
      this.arr.push(obj)
    }
    change(status){
        this.status = status;
        this.arr.forEach((item)=>{
            item.update(status)
        })
    }
}

class Observer{
    constructor(name){
        this.name = name;
    }
    update(data){
        console.log(data);
    }
}

let a = new Observer('a');
let b = new Observer('b');
let c = new BeObserver('c');

c.add(a);
c.add(b);
c.change('变了')