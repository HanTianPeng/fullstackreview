/*
链表
  1. 由一系列``节点``组成的集合,每个节点都使用一个对象的引用指向它的后继,指向另一个节点的引用叫``链``
  
  2. 链表元素靠相互之间的关系进行引用A->B->C,B并不是链表的第二个元素而是B跟在A后面
  
  3. 遍历链表就是跟着链接,从链接的首元素一直到尾元素,但不包含``头节点``,头元素常常被称为``链表的接入点``,(链表的尾元素指向一个null节点)
  
  4. 向单向链表插入一个节点,需要修改它前面的节点(前驱)使其指向新加入的节点,而新加入的节点则指向原来前驱指向的节点
  
  5. 从单向链表删除一个元素,需要将待删除的元素的前驱节点指向待删除元素的后继节点,同时将删除节点元素指向null
*/
// 尾递归函数
this.recurive = function(beforeNode, currentNode){
    if(!currentNode){
        return beforeNode;
    }
    let nextNode = currentNode.next;
    currentNode.next = beforeNode;
    return this.recurive(currentNode, nextNode);
}
// 尾递归法:反转---从头节点开始,递归反转它的每一个节点,直到null,时间复杂度O(n),空间复杂度O(n)
this.recuiveReverse = function(){
    let currentNode = this.head,
        beforeNode = null;
    // 重新将头节点指向最后一个节点
    return this.head = this.recurive(beforeNode, currentNode);
}
// 递归法:反转---不断递归反转当前节点head的后继节点next,时间复杂度O(n),空间复杂度O(n)
this.headRecuiveReverse = function(headNode){
    if(!headNode || !headNode.next){
        return headNode;
    }
    let nextNode = headNode.next;
    console.log(nextNode.element);
    // 递归反转
    let reverseNode = this.headRecuiveReverse(nextNode);
    // 变更指针
    nextNode.next = headNode;
    headNode.next = null;
    // 重新将头节点指向最后一个节点
    return this.head = reverseNode;
}

// 给定一个带有头节点的非空单链表,返回链表的中间节点,求链表的中间节点: 遍历将节点放在数组中,然后取中间值
this.getMiddleFor = function(){
    let result = [],
        currentNode = this.head;
    while(currentNode){
        result.push(currentNode);
        currentNode = currentNode.next;
    }
    return result[Math.ceil((result.length - 1) / 2)];
}
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