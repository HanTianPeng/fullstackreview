## 动态作用域
  - 动态作用域是在运行时确定的(this就是),关注函数从何调用。

    ```js
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
      ```js
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
      ```js
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
      - **箭头函数**放弃了所有普通this绑定的规则，取而代之的是用当前的词法作用域覆盖了this本来的值。
      ```js
        var obj = {
          id: 'awesome',
          cool: function coolFn(){
            setTimeout(() => {
              console.log(this.id);
            }, 100);
          }
        };
        obj.cool();  // awesome
      ```

    - 解决方案==bind
      ```js
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

### 1. 默认绑定
  - 无法应用其他规则时候，使用默认规则，在**非严格模式**下，默认规则this绑定全局对象，在**严格模式**下，默认规则this绑定在undefined。

    - 非严格模式下

      ```js
        function test(){
          console.log(this.a);
        }
        var a = 2;
        test();  // 2
      ```
    
    - 严格模式下

      ```js
        function test(){
          "use strict";
          console.log(tis.a);
        }
        var a = 2;
        test();  // this is not undefined
      ```
### 2. 隐式绑定
  - 当函数引用有上下文对象时，隐式绑定规则会把函数调用中的this绑定到这个上下文对象中。

    ```js
      function test(){
        console.log(this.a);
      }
      var obj = {
        a: 20,
        test: test
      };
      obj.test();  // 20
    ```
  
  - 对象属性引用链只有最顶层或则说最后一层会影响调用位置。

    ```js
      function test(){
        console.log(this.a);
      }
      var obj = {
        a: 20,
        test: test
      };
      var obj2 = {
        a: 30,
        obj: obj
      };
      obj2.obj.test(); // 20
    ```
  
  - 隐式丢失，最后会采用默认绑定规则
    ```js
      function test(){
        console.log(this.a);
      }
      var obj = {
        a: 20,
        test: test
      };
      var a = 'global';
      var ttt = obj.test;
      ttt();  // global
    ```
  
  - 隐式丢失，回调函数
    ```js
      function test(){
        console.log(this.a);
      }
      var obj = {
        a: 20,
        test: test
      };
      function foo(fn){
        fn();
      }
      var a = 'global';
      foo(obj.test);  // global
    ```

  - 隐式丢失,内置函数
    ```js
      function test(){
        console.log(this.a);
      }
      var obj = {
        a: 20,
        test: test
      };
      var a = 'global'
      setTimeout(obj.test, 100);  // global

      // JS环境下内置的setTimeout()函数实现和下面的伪代码类似:
      function setTimeout(fn, delay){
        // 等待delay毫秒后
        fn();  // <----调用位置---->所以导致隐式丢失
      }
    ```

  - 间接引用
    ```js
    function foo(){
      console.log(this.a);
    }
    var a = 4;

    var obj = {
      a: 100,
      foo: foo
    };

    obj.foo();  // 100
    var objFoo = obj.foo;
    objFoo();  // 4

    /*
      fun.foo = obj.foo的返回值是目标函数的引用，所以调用位置是foo()而不是fun.foo()或则obj.foo()
    */
    var fun = {a: 200};
    (fun.foo = obj.foo)();  // 4
    ```

  - 隐式绑定的小测试

    ```js
    var num = 1;
    var myObject = {
        num: 2,
        add: function () {
            this.num = 3;  // 隐式绑定  修改myObject.num = 3
            (function () {
                // "use strict";
                console.log(num);  // 默认绑定 非严格模式: 输出1 
                console.log(this.num);  // 默认绑定  非严格模式: 输出1 严格模式: 报错
                this.num = 4;   // 默认绑定 修改window.num = 4;
            })();
            console.log(this.num);  // 隐式绑定 3
        },
        sub: function () {
            console.log(this.num);  
        }
    }
    myObject.add();
    console.log(myObject.num);
    console.log(num);
    var sub = myObject.sub;
    sub();  // 丢失隐式绑定 4
    ```

