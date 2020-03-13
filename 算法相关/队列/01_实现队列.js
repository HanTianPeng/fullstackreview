function Queue() {
    this.dataStore = [];
    this.dequeue = dequeue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.empty = empty;
    this.toString = toString;
}

// 插入
function enqueue(element) {
    this.dataStore.push(element);
}

// 删除
function dequeue() {
    this.dataStore.shift(element);  // 队首删除
}

function front() {
    return this.dataStore[0];
}

function back() {
    return this.dataStore[this.dataStore.length-1];
}

function empty() {
    return this.dataStore.length === 0 ? true : false;
}

function toString() {
    return this.dataStore;
}

// 急诊队列(通过遍历,依次替换最高优先级的元素,找到优先级最高的元素并将其删除)
function deEmergencyQueue() {
    var index = 0;
    for(var i=0; i<this.dataStore.length; i++) {
        if(this.dataStore[i].priority > this.dataStore[index].priority) {
            index = i;
        }
    }
    return this.dataStore.splice(priority, 1);
}