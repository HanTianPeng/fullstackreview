### 1. Javascript的7中内置类型
  - typeof查看类型，它返回的是类型的字符串值，但是不是一一对应的。
    - 空值 = null

    - 未定义 = undefined

    - 布尔值 = boolean

    - 数字 = number

    - 字符串 = string

    - 对象 = object

    - 符号 = symbol

  - typeof null返回值是object
    - 如何检测null
        ```
            var a = null;
            if(!a && typeof a === 'object'){
                console.log('a is null');
            }
        ```

  - typeof function fn(){}返回值是function
    - function(函数)也是JavaScript的一个内置类型，但是它实际上是object的一个子类型；具体来说，函数是**可调用对象**，它内部有一个属性[[call]]，该属性使其能够被调用。

    - 函数不仅是对象，还拥有属性 fn.length

  - typeof 数组返回值是object
    - 数组也是object的一个子类型。

  - typeof undeclared返回值是undefined
    - 好处就能能够检测全部变量，并且不报错
        ```
            // 不会报错
            if(typeof a !== 'undefined'){
                console.log('有变量a');
            }

            // 这种方式就容易报错
            if(a){
                console.log('有变量a');
            }

            // 不会报错, 弊端就是比如node.js服务器全局对象就不是window
            if(window.a){
                console.log('有变量a');
            }
        ```

### 2. 数组
  - delete运算符将元素从数组中删除，但是并不改变数组的length值
    ```
    var a = ['a', 'b', 'c'];
    delete a[0];
    a.length;  // 3
    ```

  - 如何字符串键能够被强制类型转换成十进制数字，会被当做数组的索引来处理
    ```
    var a = [];
    a['4'] = 'a';
    a.length;  // 5
    ```

  - 稀疏数组
    - 显示赋值a[1]=undefined还是有区别与稀疏数组
      ```
      var a = [];
      a[0] = 1;
      a[2] = 3;
      a.length;  // 3
      a[1]; // undefined
      ```