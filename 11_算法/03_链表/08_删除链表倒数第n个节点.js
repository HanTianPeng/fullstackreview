// 删除链表倒数第n个节点
var removeNthFromEnd = function(head, n) {
    let slow = head,
        fast = head;
    
    // 快指针先走n步骤(先减少)---保证链表长度为n删除倒数第n个的业务
    while(--n) {
        fast = fast.next;
    }

    // n长度等于链表长度，则此时fast为尾节点(删除尾节点)
    if(fast.next === null) {
        return head.next;
    }

    // 快指针再走一步,这样与慢指针同步,因为慢指针默认head,相当于提前走了一步
    fast = fast.next;

    while(fast && fast.next){
        fast = fast.next;
        slow = slow.next;
    }

    slow.next = slow.next.next;
    return head;
}