/**
 * 定义要求： 返回值类型 函数名 (){ 函数体... return返回值 } 没有返回值类型为 void
 * main函数可以传参,类型为List，不过一般不传
 * 方法也是对象，并且有具体类型Function
 * 定义方式可以简化：返回值类型、参数类型 都可以忽略，可以使用箭头语法
 * 方法都有返回值，如果没定义，默认返回 null
 */

void main(){
   print(num1); //可以拿到num1 输出12

   print(getMsg('zj',26));

   // 可选参数传参
   
   print(getMsg2('zj'));
   print(getMsg2('zj',age:26));
   print(getMsg2('zj',sex:'boy',like:'run'));
   print(getMsg2('zj',age:26,sex:'boy'));


   List list = ["a", "b", "c"];
   list.forEach(print); // a b c

   // 回调函数 
   List list2 = ["h", "e", "l", "l", "o"];
   print(listTimes(list2, strRepeat));

   // 闭包
   var func = bag();
   func();
   func();
   func();
   func();

  // 自执行函数
  int age = ((){
    int a = 1;
    int b = 2;
    return a+b;
  })();

  print(age); // 3
}

num num1 = 12;

// 函数声明的写法
String sex(){
  return "boy";
}
// 或者
// Function sex = (){
//   return "boy";
// };

String getMsg(String name,num age){
  return '''$name,$age''';
}

// 可选参数
// 如果有具体参数和可选参数，可选参数声明必须在参数后面
// 可以设置默认值
String getMsg2(String name,{num age,String sex,String like='eat'}){
  return '''$name,$age,${sex},$like''';
}


String strRepeat(str)=> str*3;

// 传递回调函数，依然可以为传递的回调函数返回值定义类型
List listTimes(List list, String fn(s)){
  for(var i=0; i<list.length; i++){
    list[i] = fn(list[i]);
  }
  return list;
}


Function bag(){
  int count = 0;
  return (){
    print(count++);
  };
}





