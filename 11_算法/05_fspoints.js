
// 141.环形链表一: easy 快慢指针 + floyd算法
var hasCycle = function(head) {
    let fast = head,
        slow = head;
    
    // 如果成环,快指针一定会在某个时机与慢指针相遇
    while(fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next; 

        // 判断是否相遇
        if(fast === slow) return true;
    }
    return false;
};

// 141.环形链表一: easy 快慢指针 + 边界处理
var hasCycle = function(head) {
    // 边界处理
    if(!head || !head.next) return false;

    // 定义慢指针
    let slow = head.next,
        fast = head.next.next;
    
    while(slow !== fast) {
        if(!fast || !fast.next) return false;
        // 慢指针移动一步
        slow = slow.next;
        // 快指针移动两步
        fast = fast.next.next;
    }
    return true;
};


// 142.环形链表二: medium 快慢指针 + 数学公式
/*
本道题数学公式分析:
    1. 双指针第一次相遇: 设两指针fast, slow指向链表head, fast每轮走2步, slow每轮走1步;
        第一种结果: fast指针走过链表末端,说明链表无环,直接返回null;
            TIPS: 若有环,两指针一定会相遇,因为每走1轮,fast与slow的间距+1,fast终会追上slow;
        第二种结果: 当fast === slow时.两指针在环中第一次相遇,下面分析此时fast与slow走过的步数关系:
            > 设链表共有a + b个节点,其中链表头部到链表入口有a个节点(不计链表入口节点), 链表环有b个节点(这里需要注意,a和b是未知数);
            > 假设两指针分别走了f, s步;则会存在以下关系:
                1. fast 走的步数是slow步数的2倍, 即 f = 2s
                2. fast 比slow多走了n个环的长度, 即 f = s + nb (难理解些: 双指针都走过a步,然后在环内绕圈直到重合, 重合时 fast比slow多走环的长度整数倍)
                3. 以上公式减法运算: s = nb, 即fast和slow指针分别走了2n, n个环的周长(n是未知数,不同链表的情况不一样)
            > 如果让指针从链表头部一直向前走并统计步数k,那么所有走到链表入口节点时的步数是 k = a + nb(先走a步到入口节点,之后每绕1圈环(b步)都会再次到入口节点)
            > 而目前, slow 指针走过的步数为nb步,与fast指针第一次相遇; 因此,我们只要想办法让slow再走a步停下来,就可以到环的入口
            > 此时, 我们构建一个新指针,此指针和slow一起向前走a步后,两则在入口节点重合;即该指针从head开始
*/
var detectCycle = function(head) {
    // 创建快慢指针
    let fast = head,
        slow = head;
    
    while(fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;

        // fast追上slow,第一次相遇
        if(fast === slow) {
            // 重新从头部派出一个新的指针,陪伴slow指针走a步，在入口节点相遇
            fast = head;
            while(slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            // slow与新fast在入口节点相遇
            return slow;
        } 
    }
    return null;
};

// 142.环形链表二: medium 快慢指针 + 边界处理 + 数学公式
var detectCycle = function(head) {
    // 边界处理
    if(!head || !head.next) return null;

    // 定义快慢指针
    // 问题一: 为什么要提前走: 因为快慢指针相遇的判断为fast === slow;这种判断条件,就需要提前走
    // 问题二: 提前走,为什么慢指针先走一步,快指针先走两步: 这里只是为了推导入口节点的公式;如果是环形链表一题;可以只需要快指针先走,慢指针不走
    let slow = head.next,
        fast = head.next.next;
    
    // floyd算法: 如果成环,快指针一定会在某个时机与慢指针相遇
    while(fast !== slow) {
        if(!fast || !fast.next) return null;
        slow = slow.next;
        fast = fast.next.next;
    }

    // 数学公式
    fast = head;
    while(fast !== slow) {
        fast = fast.next;
        slow = slow.next;
    }
    return slow;
};

// 83.删除排序链表中的重复元素 easy + 快慢指针 + 边界处理
var deleteDuplicates = function(head) {
    // 边界处理
    if(!head || !head.next) return head;

    // 快慢指针
    let slow = head,
        fast = head.next;
    
    while(fast) {
        // 慢指针只有在与快指针的val不相等的时候才继续前进
        if(fast.val !==  slow.val) slow = slow.next;
        // 快指针一直往前走
        fast = fast.next;

        // 只要快慢指针间隔一个节点,就调整慢指针的next指向
        if(slow.next !== fast) slow.next = fast;
    }
    return head;
};

// 83.删除排序链表中的重复项: easy + 遍历 + 排序条件 + 删除链表中的节点
var deleteDuplicates = function(head) {
    // 边界处理
    if(!head || !head.next) return head;

    // 定义遍历指针
    let prev = null,
        cur = head;

    // 遍历
    while(cur) {
        // 前提条件: 排序链表 重复元素删除---删除链表中的节点
        if(prev && prev.val === cur.val) {
            prev.next = cur.next;
        }else {
            prev = cur;
        }
        cur = cur.next;
    }
    return head;
};

// 83.删除排序链表中的重复元素 easy + 快慢指针 + 边界处理
var deleteDuplicates = function(head) {
    // 边界处理
    if(!head || !head.next) return head;

    // 快慢指针
    let slow = head,
        fast = head.next;
    
    while(fast) {
        // 重复元素: 只需要走快指针
        if(fast.val === slow.val) {
            let temp = fast.val;
            while(fast && temp === fast.val) {
                fast = fast.next;
            }
        }else {
            // 非重复元素: 快慢指针并行前进
            fast = fast.next;
            slow = slow.next;
        }

        // 快慢指针存在间隔: 则需要删除中间重复项
        if(slow.next !== fast) slow.next = fast;
    }
    // 边界处理: 第一个节点与第二个节点重复
    if(slow.next !== fast) slow.next = fast;

    return head;
};

// 82.删除排序链表中的重复元素二 medium + 快慢指针 + 思维逻辑(向前思维改变成向后思维) + 边界问题 + 哨兵节点
var deleteDuplicates = function(head) {
    // 边界处理
    if(!head || !head.next) return head;

    // 创建一个哨兵节点
    let node = new ListNode(-1);
    node.next = head;

    // 快慢指针
    let slow = node,
        fast = node.next;
    
    while(fast) {
        // 判断是否有相等节点
        if(fast.next && fast.val === fast.next.val) {
            let temp = fast.val;
            while(fast && temp === fast.val) {
                fast = fast.next;
            }
        }else{
            // 快慢指针各走异步
            slow = slow.next;
            fast = fast.next;
        }
        // slow.next指向中间删除的重复元素
        if(slow.next !== fast) slow.next = fast;
    }
    return node.next;
};

// 876.链表的中间节点: easy + 快慢指针 + 边界处理
var middleNode = function(head) {
    // 边界处理
    if(!head || !head.next) return head;

    // 快慢指针
    let slow = head,
        fast = head;
    
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
};

// 19.删除链表的倒数第N个节点: midium + 快慢指针 + 边界处理 + 哨兵节点
var removeNthFromEnd = function(head, n) {
    // 边界处理
    if(n <= 0 || !head) return head;

    // 创建一个哨兵节点
    let node = new ListNode(-1);
    node.next = head;

    // 创建一个快指针,快指针先走n步
    fast = node;
    while(n > 0) {
        fast = fast.next;
        n--;
    }

    // 创建一个慢指针
    let slow = node;

    // 快慢指针并行前进
    while(fast && fast.next) {
        fast = fast.next;
        slow = slow.next;
    }
    
    // 这里面不存在slow为null的情况, 因为slow为null的时候, n为0, 在上面已经做了边界处理
    slow.next = slow.next.next;
    return node.next;
};