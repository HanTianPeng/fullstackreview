### 1. 偏函数
  在函数的调用现场，将实参应用于形参。

    ```
        // getOrder(data, callback)是ajax(url, data, callback)函数的偏函数
        function getOrder(data, callback){
            ajax('http://namibox.com/', data, callback);
        }
    ```