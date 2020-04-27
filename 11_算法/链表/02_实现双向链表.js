
function LList() {
    let Node = function(element){
        this.element = element;
        // 前驱指针
        this.prev = null;
        // 后驱指针
        this.next = null;
    }
    // 初始化头节点
    this.head = null;
    // 初始化为节点
    this.tail = null;
    // 初始化链表长度
    this.length = 0;
    // 插入节点
    this.insert = function(position, element){
        // 创建节点
        let node = new Node(element)
            firstNode = this.head,
            lastNode = this.tail,
            beforeNode = null,
            count = 0;
        if(position <= this.length && position >= 0){
            if(position === 0){
                // 双链表的第一个元素
                if(!firstNode){
                    this.head = node;
                    this.tail = node;
                }else{
                    // 头节点的前驱节点指向新节点
                    firstNode.prev = node;
                    // 新节点的后继指向头节点
                    node.next = firstNode;
                    // 将最新节点设置为头节点
                    this.head = node;
                }
            }else if(position === this.length){
                // 尾节点的后继指向新节点
                lastNode.next = node;
                //新节点的前驱指向尾节点
                node.prev = lastNode;
                // 将最新节点指向尾节点
                this.tail = node;
            }else{
                while(position < count){
                    beforeNode = firstNode;
                    firstNode = firstNode.next;
                    count++;
                }
                // 当前节点的前一个节点的后继节点指向新节点
                beforeNode.next = node;
                // 新节点的前驱节点指向当前节点的前一个节点
                node.prev = beforeNode;
                // 新节点的后继节点指向当前节点
                node.next = firstNode;
                // 当前节点的前驱节点指向新节点
                firstNode.prev = node;
            }
            // 长度+1
            this.length += 1;
        }else{
            return null;
        }
    }
    // 删除节点
    this.remove = function(element){
        let firstNode = this.head,
            beforeNode = null,
            afterNode = firstNode ? firstNode.next : null;
        while(firstNode){
            if(firstNode.element === element){
                // 删除头节点
                if(!firstNode.prev){
                    // 将头节点的后继节点的前驱设置为null
                    if(!afterNode){
                        this.head = null;
                        this.tail = null;
                        firstNode.next = null;
                    }else{
                        afterNode.prev = null;
                        // 将头节点的后继节点设置为头节点
                        this.head = afterNode;
                        // 将头节点的后继设置为null
                        firstNode.next = null;
                    }
                }else if(!firstNode.next){  // 删除尾节点
                    // 将尾节点的前驱节点的后继设置为null
                    beforeNode.next = null;
                    // 将尾节点的前驱节点设置为尾节点
                    this.tail = beforeNode;
                    // 将尾节点的前驱设置为null
                    firstNode.prev = null;
                }else{
                    // 将该节点的前驱节点的后继设置为该节点的后继节点
                    beforeNode.next = afterNode;
                    // 将该节点的后继节点的前驱设置为该节点的前驱节点
                    afterNode.prev = beforeNode;
                    // 将该节点的前驱设置为null
                    firstNode.prev = null;
                    // 将该节点的后继设置为null
                    firstNode.next = null;
                }
                this.length -= 1;
                return true;
            }else{
                beforeNode = firstNode;
                firstNode = firstNode.next;
                if(!firstNode){
                    afterNode = null;
                }else{
                    afterNode = firstNode.next;
                }
            }
        }
        return null;
    }
    // 查找
    this.search = function(element){
        let firstNode = this.head;
        // 从头节点开始遍历链表,与单向链表一致处理方案
        while(firstNode){
            if(firstNode.element === element){
                return firstNode;
            }else{
                firstNode = firstNode.next;
            }
        }
        return null;
    }
}
var doubleLList1 = new LList();
doubleLList1.insert(0, 1);
doubleLList1.insert(1, 2);
doubleLList1.insert(2, 3);
doubleLList1.insert(3, 4);
doubleLList1.insert(4, 5);
doubleLList1.insert(5, 6);
console.log('----doubleLList1----', doubleLList1);
doubleLList1.remove(3);