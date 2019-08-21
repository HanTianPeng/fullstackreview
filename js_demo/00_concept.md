## 作用域概念
  - 存储变量当中的值，并且能在之后对这个值进行访问或者修改。

### 1. 编译原理
  &nbsp;JavaScript归类为**动态**或**解释执行**语言，但事实上，它是一门**编译语言**。但与传统的编译语言不相同，它**不是提前编译**的，编译结果也不能在分布式系统进行移植。对于JavaScript来说，大部分情况下编译发生在代码执行前的几微秒(甚至更短)的时间内。

### 2. 编译步骤
  1. 分词/词法分析(Tokenizing/Lexing): 将由字符串组成的字符串分解成(对编程语言来说)有意义的代码块，这些代码块被称为词法单元(token)。

  2. 解析/语法分析(Parsing): 将词法单元流(数组)转换成一个由元素逐级嵌套所组成的代表了程序语法结果的树。这个数被称为**抽象语法树(Abstract Syntax Tree, AST)**
  
  3. 代码生成: 将AST转换为可执行代码的过程被称为代码生成。这个过程与语言、目标平台等息息相关。

    - 备注: 

    - JavaScript引擎不会有大量的(像其他语言编译器那么多的)时间来进行优化，因为与其他语言不通，JavaScript的**编译过程不是发生在构建之前的**。

    - 对于JavaScript来说，大部分情况下，编译发生在代码执行前的几微秒(甚至更短)的时间内。

### 3. 三大角色
  1. 引擎: 从头到尾负责整个JavaScript程序的编译及执行过程。

  2. 编译器：负责语法分析及代码生成等脏活累活。

  3. 作用域：负责收集并维护有所有申明的标识符(变量)组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限。

    - 申明在编译阶段进行，赋值会在执行阶段进行。

    - 变量的赋值操作会执行两个动作，首先编译器会在当前作用域中申明一个变量(如果之前没有申明过)，然后再运行时引擎会在作用域中查找该变量，如果能够找到就会对它赋值。

    - 编译器在编译过程的第二步中生成了代码，引擎执行它时，会通过查找变量a来判断它是否已申明过。查找过程由作用域进行协助，但是引擎执行怎样的查找，会影响最终的查找结果。
 
    - RHS: 简单查找某个变量的值。不成功的RHS引用会导致抛出ReferenceError异常。
      
      - retrieve his source value(取到它的源值)

    - LHS: 找到变量的容器本身，从而可以对其进行赋值。已成功的LHS引用会导致自动隐式创建一个全局变量(非严格模式下),该变量使用LHS引用的目标作为标识符，或者抛出ReferenceError异常(严格模式下)。

      - a = 2; // 只关心变量的容器本身，并不关心当前的值是什么

    - 案例
      ```
        function foo(a) {
            var b = a;
            return a + b;
        }
        var c = foo(2);
        # 所有LHS查询(3处): c = ..; a = 2(隐式变量分配) b = ..
        # 所有RHS查询(4处): foo(2) a; a b
      ```

### 4.var a=2;过程解析
  - 首先，var a在其作用域中申明新变量。这会在最开始的阶段，也就是代码执行前进行。

  - 接下来，a = 2会查询(LHS查询)变量a并对其进行赋值，这个赋值申明会被留在原地等待执行阶段。

### 5. foo(); function foo(){console.log('a');};过程解析
  - 首先， function foo(){console.log('a');};在其作用域中申明变量，这会在最开始的阶段，也就是代码执行前进行。

  - 接下来，foo();会进行查询(RHS查询)并发现为函数，进行调用执行。

### 6.异常(区分LHS和RHS重要性)

```
  function foo(){
    console.log(a + b);
    b =a ;
  }
  foo(2);
```
  - RHS查询，在所有嵌套的作用域中遍寻不到所需的变量，引擎会抛出ReferenceError异常

  - LHS查询，在**非严格模式下**,如果在全局作用域中也无法找到目标变量，全局作用域中就会创建一个具有该名称的变量，并将其返还给引擎；在**严格模式下**，同RHS抛出一样异常

## 词法作用域
  &nbsp;是一套关于引擎如何寻找变量以及会在何处找到变量的规则。词法作用域最重要的特征是它的定义过程发生在代码的书写阶段(假设你没有使用eval()或者with)。

  - 词法作用域意味着作用域由书写代码时函数申明的位置来决定的。编译的词法分析阶段基本能够知道全部标识符在哪里以及是如何申明的，从而能够预测在执行过程中如何对它们进行查找。


