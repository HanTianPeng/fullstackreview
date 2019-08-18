var EventEmitter = require('events').EventEmitter;
// 初始化实例对象
var emitter = new EventEmitter();
// 监听事件
emitter.on('removeListenerEvent', function(msg){
    console.log('removeListenerEvent has occured' + msg);
});
// 触发事件
setInterval(function(){
    emitter.emit('removeListenerEvent', 'good job');
}, 300);
// emitter.emit('removeListenerEvent', 'good job');