/*
解题思路:
    从链表头开始比较,aList与bList为有序递增,所以比较aNode.element与bNode.element的较小值
    就是合并后链表的较小值(1),次小值(2)就是较小值节点的next.element与大节点的.element比较的较小值,
    同时将步骤(1)的节点的next指向改成步骤(2)的节点.
    依次递归,直到递归到aNode为null和bNode为null;
*/
// 递归函数: 比较两个节点,谁小就返回谁
var mergeTwoLists = function (l1, l2) {
    // linkList1链表遍历结束,后续的linkList2就没有必要继续遍历了,因为linkList2为有序链表,同时next指针指向后续所有节点
    if(!l1){
        return l2;
    }
    // linkList2链表遍历结束,后续的linkList1就没有必要继续遍历了,因为linkList1为有序链表,同时next指针指向后续所有节点
    if(!l2){
        return l1;
    }
    // 节点1元素小于节点2元素,继续让节点1的后继节点与节点2进行对比,且返回节点1元素
    if(l1.val <= l2.val){
        l1.next = mergeRecursive(l1.next, l2);
        return node1;
    }else{
        // 节点2元素小于节点1元素,继续让节点2的后继节点与节点1进行对比,且返回节点2元素
        l2.next = mergeRecursive(l1, l2.next);
        return l2;
    }
}