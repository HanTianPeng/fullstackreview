// 622.设计循环队列: medium
/*
(2)循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为“环形缓冲器”。

(1)循环队列的一个好处是我们可以利用这个队列之前用过的空间。
在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，
即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。
*/
var MyCircularQueue = function(k) {
    // 初始化队列容量: 浪费一个位置目的: 区分队列为空(head==tail)与队列已满(tail+1)%len==head的判断
    this.cap = k+1;
    // 队头: 指向队列头部的第一个有效数据的位置
    this.head = 0;  
    // 队尾: 指向队列尾部的最后一个有效数据的下一个位置, 即下一个元素从队尾入队的位置
    this.tail = 0;  // -1
    // 数据源
    this.arr = new Array(k);
};

/**
 * Insert an element into the circular queue. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
    // 向循环队列插入一个元素
    if(this.isFull()) return false;

    // if(this.isEmpty()) this.head = 0;

    // this.tail = (this.tail + 1) % this.cap;
    // this.arr[this.tail] = value;

    this.arr[this.tail] = value;
    this.tail = (this.tail + 1) % this.cap;
    return true;
};

/**
 * Delete an element from the circular queue. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
    // 删除一个元素
    if(this.isEmpty()) return false;

    // if(this.head === this.tail) {
    //     this.head = this.tail = -1;
    // }else {
    //     this.head = (this.head + 1) % this.cap;
    // }

    this.head = (this.head + 1) % this.cap
    return true;
};

/**
 * Get the front item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
    // 获取队首元素
    if(this.isEmpty()) return -1;

    return this.arr[this.head];
};

/**
 * Get the last item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
    // 获取队尾元素
    if(this.isEmpty()) return -1;

    // return this.arr[this.tail];
    return this.arr[(this.tail - 1 + this.cap) % this.cap]
};

/**
 * Checks whether the circular queue is empty or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
    // 判断队列是否为空
    // return this.head === -1;
    return this.head === this.tail;
};

/**
 * Checks whether the circular queue is full or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
    // 判断队列是否已满
    return this.head === (this.tail + 1) % this.cap;
};

// 641.设计循环双端队列:
/**
 * Initialize your data structure here. Set the size of the deque to be k.
 * @param {number} k
 */
var MyCircularDeque = function(k) {
    this.cap = k+1;
    // 指向当前队列尾部的最后一个有效数据的下一个位置,即下一个从队尾入队元素的位置
    this.tail = 0;
    // 指向当前队列头部的第一个有效数据的位置
    this.head = 0;
    this.arr = new Array(this.cap);
};

/**
 * Adds an item at the front of Deque. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function(value) {
    // 将一个元素添加到双端队列头部
    if(this.isFull()) return false;

    this.head = (this.head - 1 + this.cap) % this.cap;
    this.arr[this.head] = value;
    return true;
};

/**
 * Adds an item at the rear of Deque. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function(value) {
    // 将一个元素添加到双端队列尾部
    if(this.isFull()) return false;

    this.arr[this.tail] = value;
    this.tail = (this.tail + 1) % this.cap;
    return true;
};

/**
 * Deletes an item from the front of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function() {
    // 从双端队列头部删除一个元素
    if(this.isEmpty()) return false;

    this.head = (this.head + 1) % this.cap;
    return true;
};

/**
 * Deletes an item from the rear of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function() {
    // 从双端队列尾部删除一个元素
    if(this.isEmpty()) return false;

    this.tail = (this.tail - 1 + this.cap) % this.cap;
    return true; 
};

/**
 * Get the front item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function() {
    // 获取头部一个元素
    if(this.isEmpty()) return -1;
    return this.arr[this.head];
};

/**
 * Get the last item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function() {
    // 获取尾部一个元素
    if(this.isEmpty()) return -1;
    return this.arr[(this.tail - 1 + this.cap) % this.cap];
};

/**
 * Checks whether the circular deque is empty or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function() {
    return this.head === this.tail;
};

/**
 * Checks whether the circular deque is full or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function() {
    return (this.tail + 1) % this.cap === this.head;
};

// 239.滑动窗口最大值: hard + 双端队列 + 时间复杂度O(n)
var maxSlidingWindow = function(nums, k) {
    // 边界处理
    if(k === 1) return nums;

    // 创建一个双端队列
    let deque = [],
        result = [];

    // 遍历
    for(let i=0; i<nums.length; i++) {
        // 当前遍历的元素索引 与 队列中队头的索引差值等于k, 则队头的最大值已经失效
        if(deque.length && i - deque[0] === k) deque.shift();

        // 保证队列的队头元素永远最大,队头到队尾一次递减; 层层遍历
        while(deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
        deque.push(i);

        // 从索引为k-1的元素开始一次产生滑动窗口的最大值
        if(i >= k - 1) result.push(nums[deque[0]]);
    }

    return result;
};

// 239.滑动窗口最大值: hard + 暴力破解法 + 时间复杂度O(kn)
var maxSlidingWindow = function(nums, k) {
    // 边界处理
    if(k === 1) return nums;

    // 创建一个滑动窗口
    let win = [],
        result = [];

    // 遍历
    for(let i=0; i<nums.length; i++) {
        win.push(nums[i]);

        // 第k个元素,开始产生滑动窗口的最大值
        if(i >= k - 1) {
            result.push(Math.max(...win));
            // 将滑动窗口的第一个元素删除
            win.shift();
        }
    }
    return result;
};