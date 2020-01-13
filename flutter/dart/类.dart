class Person{
  String name = 'zj';
  int age = 26;
  static String sex = 'boy';
  Function say = (){
     print('hello');
     print(sex); // 只有static的变量才可已拿到
     // print(age); // 会报错
  };
  void test(){
    print('I am test');
  }
}


// 类的继承
class Boy extends Person{
  String like = 'eat';
  @override //@override标注在test()函数上面 表示test()函数是重写父类的。 可以写也可以不写  建议在覆写父类方法的时候加上 @override 标注用
  void test(){
    super.test(); // 调用父类的test()函数 不调用的话父类的test方法就不执行了
    print('I am boy test');
  }


}

void main() {
  // var p  = new Person();
  var p  = Person();  // dart2+版本里 类的实例化前可以不写new 
  // print(p.name);
  // print(p.age);
  // p.say();
  p.test();

  var b  = Boy();
  // print(b.name);
  // print(b.age);
  // print(b.like);
  // b.say();
  b.test();
}