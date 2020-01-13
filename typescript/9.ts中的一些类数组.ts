export default{};

function sum(...n:number[]){
   let args:IArguments = arguments;
   for(let i = 0; i < args.length;i++){
       console.log(args[i]);
   }
};
sum(1,2,3);


let root = document.getElementById('root');

let childern:HTMLCollection = root.children;
let nodeList:NodeList = root.childNodes;