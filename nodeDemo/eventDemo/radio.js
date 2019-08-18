var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Radio(station){
    var self = this;

    // emit：发出事件, setTimeOut中的this为window
    setTimeout(() => {
        self.emit('open', station);
    }, 0);

    setTimeout(() => {
        self.emit('close', station);
    }, 5000);

    // on：监听事件
    this.on('newListner', (listner) => {
        console.log('the newListner has occured ' + listner);
    });
};
util.inherits(Radio, EventEmitter);


module.exports = Radio;

