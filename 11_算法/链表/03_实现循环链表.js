// 循环链表: 一种特殊的单向链表,它和单向链表唯一区别: 单向链表的尾节点指向的是null,而循环链表的尾节点指向的是头节点,这就形成了一个首尾相连的环

function CircularLinkedList(){
    let Node = function(element){
        this.element = element;
        // 后继指针
        this.next = null;
    }
    // 初始化头节点
    this.head = null;
    // 初始化链表长度
    this.length = 0;
    // 插入
    this.insert = function(position, element){
        // 确定position的边界
        if(position <= this.length && position >= 0){
            let node = new Node(element)
                firstNode = this.head,
                beforeNode = null,
                count = 0;
            if(position === 0){
                // 该链表为空链表
                if(!firstNode){
                    // 头节点为该节点
                    this.head = node;
                    // 该节点的后继指向该节点自己
                    node.next = node;
                }else{
                    // 该节点的后继节点指向头节点
                    node.next = firstNode;
                    // 将该节点设置为新的头节点
                    this.head = node;
                    while(count < this.length -1){
                        firstNode = firstNode.next;
                        count += 1;
                    }
                    // 将尾节点的后继指向新节点
                    firstNode.next = node;
                }
            }else if(position === this.length){
                // 新节点的next指向头节点
                node.next = firstNode;
                while(count < this.length - 1){
                    firstNode = firstNode.next;
                    count += 1;
                }
                // 将尾节点的后继指向新节点
                firstNode.next = node;
            }else{
                while(count < position){
                    beforeNode = firstNode;
                    firstNode = firstNode.next;
                }
                beforeNode.next = node;
                node.next = firstNode;
            }
            // 长度+1
            this.length += 1;
        }
        return null;
    }
    // 查找: 循环链表从任一节点开始查找目标节点,时间复杂度为O(n)
    this.search = function(element){
        let firstNode = this.head,
            count = 1;
        while(count <= this.length){
            if(firstNode.element === element){
                return firstNode;
            }else{
                firstNode = firstNode.next;
                count += 1;
            }
        }
        return null;
    }
    // 删除
    this.remove = function(element){
        let firstNode = this.head,
            beforeNode = null,
            afterNode = firstNode ? firstNode.next : null,
            count = 0,
            index = 0;
        console.log('111===', afterNode);
        if(!firstNode){
            return null;
        }
        while(count <= this.length){
            if(firstNode.element === element){
                if(this.length === 1){
                    this.head = null;
                    firstNode.next = null;
                }else{
                    if(count === 0){
                        firstNode.next = afterNode;
                    }else{
                        beforeNode.next = afterNode;
                    }
                }
                this.length -= 1;
            }else{
                beforeNode = firstNode;
                firstNode = firstNode.next;
                afterNode = firstNode.next;
                count += 1;
            }
        }
        return null;
    }
}

var circularLinkedList1 = new CircularLinkedList();
circularLinkedList1.insert(0, 1);
circularLinkedList1.insert(1, 2);
circularLinkedList1.insert(2, 3);
circularLinkedList1.insert(3, 4);
circularLinkedList1.insert(4, 5);
circularLinkedList1.insert(5, 6);
circularLinkedList1.insert(6, 7);
console.log('---circularLinedList1---', circularLinkedList1);

circularLinkedList1.remove(9);

console.log('--------', circularLinkedList1);