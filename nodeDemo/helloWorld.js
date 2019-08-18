'use strict';
var terPrint = 'Hello World';

function helloFunc(){
    console.log(terPrint + '=====');
}

module.exports = helloFunc;

/*
node应用由模块组成，采用CommonJS模块规范：
    每个文件就是一个模块，有自己的作用域。在一个文件中定义的变量、函数、类，都是私有的，对其他文件不可见。
    如果想要多个文件分享变量，必须定义为global对象的属性。

CommonJS模块的特点：
    所有代码都运行在模块作用域，不会污染全局作用域。
    模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
    模块加载的顺序，按照其在代码中出现的顺序。

AMD规范与CommonJS规范：
    CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD规范则是非同步加载模块，允许指定回调函数。
    由于Node.js主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以CommonJS规范比较适用。
    但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用AMD规范

node导包两种方式以及错误方式
    // 第一种写法
    module.exports = {
        helloFunc: helloFunc
    };

    // 第二种写法---由于默认情况下，Node准备的exports变量和module.exports变量实际上是同一个变量，并且初始化为空对象{}
    // 因此，为了方便，Node为每个模块提供一个exports变量，指向module.exports.这等同于在每个模块头部，有一行这样命令：var exports = module.exports;
    exports.helloFunc = helloFunc;

    // 错误写法  // 因为这样等同于切断了exports与module.exports之前的关系
    exports = {
        helloFunc: helloFunc
    };

    // 错误写法  // hello无法对外输出接口,因为module.exports被重新赋值，且对外输出接口为一个值，所以此时exports = module.exports,的exports为一个值，无法绑定hello属性.
    exports.hello = function(){
        console.log('hello world');
    };
    module.exports = 'hello world';
*/

/*
node导包底层实现基本原理：
    // 准备module对象---变量module是Node在加载js文件前准备的一个变量，并将其传入加载函数
    var module = {
        id: 'helloWorld',
        exports: {

        }
    }

    // 通过把参数module传递给load()函数，helloWorld.js就顺利地把一个变量传递给了Node执行环境，Node会把module变量保存到某个地方
    var load = function (module){
        // 读取helloWorld.js代码
        function helloFunc(){
            console.log(terPrint + '=====');
        }

        module.exports = helloFunc;
        return module.exports;
    };

    var exported = load(module);
    // 保存module---由于Node保存了所有导入的module，当我们用require()获取module时，把这个module的exports变量返回，这样另外一个模块就顺利拿到了模块的输出。
    save(module, exported);
*/
