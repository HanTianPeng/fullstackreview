var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter(); // 类似于'消息中心'
/*
emitter.on('someEvent', function(){
    console.log('the someEvent has occured');
});

function test(){
    console.log('======start=====');
    emitter.emit('someEvent');
    console.log('======start=====');
}
test();
// 执行结果：
//     ======start=====
//     the someEvent has occured
//     ======end=====
// 结论：
//     EventEmitter对象的事件触发和监听是同步的，即只有事件的回调函数执行以后，函数test才会继续执行
*/


/*
// 通过继承EventEmitter
function Dog(name){
    this.name = name;
}
Dog.prototype.__proto__ = EventEmitter.prototype;
// 另外一种写法
// Dog.prototype = Object.Create(EventEmitter.prototype);
var dog = new Dog('dog');
dog.on('bark', function(){
    console.log(this.name + 'barked');
});

setInterval(function(){
    dog.emit('bark');
}, 500);
*/


/*
// once(name, function)：与on方法类似，但是监听函数function是一次性的，使用后自动移除
emitter.once('onceTest',(msg) => {
    console.log('the onceTest has occured ' + msg);
});

emitter.emit('onceTest', 'First');
emitter.emit('onceTest', 'Second');
emitter.emit('onceTest', 'third');
*/


/*
// removeListener(name, function): 移除回调函数，第一个是事件名称，第二个是回调函数名称，回调函数不能是匿名函数
// 匿名函数
emitter.on('removeListenerEvent', () => {
    console.log('the removeListenerEvent has occured');
});

setInterval(() => {
    emitter.emit('removeListenerEvent');
}, 300);

setTimeout(() => {
    emitter.removeListener('removeListenerEvent', () => {
        console.log('the removeListenerEvent has occured');
    }, 1000);
});

// 非匿名函数
function test2(){
    console.log('----test2----');
};
emitter.on('removeListenerEventFunc', test2);
setInterval(() => {
    emitter.emit('removeListenerEventFunc');
}, 300);
setTimeout(() => {
    emitter.removeListener('removeListenerEventFunc', test2);
}, 1000);

// 使用removeListener实现once机制
function onlyOnce(){
    console.log('-----only for once-----');
    emitter.removeListener('onlyOnceEvent', onlyOnce);
};
emitter.on('onlyOnceEvent', onlyOnce);
setInterval(() => {
    emitter.emit('onlyOnceEvent');
});
*/

/*
// setMaxListeners(): 指定多个回调函数限制，必须放在EventEmitter实例化后立马限制，否则无效。结果如果超出最大限制数量，会发出警告.
// emitter.setMaxListeners(1);
emitter.on('theSameEvent', () => {
    console.log('----1----');
});

emitter.on('theSameEvent', () => {
    console.log('---2-----');
});

emitter.on('theSameEvent', () => {
    console.log('---3------');
});

// listeners(name): 返回该事件所有的回调函数构成的数组
console.log('--移除前---查询该事件所有的回调函数---', emitter.listeners('theSameEvent'));
setInterval(() => {
    emitter.emit('theSameEvent');
}, 200);

// removeAllListeners('name'): 移除该事件的所有回调函数
// removeAllListeners(): 移除所有事件的所有回调函数
// 1分钟后移除theSameEvent事件的所有回调函数
setTimeout(() => {
    emitter.removeAllListeners('theSameEvent');
    console.log('--移除后--查询该事件所有的回调函数--', emitter.listeners('theSameEvent'));
}, 1000);
*/


/*
// try{}catch(){}: 
emitter.on('beep', () => {
    console.log('beep before error');
});

emitter.on('beep', () => {
    throw Error('Beep Error');
});

// 一旦被捕获，该事件后面的监听函数都不会执行
emitter.on('beep', () => {
    console.log('beep after error');
});
function closeEverything(f){
    console.log('111');
    f('33333333');
}
process.on('uncaughtException', (err) => {
    console.error('uncaught exception:', err.stack || err, '------------');
    // 关闭资源
    closeEverything(function(param){
        console.log('------------------------', param);
        if(err){
            console.error('Error while closing everything:', err.stack || err);
        }
        // 退出进程
        process.exit(1);
    });
});
emitter.emit('beep');

console.log('before emit');
try{
    emitter.emit('beep');
}catch(error){
    console.log('beep has occured error for ' + error.message);
}
console.log('after emit');
*/


/*
// Events模块默认支持两个事件
// newListener: 添加新的回调函数时候触发
// removeListener: 移除回调时触发
emitter.on('newListener', (eventName) => {
    console.log('--newListener---- ', eventName);
});
emitter.on('removeListener', (eventName) => {
    console.log('---removeListener---', eventName);
});
function test3(){
    console.log('test3');
}
emitter.on('addEvent', test3);
emitter.removeListener('addEvent', test3);
// 执行结果
// --newListener---- removeListener
// --newListener---- addEvent
// ---removeLIstener--- addEvent
*/