### 1. 词法阶段
  1. 作用域气泡案例：

    ```
        function foo(a) {
            var b = a * 2;
            function bar(c) {
                console.log(a, b, c);
            }

            bar(b * 3);
        }

        foo(2); 
    ```
      - 这个案例中含有是哪些逐级嵌套的作用域

        1. 包含着整个全局作用域，其中只有一个标识符: foo;

        2. 包含着foo所创建的作用域，其中有三个标识符: a, bar, b；

        3. 包含着bar所创建的作用域，其中只有一个标识符: c。 
  
  2. 无论函数在哪里被调用，也无论它如何被调用，它的词法作用域都只由函数被申明时所处的位置决定。
  
### 2. 欺骗词法

  1. eval案例:
    
    ```
        function foo(str, a) {
            eval(str);  // 欺骗
            console.log(a, b);
        }
        var b = 2;
        foo("var b = 3;", 1);  // 1, 3
    ```
      - 在非严格模式下，会导致foo(..)的词法作用域进行了修改。这段代码实际上在foo(..)内部创建一个变量b，并遮蔽了外部(全局)作用域中的同名变量。

      - 在严格模式下，eval(..)在运行时有其自己的词法作用域，意味着其中的申明无法修改所在的作用域。因此会抛出ReferenceError异常。

      - setTimeout()第一个参数、setInterval()第一个参数、new Function()最后一个参数 均不建议使用。

  2. with案例:
    
    ```
        function foo(obj) {
            with (obj) {
                a = 2;
            }
        }
        var o1 = {
            a: 3
        };
        var o2 = {
            b: 3
        } 
        foo(o1);
        console.log(o1.2);  // 2

        foo(o2);  
        console.log(o2.a);  // undefined
        console.log(a);  // 2-------不好，a被泄露到全局作用域上了
    ```
      - 当我们将o1传递进去，此时with所申明的作用域为o1，而这个作用域中含有一个同o1.a属性相符的标识符，a = 2赋值操作找到了o1.a并将2赋值给它。

      - 当我们将o2传递进去，此时with所申明的作用域为o2，而这个作用域中没有找到标识符o2.a，o2并没有a属性，因此不会创建这个属性，o2.a保持undefined；因此当a = 2执行时，自动创建了一个全局变量(非严格模式LHS)。

## 函数作用域
  - 属于这个函数的全部变量都可以在整个函数的范围内使用及复用(事实上在嵌套的作用域中也可以使用)。

### 1.立即执行函数表达式(Immediately Invoked Function Expression)
  - 由于函数被包含在一堆()括号内部，因此成为了一个表达式。

  - foo被绑定在函数表达式自身的函数中，而不是所在的作用域中。

  - 函数表达式可以是匿名的，函数申明不可以省略函数名。

  - 匿名函数缺点:
    - 匿名函数在栈追踪中不会显示出有意义的函数名，使得调试很困难。

    - 如果没有函数名，当函数需要引用自身时只能使用已经过时的arguments.callee引用。

    - 匿名函数省略了对于代码可读性/可理解性很重要的函数名。

    - 始终给函数表达式命名是一个最佳的实践。
  ```
    var a = 2;

    (function foo() {
      var a = 3;
      console.log(a);  // 3
    })();  // 立即执行函数表达式第一种写法

    (function foo(){
      var a = 3;
      console.log(a);
    }());  // 立即执行函数表达式第二种写法
    console.log(a);  // 2
  ```

### 2. 立即执行函数表达式进阶写法
```
  var a = 2;
  (function foo(global){
    var a = 3;
    console.log(a);  // 3
    console.log(global.a); // 2
  })(window);
```

## 块级作用域
  - 

### 1. try/catch
    ```
      try{
        undefined();  // 执行一个非法操作来强制制造一个异常
      }
      catch(error){
        console.log(error);  // 能够正常执行
      }
      console.log(error);  // ReferenceError: err not found
    ```

### 2. with
  - with从对象中创建出的作用域仅在with申明中而非外部作用域中有效。

### 3. let
  - 

### 4. const
  -

## 提升
  - 任何申明在某个作用域内的变量，都将附属于这个作用域。

