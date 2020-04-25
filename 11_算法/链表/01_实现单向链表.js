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
    // 链表产犊
    this.length = 0;
    // 追加节点---初始化一个节点(待追加节点),遍历到链尾,在尾节点后插入该节点
    this.append = function(element) {
        let firstLoopNode = this.head,
            node = new Node(element);
        // 当链表为null的时候,直接将head指向待插入节点,不需要遍历
        if(!firstLoopNode){
            this.head = node;
        }else{
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
        while(firstLoopNode){
            if(firstLoopNode.element == element){
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
        if(position <= this.length && position >= 0){
            if(position === 0){
                node.next = firstLoopNode;
                this.head = node;
            }else{
                while(count < position){
                    beforeLoopNode = firstLoopNode;
                    firstLoopNode = firstLoopNode.next;
                    count++;
                }
                beforeLoopNode.next = node;
                node.next = firstLoopNode;
            }
            this.length += 1;
        }else{
            return null;
        }
    }
    // 删除---
    this.delete = function(element){
        let firstLoopNode = this.head,
            beforeLoopNode = null;
        while(firstLoopNode){
            if(firstLoopNode.element === element){
                if(!beforeLoopNode.next){
                    this.head = null;
                }else{
                    beforeLoopNode.next = firstLoopNode.next;
                }
                this.length -= 1;
                return true;
            }else{
                beforeLoopNode = firstLoopNode;
                firstLoopNode = firstLoopNode.next;
            }
        }
        return null;
    }
    // 反转---
    this.reverse = function(){
        let firstLoopNode = this.head,
            beforeLoopNode = null,
            afterLoopNode = firstLoopNode ? firstLoopNode.next : null;
        while(firstLoopNode){
            firstLoopNode.next = beforeLoopNode;
            beforeLoopNode = firstLoopNode;
            firstLoopNode = afterLoopNode;
        }
    }
    // 递归
    this.recurive = function(beforeNode, currentNode){
        if(!currentNode){
            return previouseNode;
        }
        currentNode.next = beforeNode;
        return recurive(currentNode, beforeNode ? beforeNode.next : null)
    }
    // 递归反转
    this.recuiveReverse = function(){
        let currentNode = this.head,
            beforeNode = null;
        this.recuiveReverse(beforeNode, currentNode);
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
var l2 = new LList();
l2.append(1);
l2.append(2);
l2.append(5);
l2.append(6);
/*
解题思路:
    从链表头开始比较,aList与bList为有序递增,所以比较aNode.element与bNode.element的较小值
    就是合并后链表的较小值,次小值就是较小值节点的next.element与大节点的.element比较的较小值,
    依次递归,直到递归到aNode为null和bNode为null;
*/
function mergeTwoLists(l1, l2){
    if(l1 === null){
        return l2;
    }
    if(l2 === null){
        return l1;
    }
    if(l1.element <= l2.element){
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    }else{
        l2.next = mergeTwoLists(l2.next, l1);
        return l2;
    }
}
console.log(l1.display());
// var result = mergeTwoLists(l1.head, l2.head);

function reverse(l1){
    let firstLoopNode = l1.head,
        beforeLoopNode = null,
        afterLoopNode = null;
    while(firstLoopNode){
        afterLoopNode = firstLoopNode.next;
        firstLoopNode.next = beforeLoopNode;
        beforeLoopNode = firstLoopNode;
        firstLoopNode = afterLoopNode;
        console.log(firstLoopNode);
    }
}

var result2 = reverse(l1);
console.log(result2);
