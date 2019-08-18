var Radio = require('./radio.js');

var station = {
    frep: '80.19',
    name: 'Rock N Roll Radio'
}

var radio = new Radio(station);

radio.on('open', function(station){
    console.log('open=====>' + station.frep + station.name);
});

radio.on('close', function(station){
    console.log('close====>' + station.frep + station.name);
});

radio.emit('newListner', 'good job');