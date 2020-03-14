function HashTable() {
    this.table = new Array(137);
    this.simpleHash = simpleHash;
    this.betterHash = betterHash;
    this.put = put;
    this.get = get;
    this.showData = showData;
    this.bulidChians = bulidChians;
    this.putV2 = putV2;
}

function bulidChians() {
    for(var i=0; i<this.table.length; i++) {
        this.table[i] = new Array();
    }
}

function simpleHash(data) {
    var total = 0;
    for(var i=0; i<data.length; i++) {
        total += data.charCodeAt(i);
    }
    return total % this.table.length;
}

function betterHash(data) {
    var H = 31;
    var total = 0;
    for(var i=0; i<data.length; i++) {
        total += H*total + data.charCodeAt(i);
    }
    if(total < 0) {
        total += this.table.length -1;
    }

    return total % this.table.length;
}

function put(data) {
    var position = this.simpleHash(data);
    this.table[position] = data;
}

function putV2(data) {
    var position = this.simpleHash(data);
    var index = 0;
    if(this.table[position][index] == undefined) {
        this.table[position][index] = data;
        index++;
    }else{
        while(this.table[position][index] != undefined) {
            ++index;
        }
        this.table[position][index] = data;
    }

}

function get(key) {
    return this.table[this.simpleHash(key)];
}

function showData() {
    for(var i=0; i<this.table.length; i++) {
        if(this.table[i] != undefined) {
            console.log(i, this.table[i]);
        }
    }
}