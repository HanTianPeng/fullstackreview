// 66.加一: easy + 遍历 + unshift + 个位加一 + 十位进一 + 位运算
var plusOne = function(digits) {
    let sum = 0,
        isAdd = 0
        newDigits = [];

    for(let i=digits.length-1; i>=0; i--) {
        // 个位数字加-
        sum = i === digits.length - 1 ? digits[i] + 1 + isAdd : digits[i] + isAdd;
        isAdd = sum >= 10 ? 1 : 0;
        newDigits.unshift(sum % 10);
    }

    // 是否进十
    isAdd && newDigits.unshift(isAdd);
    return newDigits;
};

// 26.删除排序数组中的重复项: easy + 排序数组 + 遍历 + 标识位 + splice
var removeDuplicates = function(nums) {
    // 边界处理
    if(nums.length <= 1) return nums.length;

    let index = 1;

    // 遍历
    for(let i=1; i<nums.length; i++) {
        if(nums[i] !== nums[i-1]) {
            nums[index] = nums[i];
            index++;
        }
    }
    // 删除后面元素
    nums.splice(index, nums.length - index);
    return nums.length;
};

 // 283.移动零: easy + 遍历 + 标志位
 var moveZeroes = function(nums) {
    // 设置一个标志位
    let j = 0;
    // 遍历
    for(let i=0; i<nums.length; i++) {
        if(nums[i] !== 0) {
            nums[j] = nums[i];
            if(i !== j) {
                nums[i] = 0;
            }
            j++;
        }
    }
    return nums;
};

// 189.旋转数组: medium + 占座 + do-while循环
var rotate = function(nums, k) {
    // 边界处理
    if(!nums) return [];

    // 优化旋转次数
    k = k % nums.length;

    // 每个元素换位一次
    let count = 0;

    // 开始换位
    for(let i=0; count<nums.length; i++) {
        // 从第一个元素开始换位
        let current = i,
            prev = nums[current];
        
        // 跳棋, 回到原来位置停止
        do {
            let next = (current + k) % nums.length,
                temp = nums[next];
            
            // 将当前元素开始跳到后一个位置
            nums[next] = prev;
            current = next;
            prev = temp;
            count++;
        } while(
            current !== i
        );
    }
    return nums;
};

// 268.缺失数字: easy + 排序数组 + 遍历 + 边界问题
var missingNumber = function(nums) {
    // 排序
    nums.sort((a, b) => a - b);

    // 判断是否以0开始
    if(nums[0] > 0) {
        return 0;
    }

    // 判断序列是否断层
    for(let i=1; i<nums.length; i++) {
        if(nums[i] - nums[i-1] > 1) {
            return nums[i-1] + 1;
        }
    }

    // 未断层序列,边界处理
    return nums[nums.length - 1] + 1;
};

// 14.最长公共前缀: easy + 两两比较 + 遍历
var longestCommonPrefix = function(strs) {
    // 边界处理
    if(!strs.length) return '';

    // 用第一个元素作为典范
    let temp = strs[0];

    for(let i=1; i<strs.length; i++) {
        for(let j=0; j<strs[i].length; j++) {
            // 越界索引判断
            if (j > temp.length-1) break;
            if(strs[i][j] !== temp[j]) {
                temp = temp.slice(0,j);
                break;
            } 
        }
        // 针对temp的长度比遍历元素的长度大
        if(temp.length > strs[i].length) temp = strs[i];
        // 优化
        if(!temp) return '';
    }
    return temp;
};

// 125.验证回文串: easy + 反转 + 正则
var isPalindrome = function(s) {
    // 过滤掉除了字母或数字的其他字符
    let filterOnlyNumStr = (s) => {
        let regx = /\W|_/g;
        return s.replace(regx, '').toLowerCase();
    };
    // 只考虑字母和数字字符 忽略字母的大小写
    let onlyNumStr = filterOnlyNumStr(s);

    // 反转字符串
    let reverseStr = (s) => {
        let reverseS = '';
        for(let i=s.length-1; i>=0; i--) {
            reverseS += s[i];
        }
        return reverseS;
    };

    // 反转与之相等
    return onlyNumStr === reverseStr(onlyNumStr);
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

