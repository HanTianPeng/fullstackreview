function Dictionary() {
    this.dataStore = new Array();
    this.add = add;
    this.find = find;
    this.remove = remove;
    this.showAll = showAll;
    this.clear = clear;
}

function add(key, value) {
    this.dataStore[key] = value;
}

function find(key) {
    return this.dataStore[key];
}

function remove(key) {
    delete this.dataStore[key];
}

function showAll() {
    var dataKeys = Object.keys(this.dataStore);
    for(var key in dataKeys) {
        console.log(this.dataStore[key]);
    }
}

function count() {
    return Object.keys(this.dataStore).length;
}

function clear() {
    var dataKeys = Object.keys(this.dataStore);
    for(var key in dataKeys) {
        remove(key);
    }
}