let str = `<body>
   <div>{{name}}{{age}}</div>
</body>`;
let result = str.replace(/\{\{(.+?)\}\}/g,function(){
    return obj[arguments[1]];
});

// console.log(result);

let email = 'a';
let emailRegEpx = /(a|b)/
console.log(emailRegEpx.test(email));
