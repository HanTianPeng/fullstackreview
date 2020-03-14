### 为什么前端需要构建？
1. 开发复杂化
2. 框架去中心化
3. 语言编译化
4.  开发模块化

### JS模块化发展史
  - 命名空间
    - 库名.类名.方法名 (YUI2第三库大量使用过)
    ```javascript
    var NameSpace = {};
    NameSpace.type = NameSpace.type || {};
    NameSpace.type.method = function() {
    };
    ```

  - COMMONJS(node服务器端使用)
    - 一个文件一个模块
    - 通过module.exports暴露模块接口
    - 通过require引入模块,由于commonjs运行在服务端,所以require都是同步执行,本地加载

    ```javascript
    var mixin = require('./mixin');
    exports = module.exports = {};
    ```

  - AMD
    - 使用define定义模块
    - Async Module Definition
    - 使用require加载模块
    - RquireJS
    - 依赖前置,提前执行

    ```javascript
    define(
        // 模块名
        'alpha',
        // 依赖
        ['require', 'exports', 'beta'],
        // 模块输出
        function(require, exports, beta) {
            exports.verb = function() {
                return beta.verb();
                // 或则
                // return require('beta').verb();
            }
        }
    );

    define(
        ['a', 'b', 'c'],
        function(a, b, c) {
            // 等于最前面申明并初始化了要用到的所有模块
            if(false){
                // 即便压根没有用到b模块,但是b还是提前执行了
                b.foo();
            }
        }
    );

    define(function(require, fatory) {
        "use strict";
        return function(a, b) {
            return a * b;
        }
    });
    require(['./muti'], function(muti) {
        console.log('----', muti(12, 2));
    });
    ```

  - CMD
    - Common Module Definition
    - 一个文件一个模块
    - 使用define定义模块
    - 使用require加载模块
    - SeaJS
    - 尽可能懒执行

    ```javascript
    define(function(require, exports, module) {
        # 通过require引入依赖
        var $ = require('jquery');
        var Spinning = require('./spinning');
        // 通过exports对外提供接口
        exports.doSomething = ...;
        // 或则通过module.exports提供整个接口
        module.exports = ...;
    });
    ```

  - UMD
    - Universal Module Definition
    - 通用解决方案
    - 三个步骤(判断是否支持AMD,判断是否支持COMMONJS,如果没有使用全局变量)

    ```javascript
    (function(root, factory) {
        if(typeof define === 'function' && define.amd) {
            define([], factory);
        }else if(typeof exports === 'object') {
            module.exports = factory();
        }else{
            root.returnExports = factory();
        }
    }(this, function() {
        return {};
    }))
    ```

  - ES6 Modules
    - 一个文件一个模块
    - export/import

    ```javascript
    import React from 'react';
    import React, { PureComponent } from 'react';
    import { Action1, Action2 } from 'actionCreators';
    import {name1 as name2, name3} from 'name';
    import * as mylib from 'mylib';
    import './lib';
     
     export var a = 1;
     export default 3;
     export {a, b};
     export {a as a1, b};
     export * from './mylib';
    ```

### webpack支持
  - AMD(RequireJS)
  - ES Modules(推荐)
  - CommonJS

### CSS模块化发展史
  - OOCSS

  - SMACSS

  - Atomic CSS

  - MCSS

  - AMCSS

  - BEM

  - CSS Modules

### 在网页中引用常见的静态资源有哪些？

### 网页中引入的静态资源多了以后可能会存在什么问题？
1. 网页加载速度慢，因为，我们要发起很多二次请求
2. 要处理错综复杂的依赖关系

### 如何解决上述问题？
1. 合并、压缩、精灵图、图片的base64编码(适合小图片)
2. require.js或者webpack

### 什么是webpack？
1. webpack是前端的一个项目构建工具，它是基于Node.js开发出来的一个前端工具

### 如何完美的实现上述的两种解决方案？
1. 使用gulp，是基于task任务
2. 使用webpack，是基于整个项目构建的

### webpack安装的方式
1. 运行`npm i webpack -g`全局安装webpack，这样就能在全局中使用webpack命令
2. 在项目根目录中运行`npm i webpack --save-dev`安装到项目开发依赖中
3. webpack --config webpack.conf.dev.js
4. webpack-cli 
5. webpack --config webpack.conf.js 
6. webpack entry<entry> output

