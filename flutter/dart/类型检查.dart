typedef int Compare(int a, int b);  // 定义函数的各个参数类型与返回值类型 

int sort(int a, int b) => a + b;

main() {
  // assert(sort is Compare); // 断言
  print(sort is Compare); // 如果函数的各个参数类型与返回值类型 跟Compare里面定义的一样 返回true 有一处不同 返回false
}