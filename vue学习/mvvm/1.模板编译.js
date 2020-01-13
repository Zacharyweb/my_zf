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
               let [,type] = name.split('-');
               complierUtils[type](node,this.vm,expr);
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


class MVVM {
    constructor(opts){
       this.$el = opts.el;
       this.$data = opts.data;
       if(this.$el){
           new Complier(this.$el,this)
       }
    }
    

}

const complierUtils = {
     model(node,vm,expr){
        node.value = expr;
        this.updater.modelUpdater(node,this.getVal(vm,expr));
     },
     text(node,vm,expr){
        let value = this.getTextVal(node,vm,expr);
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
     updater:{
         modelUpdater(node,value){
             console.log(value);
             node.value = value;
         },
         textUpdater(node,value){
            node.textContent = value;
         }
     }
}