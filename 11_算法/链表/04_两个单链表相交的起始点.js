// 字节跳动: 找到两个单链表相交的起始节点
function LList() {
    // 节点
    let Node = function(element) {
        this.element = element;
        this.next = null;
    }
    // 初始化头节点为null
    this.head = null;
    // 初始化链表长度
    this.length = 0;
    // 添加方法
    this.append = function(element) {
        let node = new Node(element),
            firstNode = this.head;
        // 无头节点
        if(!firstNode){
            this.head = node;
        }else{
            // 遍历
            while(firstNode.next) {
                firstNode = firstNode.next;
            }
            // 在末尾追加该节点
            firstNode.next = node;
        }
        this.length += 1;
    }
}

var linkList1 = new LList();
linkList1.append(1);
linkList1.append(2);
linkList1.append(3);
linkList1.append(4);
linkList1.append(5);
linkList1.append(6);
linkList1.append(7);
console.log('---链表1---', linkList1);

var linkList2 = new LList();
linkList2.append(10);
linkList2.append(6);
linkList2.append(7);
console.log('---链表2---', linkList2);

// 两个单链表相交的起始节点
/*
双指针法:
    时间复杂度O(n), 空间复杂度O(1)

解题思路:
    如果A，B两链表相交，则A，B自相交点往后的链表是一致的。

解题步骤:
    1. linkList1, linkList2同步遍历,由于linkList2短,所以此时linkList1到linkList1的尾节点为linkList1与linkList2的两链表长度差
    2. linkList1继续遍历,直到遍历到尾节点;同时linkList2指向linkList1的头节点,并且同步遍历;结果: linkList1遍历到尾节点,linkList2到linkList1的头节点的长度差为两链表的长度差
    3. 将linkList1指向linkList2的头节点,继续遍历,此时两者相遇即为相交节点
*/
function twoLinkListsIntersect(linkList1, linkList2) {
    let head1 = linkList1.head,
        firstNode1 = linkList1.head,
        head2 = linkList2.head,
        firstNode2 = linkList2.head;
    // 遍历
    while(firstNode1 || firstNode2) {
        // 
        if(firstNode1 && firstNode2 && firstNode1.element === firstNode2.element) {
            return firstNode1;
        }
        firstNode1 = firstNode1 === null ? head2 : firstNode1.next;
        firstNode2 = firstNode2 === null ? head1 : firstNode2.next;
    }
    return null;
}

var intersectNode = twoLinkListsIntersect(linkList1, linkList2);
console.log('---两个单链表相交---', intersectNode);