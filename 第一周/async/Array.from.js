var arr = {
    '0':'a',
    '1':'b',
    '3':'c',
    'g':'g',
    length:1
}

Array.from2 = (obj)=>{
    let arr = [];
    let reg = /^[0-9](\d*)$/
    for(let key in obj){
        if(reg.test(key)){
            arr[key] = obj[key];
        }
    }
    // console.log(arr[2]);
    for(let i = 0; i < arr.length;i++){
        if(!arr[i]){
            arr[i] = undefined;
        }
    }
    arr.length = obj.length || 0;
    return arr;
}

console.log(Array.from(arr))
console.log(Array.from2(arr))
