 /**
  * 1.npm init -y 在packahe.json里配上 "bin":{ "xxx": "对应的文件"}
  * 2.对应的文件以 #!/usr/bin/env node 表示以node启动
  * 3.在packahe.json所在的文件夹里npm link可以把目录映射到全局上 这样就可以测试在命令行里直接运行xxx了
  * 4.包上传npm在下载安装到全局后 命令行里xxx也能直接运行了
  */