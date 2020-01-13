
let arr = ['1',2,3,'1',4,6,1,3,'3']
// 方法1：
function qc1(arr){
    let result = [];
    arr.forEach((item)=>{
        if(result.indexOf(item) == -1){
            result.push(item);
        }
    });
    return result;
}

//方法2：

function qc2(arr){
    let obj = {};
    let result = [];
    arr.forEach((item,i)=>{
        obj[item] = i;
    });
    for(let key in obj){
        result.push(key);
    };
    return result;
}
// 以上方法会把数组里number类型的元素变成string

// 优化

function qc3(arr){
    let obj = {};
    let result = [];
    arr.forEach((item,i)=>{
        let type = typeof item;
        if(!obj[item]){
            obj[item] = [type];
            result.push(item);
        }else if(obj[item].indexOf(type) == -1){
            obj[item].push(type)
            result.push(item);
        }
    });
    return result;
}



//方法3：
// 思路：获取没重复的最右一值放入新数组
/*
* 推荐的方法
*
* 方法的实现代码相当酷炫，
* 实现思路：获取没重复的最右一值放入新数组。
* （检测到有重复值时终止当前循环同时进入顶层循环的下一轮判断）*/

/**
 * 
 * 判断这个元素的右边还有没有元素与这个元素相等 没有的话就把这个元素推进数组 有的话因为i++跳过了该元素 知道它最后一次出现再推进数组里 
 */
function qc4(array){
    var temp = [];
    var l = array.length;
    for(var i = 0; i < l; i++) {
       
        for(var j = i + 1; j < l; j++){
            if (array[i] === array[j]){
              // 遇到重复项
              i++;  // i++后就跳过了该项，后面temp.push(array[i])就不会添加该项
              j = i;  // j重置，准备进入下一轮循环   
            }
        }
        
        // 如果把该元素右侧的元素循环完了后没有重复项 则把该项push进数组
        temp.push(array[i]);
    }
    return temp;
};



// 自己写的
function qc5(arr){
    let l = arr.length;
    let result = [];
    for(let i = 0; i < l; i++){
        for(let j = i + 1 ; j < l; j++){
            if(arr[i] === arr[j]){
                i++;
                j=i;
            }
        }
        result.push(arr[i]);
    }
    return result;
}
















console.log(qc1(arr));
// console.log(qc2(arr));
console.log(qc4(arr));
console.log(qc5(arr));
// console.log(arr.sort());


