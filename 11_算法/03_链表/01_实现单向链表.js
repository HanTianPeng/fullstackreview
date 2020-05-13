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
		console.log(nextNode.element);
        // 递归反转
        let reverseNode = this.headRecuiveReverse(nextNode);
        // 变更指针
        nextNode.next = headNode;
        headNode.next = null;
        // 重新将头节点指向最后一个节点
        return this.head = reverseNode;
    }

    // 给定一个带有头节点的非空单链表,返回链表的中间节点,求链表的中间节点: 快慢指针
    this.getMiddle = function(){
        let currentNode = this.head;
        if(!currentNode){
            return [];
        }
        // 创建快慢指针,快指针走两步,慢指针走一步,快指针走完,慢指针则为中间值
        let slow = currentNode,
            fast = currentNode;
        // 如果两个中间节点,则返回第二个中间节点 [1, 2, 3, 4, 5] 返回节点 3，序列化后[3, 4, 5]  / [1, 2, 3, 4] 返回节点 3, 序列化后 [3, 4]
        while(fast && fast.next) {
            fast = fast.next.next;
            slow = slow.next;
        }
        return slow;
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

    // 给定一个链表,删除链表的倒数第n个节点,并且返回链表的头节点
    this.removeAt = function(reverseNum) {
        let fast = this.head,
            slow = this.head;
        // 快指针先走reverseNum步
        while(--reverseNum){
            fast = fast.next;
        }
        // 当fast为尾节点,此时n等于链表长度时,直接返回从头节点之后的节点,这样相当于删除了头节点
        if(!fast.next){
            return this.head.next;  // 删除头节点
        }
        // 快指针优先一步慢指针
        fast = fast.next;
        while(fast && fast.next){
            fast = fast.next;
            slow = slow.next;
        }
        // 将慢指针的next指向慢指针的后继的后继节点,这样就删除了慢指针的next指向慢指针的后继节点关系,也相当于删除了该节点
        slow.next = slow.next.next;
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

var l3 = new LList();
l3.append(1);
l3.append(2);
l3.append(3);
l3.append(4);
l3.append(5);
l3.append(6);
console.log('----l3---', l3);
// 删除倒数第5个
l3.removeAt(5);
console.log('---删除倒数第n个节点----', l3);


