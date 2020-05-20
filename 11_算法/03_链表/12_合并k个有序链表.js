/*
合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。

示例:
输入:
[
  1->4->5,
  1->3->4,
  2->6
]
输出: 1->1->2->3->4->4->5->6

解题思路:
    分治管理: 一种将问题分解为较小子问题的模式,然后将其递归求解并组合起来
*/

function ListNode(val) {
    this.val = val;
    this.next = null;
}

var mergeKLists = function(lists) {
    if(lists.length === 1) {
        return lists[0];
    }
    if(lists.length === 0) {
        return null;
    }
    return getOneList(lists);
};

// 分治管理递归函数
var getOneList = function(lists) {
    let length = lists.length;
    if(length === 1) {
        return lists[0];
    }
    let mid = Math.floor(length / 2),
        // 返回一个新的数组对象,这个对象是一个有begin和end决定的原数组的浅拷贝(包括begin,不包括end);原数组不会被改变
        leftLists = lists.slice(0, mid),
        rightLists = lists.slice(mid, length);
    return mergeTwoLists(getOneList(leftLists), getOneList(rightLists));
}

// 合并两个有序链表
var mergeTwoLists = function(l1, l2){
    if(l1 === null) {
        return l2;
    }
    if(l2 === null) {
        return l1;
    }
    if(l1.val <= l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    }else{
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
}