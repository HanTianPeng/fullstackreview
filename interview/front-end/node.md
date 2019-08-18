
## 基本的Node.js几个特性，比如事件驱动、非阻塞I/O、Stream等

## 异步流程控制相关，Promise是必问的

## 掌握1种以上Web框架，比如Express、Koa、Thinkjs、Restfy、Hapi等，会问遇到过哪些问题、以及前端优化等常识

## 数据库相关，尤其是SQL、缓存、Mongodb等

## 对于常见Node.js模块、工具的使用，观察一个人是否爱学习、折腾

## 是否熟悉linux，是否独立部署过服务器，有+分

## js语法和es6、es7，延伸CoffeeScript、TypeScript等，看看你是否关注新技术，有+分

## 对前端是否了解，有+分

## 是否参与过或写过开源项目，技术博客、有+分


### node概念

- Node.js不是一门语言也不是框架，它只是基于Google V8引擎的JavaScript运行时环境，同时结合Libuv扩展了JavaScript功能，使之支持io、fs等只有语言才有的特性，使得JavaScript能够同时具有DOM操作(浏览器)和I/O、文件读写、操作数据库(服务器端)等能力，是目前最简单的全栈式语言。

- 事件驱动模型，非阻塞I/O模型(non-blocking I/O model)，简单讲就是每个函数都是异步的，最后由Libuv这个C/C++编写的事件循环处理库来处理这些I/O操作，隐藏了非阻塞I/O的具体细节。

- Chrome V8 是 JavaScript 引擎

- Node.js 内置 Chrome V8 引擎，所以它使用的 JavaScript 语法


