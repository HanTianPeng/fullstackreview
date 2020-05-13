/*
字节跳动:
    用两个栈实现队列:

    解题思路:
        1. 栈:FILO, 队列: FIFO

        2. 双栈可以实现序列倒置, 假设 stack1 = [1, 2, 3]、stack2 = [];如果循环出栈stack1 并将出栈元素进栈stack2，则循环结束后
        stack1 = []、stack2 = [3, 2, 1] 即通过stack2实现了stack1中的元素倒置

        3. 当需要删除队首元素时,仅仅需要stack2出栈即可, 当stack2为空时，出队就需要将stack1元素倒置到stack2，stack2再执行出栈即可,
        如果stack1也为空，则队列中没有元素，返回-1

*/
function Queue() {
    let stack1 = [],
        stack2 = [];

    this.appendTail = function(element) {
        stack1.push(element)
    };

    this.deleteHead = function() {
        if(stack2.length) {
            return stack2.pop();
        }

        if(!stack1.length) {
            return -1;
        }

        while(stack1.length) {
            stack2.push(stack1.pop());
        }
        return stack2.pop();
    }
}