// 707.设计链表: medium
var ListNode = function(val, next=null) {
    // 节点函数
    this.val = val;
    this.next = next;
}

var MyLinkedList = function() {
    // 链表函数
    this.head = new ListNode('head');  // 哨兵节点
    // 尾节点
    this.end = this.head;
    // 节点数
    this.len = 0;
};


/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    // 边界处理
    if(index >= this.len || index < 0) return -1;

    // 极端判断 - 获取尾节点
    if(index === this.len - 1) return this.end.val;

    // 极端判断 - 获取头节点
    if(index === 0) return this.head.next.val;

    // 获取中间节点
    let target = this.head.next;
    while(index-- > 0) {
        target = target.next;
    }
    return target.val;
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    // 创建一个新节点: 头部添加，其next节点就是上一次链表的头节点
    let target = new ListNode(val, this.head.next);
    // 将这个新节点挂在哨兵节点的后面,成为新的头节点
    this.head.next = target;
    // 头部添加,尾节点在长度为0的时候就已经固定下来了
    if(this.len === 0) this.end = target;
    this.len++;
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    // 创建一个新节点: 尾部添加, 其next节点永远指向null
    let target = new ListNode(val);
    // 将上一次链表的尾节点的next指向这个新节点,使其成为新的尾节点
    this.end.next = target;
    // 新节点成为新的尾节点
    this.end = this.end.next;
    this.len++;
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    // 边界判断
    if(index < 0 || index > this.len) return ;

    // 极端判断
    if(index === 0) {
        // 头部添加
        this.addAtHead(val);
    }else if(index === this.len) {
        // 尾部添加
        this.addAtTail(val);
    } else {
        // 中间添加
        let target = this.head;
        while(index-- > 0) {
            target = target.next;
        }
        target.next = new ListNode(val, target.next);
        this.len++;
    }
};

/**
 * Delete the index-th node in the linked list, if the index is valid. 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    // 边界判断
    if(this.len === 0 || index >= this.len || index < 0) return ;

    let target = this.head;
    while(index-- > 0) {
        target = target.next;
    }

    if(target.next === this.end) this.end = target;
    target.next = target.next.next;
    this.len--;
};


// 237.删除链表中的节点: easy + 换位思考(将当前被删除的节点替换成下一个节点)
var deleteNode = function(node) {
    // 将当前被删除的节点值,替换成下一个节点的值
    // 将当前被删除的节点next指向,替换成下一个节点的next的指向
    node.val = node.next.val;
    node.next = node.next.next;
    // 不能返回当前node
};