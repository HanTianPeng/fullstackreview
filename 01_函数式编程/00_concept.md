## 概念

### 1. Arity
  函数所需参数的个数

### 2. 偏应用函数
  通过预先填充原始函数的部分(不是全部)参数来创建一个新函数

    ```
        // 创建一个偏应用函数
        // 带一个函数参数和该函数的部分参数
        const partial = (fn, ...args) => 
          // 返回一个带有剩余参数的函数
          (...moreArgs) => 
            // 通过全部参数调用原始函数
            fn(, ...args, ...moreArgs); 
        
        // 原始函数
        const add = (a, b, c) =>  a + b + c

        // 偏应用`2`，`3`到add，给你一个单参数的函数
        const partialFn = partial(add, 2, 3);  // (c) => 2 + 3 + c
        partialFn(4);
    ```

### 3. Currying-柯里化
  将多个参数的函数(多元函数)转换为一元函数的过程；每当函数被调用时，它仅仅接收一个参数并且返回带有一个参数的函数，直到所有的参数传递完成。

    ```
      const sum = (a, b) => a + b;

      const curriedSum = (a) => (b) => a + b;

      curriedSum(10)(20);

      const curriedSumReturn = curriedSum(10);
      curriedSumReturn(20);
    ```

### 4. Auto Currying-自动柯里化
  将一个或多个参数的函数转换为一个参数的函数，如果给定的参数数量少于正确的参数数量，则返回一个函数，并且该函数获取其余的参数，当函数得到正确个数的参数时，它就会被调用。

    ```
      const add = (a) => (b) => a + b
      const autoCurried = _.curry(add)
      autoCurried(1, 2);  // 3
      autoCurried(1);  // (b) => 1 + b
    ```

### 4. Cloure-闭包
  闭包是访问其作用域之外的变量的一种方法；即闭包是一种用于实现词法作用域的命名绑定技术，它是一种用环境存储函数的方法。

### 5.Function Composition-函数合成
  将两个函数合成在一起构成第三个函数，其中一个函数的输出是另外一个函数的输入
  
    ```
      const compose = (f1, f2) => (val) => f1(f2(val));

      const floorAndToString = compose((val) => val.toString(), Math.floor)
      floorAndToString(239.938)  // '239'
    ```

### 6. Continuation
  在一个程序执行的任意时刻，尚未执行的代码称为**Continuation**；在异步编程中很常见，当程序需要等待接收数据才能继续执行，一旦接收到数据，请求响应数据通常会被传递给程序的剩余部分，这个剩余部分就是一个**Continuation**

    ```
      const printAsString = (num) => console.log('Given ${num}');

      const addOneAndContinuation = (num, fn) => {
        const result = num + 1;
        fn(result);
      }
      addOneAndContinuation(10, printAsString)  // Given 10
    ```  

### 7. Purity-纯函数
  如何返回值仅由其输入值决定，并且不产生副作用，那么这个函数就是**纯函数**

    ```
      const add = (a, b) => a + b
      add(1, 2);
    ```

    输出是基于函数外部数据
    ```
      window.name = 'conk'
      const add = () => name
      add();  // 'conk'
    ```

    修改了函数外部的状态
    ```
    let a

    const add = (b, c) => {
      a = b + c
    }
    add(1, 2);
    ``` 

### 8. Idempotent-幂等
  将一个函数重新应用其结果，如果产生的结果是相同的，那么该函数是幂等的

    ```
      Math.abs(Math.abs(10));
    ```