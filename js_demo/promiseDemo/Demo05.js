/*
 目标：
    1. 每次调用then都会返回一个新创建的promise对象
    2. then的错误使用方式

*/

// 每次调用then都会返回一个新创建的promise对象,与之前的promise对象互不相同
var aPromise = new Promise(function(resolve, reject){
    resolve(100);
});
var thenPromise =  aPromise.then(function(value){
    console.log(value);
});
var catchPromise = thenPromise.catch(function(error){
    console.error(error);
});
console.log(aPromise !== thenPromise);  // true
console.log(thenPromise !== catchPromise);  // true

// then的使用方式不一样
var bPromise = new Promise((resolve, reject) => {
    resolve(100);
});
bPromise.then((value) => {
    return value * 2;
});
bPromise.then((value) => {
    return value * 3;
});
bPromise.then((value) => {
    console.log('bPromise:====>', value);
});

var cPromise = new Promise((resolve, reject) => {
    resolve(100);
});
cPromise.then((value) => {
    return value * 2;
}).then((value) => {
    return value * 3;
}).then((value) => {
    console.log('cPromise:====>', value);
});

// 1.promise.then中产生的异常不会被外部捕获。2.也无法得到then的返回值
function thenErrorUser(){
    var promise = Promise.resolve();
    promise.then(() => {
        return 1000;
    });
    return promise;
}