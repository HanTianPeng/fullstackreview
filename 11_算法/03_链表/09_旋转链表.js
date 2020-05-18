// 先闭环,再拆环
var rotateRight = function(head, k) {
    if(head === null || head.next === null || k === 0) {
        return head;
    }
    // 获取链表长度
    let size = 1,
        currentNode = head;
    while(currentNode.next){
        currentNode = currentNode.next;
        size++;
    }

    // 将尾节点的next指针指向头节点
    currentNode.next = head;

    // 获取最终旋转k数
    k = k % size;

    // 从左向右移动size - k
    let count = 1,
        firstNode = head;
    while(count < size - k) {
        firstNode = firstNode.next;
        count++;
    }
    let temp = firstNode.next;
    firstNode.next = null;
    return temp;
};

// 每次移动最后一个节点
var rotateRight1 = function(head, k){
    // 边界问题
    if(head === null || head.next === null || k === 0){
        return head;
    }

    // 获取链表size
    let size = 1,
        currentNode = head;
    while(currentNode.next){
        currentNode = currentNode.next;
    }

    // 获取最终旋转k
    k = k % size;

    // 循环k次
    let firstNode = head;
    while(k > 0) {
        let lastNode = firstNode;
        // 每次移动最后一个节点
        while(lastNode.next && lastNode.next.next) {
            lastNode = lastNode.next;
        }
        let temp = lastNode.next;
        temp.next = firstNode;
        lastNode.next = null;
        firstNode = temp;
        k--;
    }
    return firstNode;
}
