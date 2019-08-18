## 在网页中引用常见的静态资源有哪些？

## 网页中引入的静态资源多了以后可能会存在什么问题？
1. 网页加载速度慢，因为，我们要发起很多二次请求
2. 要处理错综复杂的依赖关系

## 如何解决上述问题？
1. 合并、压缩、精灵图、图片的base64编码(适合小图片)
2. require.js或者webpack

## 什么是webpack？
1. webpack是前端的一个项目构建工具，它是基于Node.js开发出来的一个前端工具

## 如何完美的实现上述的两种解决方案？
1. 使用gulp，是基于task任务
2. 使用webpack，是基于整个项目构建的

## webpack安装的方式
1. 运行`npm i webpack -g`全局安装webpack，这样就能在全局中使用webpack命令
2. 在项目根目录中运行`npm i webpack --save-dev`安装到项目开发依赖中

## npm安装第三方库
1. 运行`npm init -y`生成`package.json`文件
2. 运行`nmp i jquery -S`安装jquery第三方库

## webpack优势
1. webpack能够处理JS文件之间的相互依赖关系
2. webpack能够处理JS的兼容问题，把高级的、浏览器不能识别的语法转为低级的、浏览器能正常识别的语法。
3. 第一个webpack命令:`webpack 文件路径 -o 输出文件路径`

## 用webpack命令`webpack 文件路径 -o 输出文件路径`太过于累赘怎么办，怎么打包只需要输入命令`webpack`这个命令达到通用效果？
1. 首先，我们并没有通过webpack命令的形式，指定入口和出口
2. webpack会去项目的根目录中，查找一个叫做'webpack.config.js'的配置文件
3. 当找到配置文件后，webpack会去解析执行这个配置文件，当解析执行配置文件后，就得到了配置文件中导出的配置对象
4. 当webpack拿到配置对象后，就能拿到配置对象中指定的入口和出口，然后就行打包和构建。

## 使用`webpack-dev-server`这个工具，来实现自动打包编译功能
1. 运行命令`npm i webpack-dev-server -D`,吧这个工具安装到项目的本地开发环境
2. webpack-dev-server这个工具，如果想要正常运行，要求必须在本地项目中安装webpack、webpack-cli,运行命令`npm i webpack -D`
3. 如果实现以`webpack-dev-server`命令形式运行，必须将该命令配置在`package.json`的script属性中
4. webpack-dev-server帮我们打包生成的bundle.js文件，并没有存放到物理磁盘上，而是直接托管到电脑的内存中，所以，在我们的项目根目录根本找不到打包好的bundle.js文件,只是虚拟托管到了项目的根路径下，目的是加载速度快.(之前在dist目录下有bundle.js文件，现在没有了)
5. 此时访问的`bundle.js`文件路径为`localhost:8080/`,html访问路径为`localhost:8080/src/`

## 插件`html-webpack-plugin`作用:
1. 根据指定路径，在内存中生成指定文件名的对应页面
2. 自动把打包好的bundle.js加载到内存中生成的页面中

## webpack打包css文件
1. webpack默认只能打包js类型文件，无法处理其他非css类型文件
2. 如果要处理非js类型文件，我们需要手动安装第三方合适的loader
3. 打包css类型文件，需要安装`style-loader`和`css-loader`
4. 同时需要在webpack.config.js配置文件中module对象中配置好对应loader和加载规则
5. 特别注意: use数组中的`style-loader`和`css-loader`顺序不能乱，否则会报错
6. loader调用顺序是从后往前调用

## webpack打包less文件
1. 安装less-loader，同时由于内部依赖less，所以less也必须安装
2. webpack打包less，同时依赖style-loader/css-loader/less-loader三个loader

## webpack打包sass(scss)文件
1. 安装sass-loader,同时由于内部以来node-sass，所以node-sass也必须安装
2.webpack打包scss文件，同时依赖style-loader/css-loader/sass-loader

## webpack打包

## 安装bootstrap
1. `npm i bootstrap -S`

## babel
1. `npm i babel-core babel-loader babel-plugin-transform-runtime - D`
2. `npm i babel-preset-env babel-preset-stage-0 -D`
3. `.babelrc`文件为json格式，json文件格式规范，不能有注释，双引号