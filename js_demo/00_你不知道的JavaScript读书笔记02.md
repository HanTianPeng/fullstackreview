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

  - 类数组
    - 通过工具函数slice()/from()转换为数组
      ```
      function fn(){
        var newArray = Array.prototype.slice.call(arguments);
        var newArray2 = Array.from(arguments);
        return newArray;
      }
      fn(1, 2, 3);
      ```

### 3. 字符串
  - 字符串通过索引获取元素并非总是合法语法，在老版本ie中就是不支持的，可以使用charAt()
    ```
    var a = 'conk';
    a[0];  // c 注意: 在老版本ie浏览器，该语法会报错
    ```
  
  - 字符串不可变: 字符串的成员函数不会改变其原始值，而是创建并返回一个新的字符串
    ```
    var a = 'conk';
    var b = a.toUpperCase();
    a;  // conk
    b;  // CONK
    ```
  
  - 字符串没有一些函数，但是可以借助数组一些函数来处理字符串
    ```
    a.join;  // undefined
    a.map;  // undefined
    Array.prototype.join.call('conk', '-');  // c-o-n-k
    Array.prototype.map.call('conk', function(v){
        return v.toUpperCase();
      }
    ).join('-');  // C-O-N-K
    ```

  - 字符串无法借用数组的成员函数处理
    ```
    var c = 'conk'.split('').reverse().join('');  // knoc
    ```

### 4. 数字
  - 数字值可以使用Number对象进行封装
    ```
    var a = 45;
    var b = a.toFixed(3);
    typeof b;  // string
    b;  // '45.000'
    ```
  
  - 浮点数相加问题
    ```
    0.1 + 0.2 === 0.3;  // false

    // polyfill
    if(!Number.EPSILON){
      Number.EPSILON = Math.pow(2, -52);
    }

    function fixEqual(num1, num2){
      return Math.abs(num1 - num2) < Number.EPSILON;
    }
    fixEqual(0.1+0.2, 0.3);  // true
    ```

  - 整数检测
    ```
    // es6语法
    Number.isInteger(4);  // true
    Number.isInteger(4.0);  // true
    Number.isInteger(4.1);  // false

    // polyfill
    if(!Number.isInteger){
      Number.isInteger = function(num){
        return typeof num === 'number' && num % 1 === 0;
      }
    }
    ```

### 5. undefined
  - void 运算符作用
    ```
    function fn(){
      return void console.log('conk');
    }
    ```