// 实现双端队列:
function Deque() {
    this.dataStore = [];

    // 从队头进队
    this.addFirst = function(element) {
        this.dataStore.unshift(element);
    }

    // 从队头出队
    this.removeFirst = function() {
        if(!this.dataStore.length) {
            return null;
        }
        return this.dataStore.shift();
    }

    // 从队尾进队
    this.addLast = function(element) {
        this.dataStore.push(element);
    }

    // 从队尾出队
    this.removeLast = function() {
        if(!this.dataStore.length) {
            return null;
        }
        return this.dataStore.pop();
    }

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
    }

    // 清空队
    this.clear = function() {
        this.dataStore = [];
    }

    // 获取队列长度
    this.size = function() {
        return this.dataStore.length;
    }
}