// 队列: FIFO
function Queue() {
    this.dataStore = [];

    // 进队
    this.enqueue = function(element) {
        this.dataStore.push(element)
    };

    // 出队
    this.dequeue = function() {
        if(!this.dataStore.length) {
            return null;
        }
        return this.dataStore.shift();
    };

    // 判断是否为空队
    this.isEmpty = function() {
        return this.dataStore.length === 0;
    }

    // 获取队头元素
    this.front = function() {
        if(!this.dataStore.length) {
            return null;
        }
        return this.dataStore[0];
    };

    // 清空队
    this.clear = function() {
        this.dataStore = [];
    }

    // 获取队列长度
    this.size = function() {
        return this.dataStore.length;
    }
    
    // 获取队尾元素
    this.back = function() {
        if(!this.dataStore.length) {
            return null;
        }
        return this.dataStore[this.dataStore.length - 1];
    };
    
    // 序列化
    this.toString = function() {
        return this.dataStore;
    };
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