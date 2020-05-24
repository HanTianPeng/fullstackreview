/*
用两个栈实现队列:

解题思路:
    1. 栈:FILO, 队列: FIFO

    2. 双栈可以实现序列倒置, 假设 stack1 = [1, 2, 3]、stack2 = [];如果循环出栈stack1 并将出栈元素进栈stack2，则循环结束后
    stack1 = []、stack2 = [3, 2, 1] 即通过stack2实现了stack1中的元素倒置

    3. 当需要删除队首元素时,仅仅需要stack2出栈即可, 当stack2为空时，出队就需要将stack1元素倒置到stack2，stack2再执行出栈即可,
    如果stack1也为空，则队列中没有元素，返回-1

*/
var CQueue = function() {
    this.stack1 = [];
    this.stack2 = [];
}

// 先进
CQueue.prototype.appendTail = function(value) {
    this.stack1.push(value);
}

// 先出
CQueue.prototype.deleteHead = function() {
    // stack2作为出队的栈
    if(this.stack2.length) {
        return this.stack2.pop();
    }

    if(this.stack1.length === 0) {
        return -1;
    }

    // stack1出栈
    while(this.stack1.length) {
        this.stack2.push(this.stack1.pop());
    }
    return this.stack2.pop();
}
