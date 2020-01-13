void main() {
  /**
   * var 定义不指定类型的变量 后面变量的类型可变
   * 想后面变量的类型可变 需要定义变量跟赋值分开两步，不然一步完成的话定义的变量类型就自动指定为赋的值的类型了
   * 即 var a; a = 1; a = 'zj; 这样可行；但 var a = 1; a = 'zj'; 这样就不行会报错，此时a已经默认为num类型了
   */
  var a;
  a = 10;
  a = 'zj';
  a ??= 22; // ??= 指如果a值为空就赋值为22的意思
  // print(a);


  /**
   * num类型 下面有两个子类int double
   * 运算符: + - * / ~/ %   其中~/代表除后再取整
   * 常用属性： isNaN、isEven、isOdd 等
   * 常用方法： abs()、round()、floor() // 绝对值，四舍五入、取整...
   */ 
  num num1 = 2;
  // num1 = 2.6;
  // print(num1.isNaN);
  
  int num2 = 1; // 赋值为小数时会报错
  // num2 = 2;
  // print(num2.isEven);   // 是否是偶数 只能用在int类型
  // print(num2.isOdd);  // 是否是奇数 只能用在int类型
  // print(num2.abs());
  // print(num2.round());
  // print(num2.floor());
  
  double num3 = 3.3;
  // print(num3.abs());
  // print(num3.round());
  // print(num3.floor());

  /**
   * String类型 用双引号或单引号都可以
   * 使用r创建原始raw字符串 
   * 三个双引号或单引号用法同js中的模板字符串``，其中也可以用${},不同于模板字符串的是也可以直接 $变量名 这样直接用，不用花口号
   * 算符： +、*、== 、[], []指取索引对应的字符
   * 字符串方法: replaceAll 相当于js中replace(/正则/g,'xx')这样的写法
   */

  String str1 = 'a';
  String str2 = "b";
  String str3 = "hello \nworld"; // 输出 hello 然后另起一行输出world
  print(str3);
  String str4 = r"hello \n world";  //前面加个 r， 换行字符原样输出 即输出hello \n world
  print(str4);

  String str5 = '''I am $num2''';
  print(str5);

  String str6 = """I am ${num2 + num3}""";
  print(str6);

  String str7 = "This is a language";
  print(str7 + " new"); // This is a language new
  print(str7 * 3); // This is a languageThis is a languageThis is a language
  print('This is a language' == str7); // true
  print(str7[1]); // h

  print(str7.replaceAll("s", "S")); // ThiS iS a language


  /**
   * bool 布尔值
   *  与或非：&& || ！
   */
  bool bool1 = true;
  bool1 = false;


/**
 * List数组 
 * 常用操作
 * [], length
 * add(), insert() // insert 第一项是索引，第二项是 value
 * remove(), clear()
 * forEach() // 遍历数组，参数是一个匿名函数
 * indexOf(), lastIndexOf()...
 */
  List list1 = [1, 2, 3, "hello", true,{'name':'zj'}];
  list1[1] = 'zj';
  list1.insert(1,'wmj');
  print(list1);

  const List list2 = [1,2,3]; //list2不可修改  也可以这么写：List list2 = const[1,2,3];

  List<int> list3= [1,2,4]; //创建固定类型的List 也可以这么写：List list3 = <int>[1, 2, 3];
  list3.add(5);
  
  // 构造创建： List list4 = new List();
  List list4 = new List();    // 输出 []



  
  /**
   * Map 键值对
   * 常用操作
   * [], length
   * isEmpty, isNotEmpty
   * keys, values
   * forEach()
   * remove(key)
   * containsKey(key) // 是否包含属性名
   * containsValue(val) // 是否包含属性值
   */
  Map map1 = {'name':'zj'};

  var key = map1;  
  Map map2 = { key:'zj'}; // Map的键可以是变量 可以是任何类型

  print(map2[map1]);

  const Map map3 = {'name':'zj'}; // map3不可修改  也可以这么写：Map map3 = const{'name':'zj'};

  Map map = {"first": "Dart", "second": "Java","third": "Python"};
  print(map.keys);    // (first, second, third)
  print(map.values); // (Dart, Java, Python)
  
  // map.forEach(f);
  var zj = 'zj';
  var age = 26;
  f(zj,age);
}



void f(key, value){
  print("key=$key,value=$value");
}

