/*
链表
  1. 由一系列``节点``组成的集合,每个节点都使用一个对象的引用指向它的后继,指向另一个节点的引用叫``链``
  
  2. 链表元素靠相互之间的关系进行引用A->B->C,B并不是链表的第二个元素而是B跟在A后面
  
  3. 遍历链表就是跟着链接,从链接的首元素一直到尾元素,但不包含``头节点``,头元素常常被称为``链表的接入点``,(链表的尾元素指向一个null节点)
  
  4. 向单向链表插入一个节点,需要修改它前面的节点(前驱)使其指向新加入的节点,而新加入的节点则指向原来前驱指向的节点
  
  5. 从单向链表删除一个元素,需要将待删除的元素的前驱节点指向待删除元素的后继节点,同时将删除节点元素指向null
*/
// 206.反转链表: easy + 递归
reverseList = function(head){
    // 边界处理
    if(!head || !head.next) return head;
    // 递归函数:改变链表指针方法
    let recuseNode = (pre, cur) => {
        if(!cur) return pre;
        let temp = cur.next;
        cur.next = pre;
        return recuseNode(cur, temp);
    };
    // 重新将头节点指向最后一个节点
    return recuseNode(null, head);
};
// 206.反转链表: easy + 递归
var reverseList = function(head) {
    if(!head || !head.next) return head;
    let nextNode = head.next;
    // 递归反转
    let reverseNode = reverseList(nextNode);
    // 变更指针
    nextNode.next = head;
    head.next = null;
    // 重新将头节点指向最后一个节点
    return reverseNode;
};
// 61.旋转链表: medium + 先闭环,再拆环
var rotateRight = function(head, k) {
    if(!head || !head.next || !k) return head;
    // 获取链表长度
    let size = 1,
        cur = head;
    while(cur && cur.next){
        cur = cur.next;
        size++;
    }
    // 将尾节点的next指针指向头节点
    cur.next = head;
    // 获取最终旋转k数
    k = k % size;
    // 从左向右移动size - k
    let count = 1,
        temp = head;
    while(count < size - k) {
        temp = temp.next;
        count++;
    }
    let newHead = temp.next;
    temp.next = null;
    return newHead;
};
// 2.两数相加: medium + 遍历 + 满10进1 + 哨兵节点
var addTwoNumbers = function(l1, l2) {
    // 初始化头节点
    let node = new ListNode('head'),
        add = 0,
        sum = 0,
        temp = node;
    while(l1 || l2) {
        // 进行加法运算
        sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + add;
        // 创建新节点
        temp.next = new ListNode(sum % 10);
        // 重置,这样才能保证下一个节点挂在temp.next的next下
        temp = temp.next;
        // 判断是否需要进一
        add = sum >= 10 ? 1 : 0;
        // 移动指针
        l1 && (l1 = l1.next);
        l2 && (l2 = l2.next);
    }
    // 最后判断是否需要进一
    add && (temp.next = new ListNode(add));
    return node.next;
};
// 138.复制带随机指针的链表: medium + 遍历 + 拷贝 + 哈希表
var Node = function(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
};
var copyRandomList = function(head) {
    // 边界问题
    if(head === null) return head;
    let currentNode = head,
        node = new Node(),
        temp = node,
        nodeMap = new Map();
    // 第一次遍历,拷贝val和next
    while(currentNode) {
        // 复制val
        temp.val = currentNode.val;
        // 复制next
        temp.next = currentNode.next ? new Node() : null;
        // 存储映射关系
        nodeMap.set(currentNode, temp);
        // 重新赋值
        temp = temp.next;
        currentNode = currentNode.next;
    }
    // 第二次遍历,拷贝random
    currentNode = head,
    temp = node;
    while(currentNode) {
        // 复制random
        temp.random = currentNode.random ? nodeMap.get(currentNode.random) : null;
        // 重新赋值
        temp = temp.next;
        currentNode = currentNode.next;
    }
    return node;
};