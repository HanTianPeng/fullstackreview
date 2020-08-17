// 14.最长公共前缀: easy + 分治管理 + slice + charAt
var longestCommonPrefix = function(strs) {
    if(!strs.length) return '';

    if(strs.length === 1) return strs[0];

    // 分治管理
    let mid = Math.floor(strs.length / 2),
        left = strs.slice(0, mid),
        right = strs.slice(mid, strs.length);
    return twoStrLongestCommonPrefix(longestCommonPrefix(left), longestCommonPrefix(right));
};


// 求两个字符串的最长公共前缀: slice
var twoStrLongestCommonPrefix = function(str1, str2) {
    let tempFor = str1.length <= str2.length ? str1 : str2,
        temp = str1.length > str2.length ? str1 : str2;

    for(let i=0; i<tempFor.length; i++) {
        if(tempFor[i] !== temp[i]) {
            return temp.slice(0, i);
        }
    }
    return tempFor;
};


// 14.最长公共前缀: easy + 最小最大值 + for循环遍历 + substring
var longestCommonPrefix = function(strs) {
    // 边界处理
	if(strs.length === 0) return '';
	if(strs.length === 1) return strs[0];

    // 获取最大字符串和最小字符串
    let max = 0, 
		min = 0;
	for(let i=0; i<strs.length; i++) {
		if(strs[min] > strs[i]) min = i;
		if(strs[max] < strs[i]) max = i;
	}

    return getTwoStrPrefix(strs[min], strs[max]);
};


// 求两个字符串的最长公共前缀: + for循环高级写法 + substring + charAt
var getTwoStrPrefix = function(str1, str2) {
	let i = 0;
	for(; i<str1.length && i<str2.length; i++) {
		if(str1.charAt(i) !== str2.charAt(i)) {
			break;
		}
	}
	return str1.substring(0, i);
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