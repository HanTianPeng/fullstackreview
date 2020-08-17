// 11.盛最多水的容器: medium + 双指针
var maxArea = function(height) {
    let left = 0,
        right = height.length - 1,
        max = 0;
    while(right !== left) {
        let area = (right - left) * (Math.min(height[left], height[right]));
        if(area > max) max = area;

        // 左边矮左移动；右边矮右移动
        height[left] < height[right] ? left++ : right--;
    }
    return max;
};

// 15.三数之和: medium + 数组排序 + 双指针夹逼 + 边界处理 + 循环break
var threeSum = function(nums) {
    // 边界判断
    if(!nums || nums.length < 3) return [];

    let result = [];
    
    // 先从小到大排序
    nums.sort((a, b) => a - b);

    // 拆分
    for(let i=0; i<nums.length; i++) {
        // 边界处理: 针对于已经排序好的数组,如果第一个元素都大于零,所以不存在三个数之和为0的组合        
        if(nums[i] > 0) break;

        // 去重: 因为nums[i]作为目标元素,在后续的查找中,都会把其余元素寻找一遍,再次回来碰到与nums[i]一样的元素，肯定在前面的后续中已经找到
        if(i > 0 && nums[i] === nums[i-1]) continue;

        // 双指针夹逼
        let left = i + 1;
            right = nums.length - 1;
        while(left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if(!sum) {
                // sum为0
                result.push([nums[i], nums[left], nums[right]]);

                // 去重
                while(left < right && nums[left] === nums[left + 1]) left++;
                while(left < right && nums[right] === nums[right - 1]) right--;
                
                // 夹逼行为
                left++;
                right--;
            }else if(sum > 0) {
                right--;
            }else{
                left++;
            }
        } 
    }
    return result;
};

// 88.合并两个有序数组: easy + 数组排序 + 双指针夹逼 + 坑位
var merge = function(nums1, m, nums2, n) {
    let left = m - 1,
        right = n - 1,
        total = m + n - 1;
    
    // 将所有nums2中元素全部放入nums1中
    while(right >= 0) {
        // nums1已经全部按照次序放入完毕,处理剩余nums2的元素
        if(left < 0) nums1[total--] = nums2[right--];
        
        // 为啥不用写else 因为nums1[left] > nums2[right]
        nums1[total--] = nums1[left] > nums2[right] ? nums1[left--] : nums2[right--];
    }
    return nums1;
};

// 680.验证回文字符串二: easy + 双指针 + slice + 函数自调用 + 拆分任务
var validPalindrome = function(s, flag = true) {
    let left = 0, right = s.length - 1;
    while (left < right && s[left] === s[right]) left++, right--;
    if (right <= left) return true;
    // slice(): 包括左边,不包括右边
    if (flag == true) return validPalindrome(s.slice(left, right), false) || validPalindrome(s.slice(left + 1, right + 1), false);
    return false;
};

// 125.验证回文字符串: easy + 正则 + 双指针 + 时间复杂度O(n) + 空间复杂度O(n)
var isPalindrome = function(s) {
    // 只考虑字母和数字字符, 忽略字母的大小写
    let formatS = s.replace(/\W|_/g, '').toLowerCase();

    // 双指针
    let left = 0,
        right = formatS.length - 1;

    while(left < right) {
        if(formatS[left] !== formatS[right]) return false;
        left++;
        right--;
    }
    return true;
};

// 125.验证回文字符串: easy + 双指针 + 正则 + 正则表达式缓存 + 时间复杂度O(n) + 空间复杂度O(1)
var isPalindrome = function(s) {
    // 双指针
    let left = 0,
        right = s.length - 1;
    
    while(left < right) {
        // /\W|_/g 中js正则表达式有缓存
        let regx = /\W|_/;
        // 左指针移动, 直到是数字或字母停止
        while(left < right && regx.test(s[left])) left++;

        // 右指针移动, 直到是数字或字母停止
        while(left < right && regx.test(s[right])) right--;

        // 判断之后再进行比较, 因为会出现奇数回文字符串
        if(left < right) {
            if(s[left].toLowerCase() !== s[right].toLowerCase()) return false;

            left++;
            right--;
        }
    }
    return true;
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