### 3. 显示绑定
  - JavaScript提供的绝大多数函数以及你自己创建的所有函数都可以使用call()和apply()方法。

    ```js
      function foo(){
        console.log(this.a);
      }
      var obj = {
        a: 20
      };
      foo.call(obj);  // 20
    ```
    - 如果你传入了一个原始值(字符串类型，布尔类型、数字类型)来当做this的绑定对象，这个原始值会被转换成它的对象形式(也就是new String()、new Number()、new Boolean())，这就是通常所称为**装箱**。

    - 显示绑定依然无法解决隐式绑定的丢失问题。

  - 硬绑定
    ```js
      function foo(){
        console.log(this.a);
      }
      var obj = {
        a: 20
      };
      var bar = function(){
        foo.call(obj);
      };
      bar();  // 2
      setTimeout(bar, 10);  // 2
      bar.call(window);  // 2
    ```
      - 强制将foo绑定在obj上，不管外部如何调用，内部总是foo被绑定在obj上，因此我们称之为**硬绑定**。

      - 硬绑定的典型场景就是创建一个包裹函数，传入所有参数并返回接收到的所有值。
        ```js
          function foo(something){
            console.log(this.a, something);
            return this.a + something;
          }
          var obj = {
            a: 20
          };
          var bar = function(){
            return foo.apply(obj, arguments);
          };
          var value = bar(10);  // 20 10
          console.log(value);  // 30
        ```
      
      - 硬绑定的第二种实现方式，创建一个通用的辅助函数。
        ```js
          function foo(something){
            console.log(this.a, something);
            return this.a + something;
          }
          var obj = {
            a: 20
          };

          // 创建一个辅助函数
          function bind(fn, object){
            return function(){
              return fn.apply(object, arguments);
            };
          }
          var bar = bind(foo, obj);
          var value = bar(10);  // 20 10
           console.log(value);  // 30
        ```

      - 硬绑定在ES5中实现Function.prototype.bind
        ```js
          function foo(something){
            console.log(this.a, something);
            return this.a + something;
          }
          var obj = {
            a: 20
          };
          var bar = foo.bind(obj);
          var value = bar(10);  // 20, 10
          console.log(value);  // 30
        ```

        - bind()会返回一个硬绑定的新函数，它会把参数设置为this的上下文并调用原始函数。

      - API调用的``上下文``
        - js许多内置函数提供了一个可选参数，被称为``上下文(context)``，其作用和bind()一样，确保回调函数使用指定的this。这些函数实际上通过call()和apply()实现了显示绑定
          ```js
          function foo(el){
            console.log(el + '----' + this.id);
          }

          var obj = {
            id: 'obj'
          };

          var arr = [1, 3, 5];
          arr.forEach(foo, obj);
          /*
            1----obj
            3----obj
            5----obj
          */
          ````

### 4. new绑定
  - 在JavaScript中，构造函数只是一些使用new操作符时被调用的函数，它们仅仅是被new操作符调用的普通函数而已。

  - 包括内置对象函数(比如Number())在内的所有函数都可以用new来调用，这种函数调用被称为``构造函数调用``

  - 实际上并不存在所谓的``构造函数``，只有对于函数的``构造调用``

  - new来调用函数，或者说发生构造函数调用时，会自动执行以下步骤

    - 创建或者构造一个全新的对象。

    - 实例对象的__ proto__被自动创建

    - 这个新对象会被执行原型连接。

    - 这个新对象绑定到函数调用的this。

    - 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回一个新对象。

  - new的小测试
    
    ```js
    /*
        使用new操作符调用构造函数，实际上经历了4步骤:
            创建一个新对象

            将构造函数的作用域给新对象(this指向了这个对象)

            执行构造函数中的代码

            返回新对象
    */
    var name = 'window';

    function Person(name){
        this.name = name;
        this.show1 = function (){
            console.log(this.name);
        };
        this.show2 = () => console.log(this.name);
        this.show3 = function (){
            return function(){
                console.log(this.name);
            };
        };
        this.show4 = function (){
            return () => console.log(this.name);
        }
    }

    var personA = new Person('personA');
    var personB = new Person('personB');

    personA.show1();  // personA  隐式调用，调用者personA
    personA.show1.call(personB);  // personB  显示绑定，调用者personB

    personA.show2();  // personA  首先，personA是new绑定，产生了新的构造函数作用域，然后箭头函数绑定，this指向外层作用域即personA函数作用域
    personA.show2.call(personB);  // personA 箭头函数指向父级作用域

    personA.show3()();  // window  默认绑定，调用者window
    personA.show3().call(personB);  // personB 显示绑定，调用者是personB
    personA.show3.call(personB)();  // window  默认绑定，调用者window

    personA.show4()();  // personA  箭头函数绑定， this指向父级作用域
    personA.show4().call(personB);  // personA  箭头函数绑定， this指向父级作用域
    personA.show4.call(personB)();  // personB  箭头函数绑定，this指向父级作用域
    ```

### 5. 判断this指向
  - 函数是否在new中被调用，如果是的话this绑定的是新创建的对象。

  - 函数是否通过call、apply(显示绑定)或者硬绑定(bind)调用，如果是的话，this绑定的是指定的对象。

  - 函数是否在某个上下文对象中调用(隐式绑定)，如果是的话，this绑定的是上下文对象。

  - 如果都不是，则是默认绑定，在严格模式下，绑定的是undefined；非严格模式下，绑定的是全局对象。

### 6. 特殊场景this指向
  - 使用**null**来忽略this的指向，通常将``null``或则``undefined``作为this的绑定对象传入call、apply或则bind，这些值在调用时会被忽略，实际应用的是默认绑定。
    ```js
      function foo(a,b){
        console.log('a: ' + a + ', ' + 'b: ' + b);
      }
      foo.apply(null, [2, 3]);  // a: 2, b: 3 

      # 使用bind进行柯里化
      var bar = foo.bind(null, 2);
      bar(3);  // a: 2, b: 3
    ```
      - 使用null来忽略this的指向，可能会产生**副作用**，在非严格模式下，this指向window。
    
  - 使用**Object.create(null)**来忽略this的指向
    ```js
      function foo(a, b){
        console.log('a: ' + a, + ', ' + 'b: ' + b);
      }
      var ø = Object.create(null);
      var bar = foo.bind(ø, 2);
      bar(3);  // a: 2, b: 3
    ```

### 7. 软绑定
  - 硬绑定可以把this强绑定到指定的对象(new除外)，防止函数调用默认绑定规则。但是会降低函数的灵活性，使用``硬绑定之后就无法使用隐式或则显示绑定来修改this``

  - 如果给默认绑定指定一个全局对象或则undefined以外的值，那就可以实现和硬绑定相同的效果，同时保留隐式绑定或者显示绑定修改this的能力

    ```js
    /*
    
    */
    if(!Function.prototype.softBind){
      Function.prototype.softBind = function(obj){
        var fn = this;
        // 不会所有curried参数
        var curried = [].slice.call(arguments, 1);
        var bound = function(){
          return fn.apply(
            (!this || this === (window || global)) ? obj : this,
            curried.concat.apply(curried, arguments)  // 有疑问???
          );
        };
        bound.prototype = Object.create(fn.prototype);
        return bound;
      }
    }

    function foo(){
      console.log('name:' + this.name);
    }

    var obj = {
      name: 'obj'
    },
    obj2 = {
      name: 'obj2'
    },
    obj3 = {
      name: 'obj3'
    };

    // 默认绑定
    var fooObj = foo.softBind(obj);
    fooObj();  // obj

    // 隐式绑定
    obj2.foo = foo.softBind(obj);
    obj2.foo();  // obj2

    // 显示绑定
    fooObj.call(obj3);  // obj3

    // 隐式丢失
    setTimeout(obj2.foo, 10);  // obj
    ```
  
### 7. ES6的箭头函数this指向
  - 箭头函数不适用this指向的四种规则，其根据外层(函数或则全局)作用域来决定this的指向。

  - 箭头函数不绑定this，箭头函数中的this相当于普通变量。

  - 箭头函数的this寻值行为与普通变量相同，在作用域中逐级寻找。

  - 箭头函数的this无法通过bind、call、apply来直接修改。

    ```js
      /*
       foo()内部创建的箭头函数会捕获调用时foo()的this。
        由于foo()的this绑定到obj1，bar(引用箭头函数)的this也会绑定到obj1
      */
      function foo(){
        return (a) => {
          console.log(this.a);
        };
      }
      var obj1 = {
        a: 2
      };
      var obj2 = {
        a: 3
      };
      var bar = foo.call(obj1);
      bar.call(obj2);  // 2

      function fooES5(){
        var self = this;
        setTimeout(function(){
          console.log(self.a);
        }, 1000);
      }
    ```

  - 改变作用域中this的指向可以改变箭头函数的this。

    ```js
    function foo(){
      name = 'foo';
      return () => (console.log(this.name));
    }

    var obj = {
      name: 'obj'
    };

    foo.bind(obj)()();  // obj
    ```

  - 箭头函数小测试
    ```js
    /*
        非严格模式
    */
    var name = 'window';
    var person1 = {
        name: "person1",
        show1: function(){
            console.log(this.name);
        },
        show2: () => console.log(this.name),
        show3: function(){
            return function(){
                console.log(this.name);
            };
        },
        show4: function(){
            return () => console.log(this.name);
        }
    };

    var person2 = {
        name: "person2"
    };

    person1.show1();  // person1  隐式绑定， this指向调用者
    person1.show1.call(person2);  // person2 显示绑定，this指向person2

    person1.show2();  // window  箭头函数绑定，this指向外层作用域，即全局作用域
    person1.show2.call(person2);  // window 箭头函数绑定，this指向外层作用域，即全局作用域

    person1.show3()();  // person1----window  默认绑定，这个是一个高阶函数，调用者是window
    person1.show3().call(person2);  // person2  显示绑定，this指向person2
    person1.show3.call(person2)();  // person2---window  默认绑定，调用者是window

    person1.show4()();  // person1  箭头函数绑定，this指向外层作用域，即person1函数作用域
    person1.show4().call(person2);  // person1  箭头函数绑定， 指向person1函数作用域
    person1.show4.call(person2)();  // person2  将show4的函数作用域显示绑定为person2，箭头函数绑定指向父级作用域
    ```