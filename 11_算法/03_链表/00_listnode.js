// 707.设计链表: medium
var ListNode = function(val, next=null) {
    // 节点函数
    this.val = val;
    this.next = next;
}

var MyLinkedList = function() {
    // 链表函数
    this.head = new ListNode('head');  // 哨兵节点
    // 尾节点
    this.end = this.head;
    // 节点数
    this.len = 0;
};


/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    // 边界处理
    if(index >= this.len || index < 0) return -1;

    // 极端判断 - 获取尾节点
    if(index === this.len - 1) return this.end.val;

    // 极端判断 - 获取头节点
    if(index === 0) return this.head.next.val;

    // 获取中间节点
    let target = this.head.next;
    while(index-- > 0) {
        target = target.next;
    }
    return target.val;
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    // 创建一个新节点: 头部添加，其next节点就是上一次链表的头节点
    let target = new ListNode(val, this.head.next);
    // 将这个新节点挂在哨兵节点的后面,成为新的头节点
    this.head.next = target;
    // 头部添加,尾节点在长度为0的时候就已经固定下来了
    if(this.len === 0) this.end = target;
    this.len++;
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    // 创建一个新节点: 尾部添加, 其next节点永远指向null
    let target = new ListNode(val);
    // 将上一次链表的尾节点的next指向这个新节点,使其成为新的尾节点
    this.end.next = target;
    // 新节点成为新的尾节点
    this.end = this.end.next;
    this.len++;
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    // 边界判断
    if(index < 0 || index > this.len) return ;

    // 极端判断
    if(index === 0) {
        // 头部添加
        this.addAtHead(val);
    }else if(index === this.len) {
        // 尾部添加
        this.addAtTail(val);
    } else {
        // 中间添加
        let target = this.head;
        while(index-- > 0) {
            target = target.next;
        }
        target.next = new ListNode(val, target.next);
        this.len++;
    }
};

/**
 * Delete the index-th node in the linked list, if the index is valid. 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    // 边界判断
    if(this.len === 0 || index >= this.len || index < 0) return ;

    let target = this.head;
    while(index-- > 0) {
        target = target.next;
    }

    if(target.next === this.end) this.end = target;
    target.next = target.next.next;
    this.len--;
};


// 237.删除链表中的节点: easy + 换位思考(将当前被删除的节点替换成下一个节点)
var deleteNode = function(node) {
    // 将当前被删除的节点值,替换成下一个节点的值
    // 将当前被删除的节点next指向,替换成下一个节点的next的指向
    node.val = node.next.val;
    node.next = node.next.next;
    // 不能返回当前node
};

// 206.反转链表: easy + 指针指向变更 + 遍历
var reverseList = function(head) {
    // 定义一个pre,将pre返回即为反转后的链表
    let pre = null,
        cur = head;
    
    while(cur) {
        // 临时保留当前节点的下一个节点
        let temp = cur.next;
        // 将当前节点的next指针指向pre
        cur.next = pre;
        // 将当前节点设置为pre
        pre = cur;
        // 将当前节点设置为上述临时保存的节点,继续指针右移动
        cur = temp;
    }
    return pre;
};

// 203.移除链表元素: easy + 改变指针指向 + 哨兵节点
var removeElements = function(head, val) {
    // 边界处理
    if(!head) return head;

    let node = new ListNode(-1);
    node.next = head;

    let cur = node.next,
        prev = node;
        
    // 遍历
    while(cur) {
        cur.val === val ? prev.next = cur.next : prev = cur;
        cur = cur.next;
    }
    return node.next;
};

// 160.相交链表: easy + 双指针 + 循环截止点
var getIntersectionNode = function(headA, headB) {
    // 双指针
    let slow = headA,
        fast = headB;

    // 每个指针最多走 headA + headB 的步骤 （等于 slow 和 fast同时达到彼此的终点, 中途没有相遇, 则永远不会相遇）
    while(slow || fast) {
        if(slow && fast && fast === slow) return slow; 
        fast = fast ? fast.next : headA;
        slow = slow ? slow.next : headB;
    }
    return null;
};

// 328.奇偶链表: medium + 双指针
var oddEvenList = function(head) {
    if(!head || !head.next) return head;

    let fast = head.next,
        fastHead = fast,  // 偶数节点
        slow = head;  // 奇数节点

    while(fast && fast.next) {
        // 奇数节点
        slow.next = fast.next;
        slow = slow.next;
        // 偶数节点
        fast.next = slow.next;
        fast = fast.next;
    }
    // head记录的是奇数节点 head.next记录的是偶数节点
    // 将奇数节点的最后一个节点的next指针指向偶数节点的第一个节点
    slow.next = fastHead;
    return head;
};

// 21.合并两个有序链表: easy + 递归
var mergeTwoLists = function(l1, l2) {
    // l1遍历完成,剩余l2全部返回
    if(!l1) return l2;
    
    // l2遍历完成,剩余l1全部返回
    if(!l2) return l1;

    // 如果l1.val比l2.val小,则返回l1,并且将l1的next指针指向l1.next与l2比较后的小的那个节点
    if(l1.val <= l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    }else {
        // 如果l2.val比l1.val小,则返回l2,并且将l2的next指针指向l2.next与l1比较后的小的那个节点
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
};

// 24.两两交换链表中的节点: medium + 递归 + 反转链表 + 边界处理
var swapPairs = function(head) {
    let pre = null,
        cur = head;
    
    // 边界处理
    if(!head) return null;
    
    // k = 2 进行反转链表
    for(let i=0; i<2; i++) {
        // 边界处理-如果不满足两个,则直接返回，因为后续也不需要反转
        if(!cur) return head; 
        // 可以在进行是否满足2个的自子链表判断的同时进行反转链表操作;仅仅只是因为2这个数字
        let temp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = temp;
    }
    head.next = swapPairs(cur);
    return pre;
};

// 25.k个一组翻转链表: hard + 递归 + 反转链表 + 两两交换链表中的节点 + 边界处理
var reverseKGroup = function(head, k) {
    // 用户进行链表转换
    let pre = null,
        cur = head,
        p = head;
    
    // 查找长度是否满足反转的数量
    for(let i=0; i<k; i++) {
        // 边界处理
        if(p === null) return head;
        p = p.next;
    }

    // 对该k个链表元素进行反转
    for(let j=0; j<k; j++) {
        let temp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = temp;
    }

    // 反转后,head已经成为当前反转后的最后一个元素,然后其next指向为下一个递归的开始点
    // 同时, pre已经是第一个k组原链表的最后一个元素,cur是下一个k组链表的未翻转前的第一个元素
    head.next = reverseKGroup(cur, k);
    return pre;
};

// 合并k个排序链表: hard + 分治管理 + 合并两个有序链表 + 递归
var mergeKLists = function(lists) {
    // 边界处理
    if(!lists.length) return null;
    if(lists.length === 1) return lists[0];

    // 拆分
    let mid = Math.floor(lists.length / 2),
        left = lists.slice(0, mid),
        right = lists.slice(mid, lists.length);

    // 合并两个有序链表
    let mergeTwoLists = (l1, l2) => {
        if(!l1) return l2;

        if(!l2) return l1;

        if(l1.val <= l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        }else {
            l2.next = mergeTwoLists(l1, l2.next);
            return l2;
        }
    };
    
    return mergeTwoLists(mergeKLists(left), mergeKLists(right));
};


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