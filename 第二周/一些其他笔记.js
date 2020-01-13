/**
 *  ejs这些模板引擎的实现
 *  1. {{name}} 这样的内容用正则匹配替换
 *  2. html模板里面有js语句 如array.forEach(...)  if(..){}else()这些 
 *     思路 用正则匹配js语句标志位，把html模板按head body tail分割成一段段字符串，再拼接成如
 *     "let str = `<html>...<body>` + obj.array.forEach(...) + `</body>`";
 *     再套个with把作用域套进去 fnContent = "with(obj){let str = `<html>...<body>` + obj.array.forEach(...) + `</body>`}",
 *     再new Function('obj',fnContent),
 *     处理完后的就是生成后的html
 *  3. obj.array.forEach(...) 里面的  <li> {% item %}</li> 替换成 `<li>${item}</li>`
 */

 
 /**
  * 数据结构 
  * 队列 栈 链表 集合 hash表 树 图
  */



 /***
  * 宏任务微任务
  * 
  * 微任务现在目前的就Promise.then()是，以前还有个H5 的 MutationObserver  node里有process.nextTick
  * 宏任务：script setTimeout setInterval  requestAnimationFrame
  * 主进程执行完 --》 按顺序清空微任务队列里的所有任务 --》 拿出宏任务队列里的第一个任务放进主进程执行 --》该宏任务执行完后按顺序清空微任务队列里的所有任务 --》拿出宏任务队列里的第一个任务放进主进程执行。。如此循环
  */