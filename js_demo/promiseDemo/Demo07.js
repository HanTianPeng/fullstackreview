/*
    目标：
        1. race():只要一个返回状态，就会执行后续处理
        2. 第一个Promise执行完后，并不会取消其他【Promise的执行
*/
var aPromise = new Promise((resolve, reject) =>{
    setTimeout(() => {
        console.log('this the aPromise');
        resolve('this aPromise');
    }, 10);
});

var bPromise = new Promise((resolve, reject) => {
    setTimeout(() =>{
        console.log('this the bPromise');
        resolve('this bPromise');
    }, 1000);
});

Promise.race([aPromise, bPromise]).then((value) =>{
    console.log('执行完毕====>', value);
}).catch((error) => {
    console.log('执行异常完毕===>', error);
});