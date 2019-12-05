### React生态圈
  
  - JSX: 扩展的JS，React强依赖

    - JavaScript + XML

    - 自定义组件，首字母一定要大写，小写字母，为html语言

    ```js
    <ul className="my-list">
      <li>hello python</li>
      <li>hello world</li>
    </ul>

    var childLi1 = React.createElement('li', null, 'hello python');
    var childLi2 = React.createElement('li', null, 'hello world');
    var root = React.createElement('ul', {className: 'my-list'}, childLi1, childLi2);
    ```

  - 生命周期

    - Initialization: 初始化阶段

    - Mounting: 挂载阶段

      - componentWillMount: 在组件即将被挂载到页面的时刻执行

      - render: 页面state或props发生变化时执行

      - componentDidMount: 组件挂载完成时被执行

      ```js
      // componentWillMount 和 componentDidMount 这两个生命周期函数，只在页面刷新时执行一次，而render函数是只要state和props变化就会执行
      ```

    - Updation: 更新阶段

      - componentWillReceiveProps

      - shouldComponentUpdate: 会在组件更新之前，自动被执行。

        - 该函数要求返回一个布尔类型的结果，必须有返回值；简单讲：返回false，组件不会进行更新；返回true，则同意组件更新

      - componentWillUpdate: 在组件更新之前，但 shouldComponentUpdate之后被执行。但是 shouldComponentUpdate返回false，则这个函数就不会被执行

      - componentDidUpdate: 在组件更新之后执行，它是组件更新的最后一个环节

      ```js
      /* 执行顺序:
        1. shouldComponentUpdate

        2. componentWillUpdate

        3. render

        4. componentDidUpdate

      */
      ```

    - Unmounting: 销毁阶段

      - componentWillUnmount: 组件从页面中删除的时候执行



  - Flux

  - Redux

  - React-Native: 开发移动应用

  - React-Server

### React属性与事件

  - State属性，控制着React的一切

  - Props属性

  - 事件与数据的双向绑定，包含了父子页面之间的参数互传

  - 可复用组件，真正让React开发快速、高效的地方

  - 组件的Refs

  - 独立组件间共享Mixins


### React样式

  - 内联样式

  - 内联样式中的表达式

  - CSS模块化，学习如何使用require进行样式的引用

  - JSX样式与CSS的互转

  - 一个非常好用的样式框架 ``Ant Design`` 样式框架介绍

  - ``Ant Design``样式框架的使用


### React Router
  
  - Router概念

  - Router参数传递


### 项目实战部分

  - 开发环境的初始化

  - logo的选择

  - 样式库的选择

  - 数据接口API的定义

  - 页头页脚的响应式开发

  - 登录注册模块

  - 首页列表详情模块

  - 评论收藏模块

  - 个人中心的实现


### 开发中遇到的问题

  - 环境搭建

    - 第一步: 安装node ``node -v``

    - 第二步: 安装npm ``npm -v``

    - 第三步: 安装脚手架 ``create-react-app``

      - ``npm install -g create-reate-app``

    - 第四步: 利用脚手架 ``create-react-app`` 创建工程

      - ``create-react-app my-app``

      - 另外一种简洁方式

        - ``npx create-react-app my-app``  安装 ``create-react-app`` 脚手架 并 创建工程

    - 第五步: 启动工程

      - ``npm start``

    - ``PWA``与移动端开发、serverWorker.js，相当于有了离线浏览的功能

  - ``Eslint检测ES6规范配置``

    - 派生类相关

      - 1.构造函数必须调用super

        - 'constructor-super': 'error'

          ```js
          // 派生类中构造函数必须调用，非派生类的构造函数必能调用super()
          class A {
            constructor() {
              
            }
          }
          class A extends B {
            constructor() {
              super();
            }
          }
          ```

      - 2.禁止不必要的构造函数

        - 'no-useless-constructor': 'error'

          ```js
          class A {
            constructor (){
              doSomething();
            }
          }

          // 如果没有特别的逻辑，则类返回空即可
          class A {

          }
          ```

      - 3.派生类函数构造器禁止在super()之前使用this

        - 'no-this-before-super': 'error'

          ```js
          // 否则会返回引用错误(reference error)
          class A extends B {
            constructor() {
              super();
              this.a = 'hello' ; // OK, this is after 'super()'
            }
          }
          ```

  
  - ``no-useless-constructor`` 禁止不必要的构造函数

    - 构造器里面一定要有执行的逻辑代码，如果没有特别的逻辑，则类返回空即可



  


  
