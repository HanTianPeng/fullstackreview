// head -> data|next -> data|next -> null

// 链表
function LList() {
    // 节点
    let Node = function (element) {
        this.element = element;
        this.next = null;
    }
    // 初始化头节点为null
    this.head = null;
    // 链表长度
    this.length = 0;
    // 追加节点---初始化一个节点(待追加节点),遍历到链尾,在尾节点后插入该节点
    this.append = function(element) {
        let firstLoopNode = this.head,
            node = new Node(element);
        // 当链表为null的时候,直接将head指向待插入节点,不需要遍历
        if(!firstLoopNode){
            this.head = node;
        }else{
            // 从头节点开始遍历,直到该节点next为null的时候,将该节点的next指向新的节点
            while(firstLoopNode.next){
                firstLoopNode = firstLoopNode.next;
            }
            firstLoopNode.next = node;
        }
        // 长度加1
        this.length += 1;
    }
    // 查找---遍历单链表,判断节点值是否等于待查找值,相等则返回true,否则继续遍历下一个节点,直到遍历完整个链表还未找到,返回false
    this.search = function(element){
        let firstLoopNode = this.head;
        // 从头节点开始遍历,只要改节点不为null,则继续遍历
        while(firstLoopNode){
            // 当该节点的element与查找元素的element相当,则遍历结束,找到目标元素
            if(firstLoopNode.element === element){
                return firstLoopNode;
            }
            firstLoopNode = firstLoopNode.next;
        }
        return null;
    }
    // 查找前驱
    this.searchPrevious = function(element) {
        var firstLoopNode = this.head,
            beforeLoopNode = null;
        while(firstLoopNode) {
            if(firstLoopNode.element === element){
                return beforeLoopNode;
            }
            beforeLoopNode = firstLoopNode;
            firstLoopNode = firstLoopNode.next;
        }
        return null;
    }
    // 插入---遍历到position前一个位置节点,在该节点后插入
    this.insert = function(position, element){
        let node = new Node(element),
            firstLoopNode = this.head,
            beforeLoopNode = null,
            count = 0;
        // 边界问题: 插入位置必须大于等于0,小于等于链表长度
        if(position <= this.length && position >= 0){
            // 临界点: 插入0位置,成为头节点
            if(position === 0){
                node.next = firstLoopNode;
                this.head = node;
            }else{
                // 从头节点开始遍历,循环条件为当前位置小于插入位置
                while(count < position){
                    beforeLoopNode = firstLoopNode;
                    firstLoopNode = firstLoopNode.next;
                    count++;
                }
                // 前一个节点的next指向新节点
                beforeLoopNode.next = node;
                // 新节点的next指向当前节点
                node.next = firstLoopNode;
            }
            // 长度+1
            this.length += 1;
            return true;
        }else{
            return null;
        }
    }
    // 删除---
    this.delete = function(element){
        let firstLoopNode = this.head,
            beforeLoopNode = null;
        // 从头节点开始遍历
        while(firstLoopNode){
            // 当该节点element与删除元素的element相等,则跳出循环
            if(firstLoopNode.element === element){
                // 临界点: 删除的为头节点,则头节点为下一个节点
                if(!beforeLoopNode){
                    this.head = firstLoopNode.next;
                }else{
                    // 当前节点的前一个节点的next指向当前节点的next节点
                    beforeLoopNode.next = firstLoopNode.next;
                }
                // 长度-1
                this.length -= 1;
                return true;
            }else{
                beforeLoopNode = firstLoopNode;
                firstLoopNode = firstLoopNode.next;
            }
        }
        return null;
    }
    // 反转---迭代方法
    this.reverse = function(){
        let firstLoopNode = this.head,
            beforeLoopNode = null,
            afterLoopNode = null;
        // 从头节点开始遍历
        while(firstLoopNode){
            // 首先提前获取下一个节点,因为需要将该节点的next重新指向上一个节点
            afterLoopNode = firstLoopNode.next;
            // 将该节点重新指向上一个节点
            firstLoopNode.next = beforeLoopNode;
            // 将当前节点赋值给上一个节点
            beforeLoopNode = firstLoopNode;
            // 重新赋值下一个节点为当前节点
            firstLoopNode = afterLoopNode;
        }
        // 重新将头节点指向最后一个节点
        this.head = beforeLoopNode;
    }
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
        // 递归反转
        let reverseNode = this.headRecuiveReverse(nextNode);
        // 变更指针
        nextNode.next = headNode;
        headNode.next = null;
        // 重新将头节点指向最后一个节点
        return this.head = reverseNode;
    }

    // 判断一个单链表是否有环: 标志位法 === 时间复杂度O(n), 空间复杂度O(n)
    this.hasCycle = function(){
        let currentNode = this.head;
        while(currentNode){
            if(currentNode.flag){
                return false;
            }
            currentNode.flag = true;
            currentNode = currentNode.next;
        }
        return false;
    }

    // 判断一个单链表是否有环: 快慢指针 === 时间复杂度O(n), 空间复杂度O(1)
    this.hasCyclePointer = function(){
        let currentNode = this.head;
        if(!currentNode){
            return false;
        }

        // 创建快慢指针
        let slow = currentNode.next,
            fast = currentNode.next.next;
        while(fast !== slow){
            if(!fast || !fast.next){
                return false;
            }
            fast = fast.next.next;
            slow = slow.next;
        }
        return true;
    }

    // 判断一个单链表是否有环: 利用JSON.stringify()不能序列化含有循环引用的结构 === 时间复杂度O(n), 空间复杂度O(1)
    this.hasCycleStringify = function(){
        let currentNode = this.head;
        try{
            JSON.stringify(currentNode);
            return false;
        }catch(error) {
            return true;
        }
    }

    // 遍历
    this.display = function(){
        let firstLoopNode = this.head;
        var target = '';
        if(!firstLoopNode){
            return null;
        }
        while(firstLoopNode){
            target += firstLoopNode.element + ' -> ';
            firstLoopNode = firstLoopNode.next;
        }
        target += 'null';
        return target;
    }
}

