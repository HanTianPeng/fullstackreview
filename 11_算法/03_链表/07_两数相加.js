/*
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
链接：https://leetcode-cn.com/problems/add-two-numbers

示例:
    输入: (2 -> 4 -> 3) + (5 -> 6 -> 4)
    输出: 7 -> 0 -> 8
    原因: 342 + 465 = 807
*/

/*
分析题目:
    1. 各自的位数是按照 逆序 的方式存储的; ----> 所以个位数十位数百位数等从左至右，从头至尾
*/
function ListNode(val) {
    this.val = val;
    this.next = null;
}

var addTwoNumbers = function(l1, l2) {
    // 初始化头节点
    let node = new ListNode('head'),
        add = 0,
        sum = 0,
        temp = node;
    while(l1 || l2) {
        // 进行加法运算
        sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + add;
        // 是否满十进一,并创建新节点
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
    return temp.next;
}