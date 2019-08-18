/*
    目标：
        1. 明白then与catch之间区别
        2. .catch可以理解为promise.then(undefined, onRejected);,但是then方法中onRejected不会处理第一个参数产生的异常
        3. 使用promise.then(onFullfilled, onRejected)时候，如果在onFullfilled中发生异常的话，在onRejected中是捕获不到这个异常的。
        4. 使用promise.then(onFullfilled).catch(onRejcted)时候，then在onFullfilled中发生异常的话，在.catch中是可以捕获该异常的
*/
function throwError(value){
    throw new Error(value);
}

function badMain(obRejected){
    return Promise.resolve(42).then(throwError, obRejected);
}

function goodMain(obRejected){
    return Promise.resolve(42).then(throwError).catch(obRejected);
}

badMain((value) => {
    console.log('badMain====>', value);
});  // 无法捕捉到then方法中onFullfilled状态发生的错误

goodMain((value) => {
    console.log('goodMain===>', value);
});

/*
 .then和.catch都会创建并返回一个新的promise对象。Promise实际上每次在方法链中增加一次处理的时候所操作的都不是完全相同的promise对象。
*/
