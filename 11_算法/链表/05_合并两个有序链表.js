// 合并两个有序链表
function LList() {
    let Node = function(element) {
        this.element = element;
        this.next = null;
    }
    // 初始化头节点为null
    this.head = null;
    // 初始化链表长度
    this.length = 0;
    // 追加方法
    this.append = function(element) {
        let node = new Node(element),
            firstNode = this.head;
        // 空链表
        if(!firstNode){
            this.head = node;
        }else{
            while(firstNode.next){
                firstNode = firstNode.next;
            }
            firstNode.next = node;
        }
        this.length += 1;
    }
}

var linkList1 = new LList();
linkList1.append(1);
linkList1.append(5);
linkList1.append(8);
linkList1.append(10);
console.log('---linkList1---', linkList1);

var linkList2 = new LList();
linkList2.append(0);
linkList2.append(2);
linkList2.append(4);
linkList2.append(7);
console.log('---linkList2---', linkList2);

/*
解题思路:
    从链表头开始比较,aList与bList为有序递增,所以比较aNode.element与bNode.element的较小值
    就是合并后链表的较小值(1),次小值(2)就是较小值节点的next.element与大节点的.element比较的较小值,
    同时将步骤(1)的节点的next指向改成步骤(2)的节点.
    依次递归,直到递归到aNode为null和bNode为null;
*/
// 递归函数: 比较两个节点,谁小就返回谁
function mergeRecursive(node1, node2) {
    // linkList1链表遍历结束,后续的linkList2就没有必要继续遍历了,因为linkList2为有序链表,同时next指针指向后续所有节点
    if(!node1){
        return node2;
    }
    // linkList2链表遍历结束,后续的linkList1就没有必要继续遍历了,因为linkList1为有序链表,同时next指针指向后续所有节点
    if(!node2){
        return node1;
    }
    // 节点1元素小于节点2元素,继续让节点1的后继节点与节点2进行对比,且返回节点1元素
    if(node1.element <= node2.element){
        node1.next = mergeRecursive(node1.next, node2);
        return node1;
    }else{
        // 节点2元素小于节点1元素,继续让节点2的后继节点与节点1进行对比,且返回节点2元素
        node2.next = mergeRecursive(node2.next, node1);
        return node2;
    }
}

function mergeTwoLinkLists(linkList1, linkList2){
    let head1 = linkList1.head,
        head2 = linkList2.head;
    return mergeRecursive(head1, head2);
}

var mergeNode = mergeTwoLinkLists(linkList1, linkList2);
console.log('---链表合并----', mergeNode);