### 1.函数优先
  - 函数申明和变量申明都会被提升，但是如果同时存在，**函数会首先被提升**，然后才是变量。

  - 尽管重复的val申明会被忽略掉，但出现在后面的函数申明还是可以覆盖前面的。

  - 尽可能避免在块内部申明函数。

  - 无论作用域中的申明出现在申明地方，都将在代码本身被执行之前首先进行处理，可以将这个过程形象地想象成所有的申明(变量和函数)都会被'移动'到各自作用域的最顶端,这个过程被称为**提升**。

  - 案例：
    ```
      foo();  // 1
      
      var foo;

      function foo() {
        console.log(1);
      }

      foo = function() {
        console.log(2);
      }

    - 这段代码，会被引擎理解为如下形式:

     function foo() {
       console.log(1);
     }

     foo();  // 1

     foo = function() {
       console.log(2);
     }
    ``` 
  
  - 案例2:
    ```
      foo();  // b
      var a = true;
      if(){
        function foo(){
          console.log('a');
        }
      }else{
        function foo(){
          console.log('b');
        }
      }
    ```

## 作用域闭包
  &nbsp;当函数可以记住并访问所在的词法作用域，即使函数是在当前词法作用域之外执行，这时就产生了**闭包**。

### 1. 闭包案例
  - 在foo()执行后，通常会期待foo()的整个内部作用域都被销毁，因为我们知道引擎有垃圾回收器用来释放不再使用的内存空间。然后，闭包可以阻止该事件发生,使其内部作用域依然存在，因此没有被回收。
    ```
      function foo(){
        var a = 2;
        function bar(){
          console.log(a);
        }
        return bar;
      }
      var newBar = foo();
      newBar();  // 2
    ```

  - 无论使用何种方式对函数类型的值进行传递，当函数在别处被调用时都可以观察到闭包。
    ```
      function foo(){
        var a = 2;
        function bar(){
          console.log(a);
        }
        baz(bar);
      }
      function baz(fn){
        fn();  // 2
      }
    ```

  - 通过间接的方式传递函数
    ```
      var fn;
      function foo(){
        var a = 2;
        function bar(){
          console.log(a);
        }
        fn = bar;
      }
      function baz(){
        fn(); // 2
      }
      foo();
      bar();
    ```

### 2. 定时器闭包
  - 内置的工具函数setTimeout()的回调函数，其所引用的函数就是一个闭包。

    ```
      function wait(msg){
        setTimeout(function timer(){
          console.log(msg);
        });
      }
      wait('hello world');
    ```

  - 闭包解决for循环问题

  ```
    for(var i=0; i<=5; i++>){
      (function(j){
        setTimeout(function timer(){
          console.log(j);
        }, 0);
      })(i);
    } // 如果没有闭包，则输出的一直为6
  ```

## 动态作用域
  - 动态作用域是在运行时确定的(this就是),关注函数从何调用。

    ```
      function foo() {
        console.log(a); // 3(而不是2)
      }

      function bar() {
        var a = 3;
        foo();
      }

      var a = 2;
      bar();
    ```
  
  - this词法

    - setTimeout导致函数与this之前的绑定丢失
      ```
        var obj = {
          id: 'awesome',
          cool: function coolFn(){
            console.log(this.id);
          }
        };
        var id = 'not awesome';
        obj.cool();  // awesome
        setTimeout(obj.cool, 100);  // not awesome
      ```
    
    - 解决方案==申明变量
      ```
        var obj = {
          id: 'awesome',
          cool: function coolFn(){
            var self = this,
            setTimeout(function timer(){
              console.log(self.id);
            }, 100);
          }
        };
        obj.cool();  // awesome
      ```
    
    - 解决方案==箭头函数
      ```
        var obj = {
          id: 'awesome',
          cool: function coolFn(){
            setTimeout(() => {
              console.log(this.id);
            }, 100);
          }
        };
        obj.cool();  // awesome
        
        **箭头函数**放弃了所有普通this绑定的规则，取而代之的是用当前的词法作用域覆盖了this本来的值。
      ```

    - 解决方案==bind
      ```
        var obj = {
          id: 'awesome',
          cool: function coolFn(){
            setTimeout(function timer(){
              console.log(this.id);
            }.bind(this), 100);
          }
        };
        obj.cool();  // awesome
      ```

## this理解
  - 当一个函数被调用时，会创建一个活动记录(有时候也被称为执行上下文)。这个记录会包含函数在哪里被调用(调用栈)、函数的调用方式、传入的参数等信息。this就是记录的其中一个属性，会在函数执行的过程中用到。


