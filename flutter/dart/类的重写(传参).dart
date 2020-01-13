class Person{
  final String name;
  final int age;
  static String sex = 'boy';
  Function say = (){
     print('hello');
     print(sex); // 只有static的变量才可已拿到
     // print(age); // 会报错
  };
  void test(){
    print('I am test');
  }

  Person(this.name,this.age);
}


// 类的继承
// class Boy extends Person{
//   String like = 'eat';
//   @override
//   void test(){
//     super.test();
//     print('I am boy test');
//   }
// }

void main() {
  // var p  = Person('wmj',25);
  var p  = Person('zzj',28);
  print(p.name);
  print(p.age);
  p.say();

  // var b  = Boy();
  // b.test();
}