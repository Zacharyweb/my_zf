console.log(process.env.NODE_ENV);  // windows下  set NODE_ENV=dev && node process.js 得到的process.env.NODE_ENV是 'dev '
                                    // 要得'dev'则 && 前不能有空格 即set NODE_ENV=dev&& node process.js
                                    // mac中用的是export NODE_ENV=dev 跨平台有个第三方库 cross-env 使用 cross-env NODE_ENV=dev && node process.js
// console.log(process)
console.log(process.argv) // 得到一个数组 前两项系统默认填充进去 分别是node.exe所在目录跟当前启动文件目录，一般没啥用 所以从第三项取起
                          // node process --port 3000 --a b这些会存到process.argv里分别是[.. , .. , --port, 3000, --a ,b]
                          // 然后自己写函数解析获取键值
                          // 这方面有个第三方库可用 commonder.js（不知道有没有拼错）可以用用学习下 输出的彩色显示库chalk.js



console.log(process.cwd()) // 得到c:\Users\zhujian\Desktop\zf 跟path.resolve()结果一样，可用process.chdir()改变
// process.chdir('第二周') 


Promise.resolve().then(()=>{
    console.log('Promise.then');
});
process.nextTick(()=>{
    console.log('我比 promise 的 then 快')
});
 