### npm安装第三方库
1. 运行`npm init -y`生成`package.json`文件
2. 运行`nmp i jquery -S`安装jquery第三方库

### webpack优势
1. webpack能够处理JS文件之间的相互依赖关系
2. webpack能够处理JS的兼容问题，把高级的、浏览器不能识别的语法转为低级的、浏览器能正常识别的语法。
3. 第一个webpack命令:`webpack 文件路径 -o 输出文件路径`

### 用webpack命令`webpack 文件路径 -o 输出文件路径`太过于累赘怎么办，怎么打包只需要输入命令`webpack`这个命令达到通用效果？
1. 首先，我们并没有通过webpack命令的形式，指定入口和出口
2. webpack会去项目的根目录中，查找一个叫做'webpack.config.js'的配置文件
3. 当找到配置文件后，webpack会去解析执行这个配置文件，当解析执行配置文件后，就得到了配置文件中导出的配置对象
4. 当webpack拿到配置对象后，就能拿到配置对象中指定的入口和出口，然后就行打包和构建。

### 使用`webpack-dev-server`这个工具，来实现自动打包编译功能
1. 运行命令`npm i webpack-dev-server -D`,吧这个工具安装到项目的本地开发环境
2. webpack-dev-server这个工具，如果想要正常运行，要求必须在本地项目中安装webpack、webpack-cli,运行命令`npm i webpack -D`
3. 如果实现以`webpack-dev-server`命令形式运行，必须将该命令配置在`package.json`的script属性中
4. webpack-dev-server帮我们打包生成的bundle.js文件，并没有存放到物理磁盘上，而是直接托管到电脑的内存中，所以，在我们的项目根目录根本找不到打包好的bundle.js文件,只是虚拟托管到了项目的根路径下，目的是加载速度快.(之前在dist目录下有bundle.js文件，现在没有了)
5. 此时访问的`bundle.js`文件路径为`localhost:8080/`,html访问路径为`localhost:8080/src/`

### 插件`html-webpack-plugin`作用:
1. 根据指定路径，在内存中生成指定文件名的对应页面
2. 自动把打包好的bundle.js加载到内存中生成的页面中

### webpack打包css文件
1. webpack默认只能打包js类型文件，无法处理其他非css类型文件
2. 如果要处理非js类型文件，我们需要手动安装第三方合适的loader
3. 打包css类型文件，需要安装`style-loader`和`css-loader`
4. 同时需要在webpack.config.js配置文件中module对象中配置好对应loader和加载规则
5. 特别注意: use数组中的`style-loader`和`css-loader`顺序不能乱，否则会报错
6. loader调用顺序是从后往前调用

### webpack打包less文件
1. 安装less-loader，同时由于内部依赖less，所以less也必须安装
2. webpack打包less，同时依赖style-loader/css-loader/less-loader三个loader

### webpack打包sass(scss)文件
1. 安装sass-loader,同时由于内部以来node-sass，所以node-sass也必须安装
2.webpack打包scss文件，同时依赖style-loader/css-loader/sass-loader

### webpack打包

### 安装bootstrap
1. `npm i bootstrap -S`

### babel
1. `npm i babel-core babel-loader babel-plugin-transform-runtime - D`
2. `npm i babel-preset-env babel-preset-stage-0 -D`
3. `.babelrc`文件为json格式，json文件格式规范，不能有注释，双引号
4. `npm i babel-loader@8.0.0-beta.0 @babel/core`
5. `npm i --save-dev babel-loader babel-core`
6. `npm i @babel/preset-env --save-dev`
7. `npm i babel-preset-env --save-dev`
8. `npm i babel-polyfill --save`    (全局垫片,为开发应用准备)
9.  `npm i babel-runtime --save`
9. `npm i babel-plugin-transform-runtime --save-dev`  (局部垫片,为框架准备)

### 编译typescript
  - `npm i typescript ts-loader --save-dev`
  - `npm i typescript awesome-typescript-loader --save-dev`
  - 配置
    - tsconfig.json
    - webpack.config.js
  - 申明文件
    - `npm install @types/lodash`
    - `npm install @types/vue`
    - `npm install typings`, `typings install lodash`