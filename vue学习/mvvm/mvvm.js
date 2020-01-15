// 数据劫持
class Observer{
    constructor(data){
        this.observer(data);
    }
    observer(data){
       if(!data || typeof data != 'object'){
           return data;
       };
       Object.keys(data).forEach((key)=>{
           this.defineReactive(data,key,data[key]);
           this.observer(data[key]);
       })
    }
    defineReactive(data,key,value){
        let dep = new Dep();
        Object.defineProperty(data,key,{
            get(){
              Dep.target && dep.addSub(Dep.target);
              return value;
            },
            set:(newVal)=>{
                if(value != newVal){
                   this.observer(newVal);
                   value = newVal; 
                   dep.notify();
                }
            }
        })

    }
}

// 模板编译
class Complier{
    constructor(el,vm){
        if(this.isElementNode(el)){
            this.el = el;
        }else{
            this.el = document.querySelector(el);
        }
        this.vm = vm;
        if(this.el){
            let fragment = this.node2fragment(this.el)
            this.complier(fragment);
            this.el.appendChild(fragment);
        }
    }
    node2fragment(el){
        let fragment = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild){
            fragment.appendChild(firstChild);
        };
        return fragment;
    }
    complier(fragment){
        let childNodes = fragment.childNodes;
        Array.from(childNodes).forEach((node)=>{
           if(this.isElementNode(node)){
                this.complierElement(node)
                this.complier(node);
           }else{
                this.complierText(node)
           }
        })
    }
    complierElement(node){
       let attrs = node.attributes;
       Array.from(attrs).forEach((attr)=>{
           let {key,value,name} = attr;
           if(this.isDirective(name)){
               let expr = value;
               let [,directive] = name.split('-'); // v-model这些
               let [directiveName,eventName] = directive.split(':'); // 解析v-on:click这类的
               complierUtils[directiveName](node,this.vm,expr,eventName);
           }
       })
    }
    complierText(node){
        let expr = node.textContent;
        let reg = /{{(.+?)}}/g;
        if(expr.match(reg)){
             complierUtils['text'](node,this.vm,expr);
        };
    }
    isElementNode(node){
        return node.nodeType === 1;
    }
    isDirective(str){
        return str.startsWith('v-')
    }
}

const complierUtils = {
     model(node,vm,expr){
    
        new Watcher(vm,expr,(newVal)=>{
            this.updater.modelUpdater(node,newVal); 
        })
        node.addEventListener('input',(e)=>{
            let value = e.target.value;
            this.setVal(vm,expr,value);
        })
        this.updater.modelUpdater(node,this.getVal(vm,expr));
     },
     on(node,vm,expr,eventName){
         node.addEventListener(eventName,(e)=>{
             vm[expr].call(vm,e);
         });
         
     },
     html(node,vm,expr){
        this.updater.htmlUpdater(node,this.getVal(vm,expr));
        new Watcher(vm,expr,(newVal)=>{
            this.updater.htmlUpdater(node,newVal); 
        })
     },
     text(node,vm,expr){
        let value = this.getTextVal(node,vm,expr);
        expr.replace(/{{(.+?)}}/g,(...args)=>{
            new Watcher(vm,args[1],()=>{
                this.updater.textUpdater(node,this.getTextVal(node,vm,expr)); 
            })
        })
        this.updater.textUpdater(node,value); 
     },

     getTextVal(node,vm,expr){
         return expr.replace(/{{(.+?)}}/g,(...args)=>{
             return this.getVal(vm,args[1]);
         })
     },
     getVal(vm,expr){
         let keyArr = expr.split('.');
         return keyArr.reduce((result,key)=>{
             return result[key]
         },vm.$data)
     },
     setVal(vm,expr,value){
        let keyArr = expr.split('.');
        return keyArr.reduce((result,key,index)=>{
           if(index == keyArr.length -1){
               return result[key] = value;
           }
           return result[key];
        },vm.$data)
     },
     updater:{
         modelUpdater(node,value){
             node.value = value;
         },
         textUpdater(node,value){
            node.textContent = value;
         },
         htmlUpdater(node,value){
            
             node.innerHTML = value;

         }
     }
}

class Watcher{
    constructor(vm,expr,cb){
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        this.value = this.get();
    }
    get(){
        Dep.target = this;
        let value = this.getVal(this.vm,this.expr);
        Dep.target = null;
        return value;
    }
    getVal(vm,expr){
      let value = complierUtils.getVal(vm,expr);
      return value;
    }

    update(){
        let newVal = this.getVal(this.vm,this.expr);
        let oldVal = this.value;
        if(newVal != oldVal){
            this.cb(newVal);
        }
    }
}

class Dep{
    constructor(){
        this.subs = [];
    }
    addSub(watcher){
        this.subs.push(watcher)
    }
    notify(){
        this.subs.forEach((watcher)=>{
            watcher.update();
        })
    }
}


class MVVM {
    constructor(opts){
       this.$el = opts.el;
       this.$data = opts.data;
       let computed = opts.computed;
       let methods = opts.methods;

       if(this.$el){
           new Observer(this.$data);

            for(let key in computed){
               Object.defineProperty(this.$data,key,{
                   get:()=>{
                      return computed[key].call(this)
                   }
               })
            };

            for(let key in methods){
                Object.defineProperty(this,key,{
                    get:()=>{
                       return methods[key];
                    }
                })
            };

           this.proxyData(this.$data);
           new Complier(this.$el,this);
       }
    }
    proxyData(data){
        Object.keys(data).forEach((key)=>{
            Object.defineProperty(this,key,{
                get(){
                    return data[key];
                },
                set(newVal){
                    data[key] = newVal;
                }
            })
        })

    }
}