var l1 = new LList();
l1.append(1);
l1.append(3);
l1.append(4);
l1.append(7);
console.log('----l1----', l1);
var l2 = new LList();
l2.append(1);
l2.append(2);
l2.append(5);
l2.append(6);
console.log('-----l2----', l2);
l1.headRecuiveReverse(l1.head);
/*
解题思路:
    从链表头开始比较,aList与bList为有序递增,所以比较aNode.element与bNode.element的较小值
    就是合并后链表的较小值(1),次小值(2)就是较小值节点的next.element与大节点的.element比较的较小值,
    同时将步骤(1)的节点的next指向改成步骤(2)的节点.
    依次递归,直到递归到aNode为null和bNode为null;
*/
// 递归函数: 比较两个节点,谁小就返回谁
function mergeTwoLists(l1Node, l2Node){
    // l1链表遍历完毕
    if(l1Node === null){
        return l2Node;
    }
    // l2链表遍历完毕
    if(l2Node === null){
        return l1Node;
    }
    // 节点1的元素值小于等于节点2的元素值
    if(l1Node.element <= l2Node.element){
        // 将节点1的next指向下一次比较的节点
        l1Node.next = mergeTwoLists(l1Node.next, l2Node);
        return l1Node;
    }else{
        // 节点1的元素值大于节点2的元素值,将节点2的next指向下一次比较的节点
        l2Node.next = mergeTwoLists(l2Node.next, l1Node);
        return l2Node;
    }
}
// var result = mergeTwoLists(l1.head, l2.head);
// 创建一个新的合并后的链表对象
// var mergeNewList = new LList()
// mergeNewList.head = result;
// mergeNewList.length = 8;
// console.log('---合并两个有序链表---', mergeNewList);




