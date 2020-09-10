// 1.两数之和: easy + 哈希表
var twoSum = function(nums, target) {
    // 使用hashMap方式解决
    let targetMap = {};
    for(let i=0; i<nums.length; i++) {
        let diffValue = target - nums[i];
        if(diffValue in targetMap) {
            return [targetMap[diffValue], i];
        }
        targetMap[nums[i]] = i;
    }
};

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
/*
    66.加一: easy
    关键点:
        1. 个位数为9，需要在首位加一个新元素1
        2. 个位数不为0, 需要在末尾的数字进行+1的加法运算
*/
var plusOne = function(digits) {
    digits = digits + 1;
    for(var i=digits.length -1; i>=0; i--){
        digits[i] = digits[i] + 1;
        digits[i] = digits[i] % 10;
        if(num != 0){
            return digits;
        }
    }
    digits.splice(0, 0, 1);
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

// 189.旋转数组: easy + 占座 + do-while循环
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
// 189.旋转数组: easy + 占座 + 暴力破解
var rotate = function(nums, k){
    if(k <= 0) return nums;
    k = k % nums.length;
    // 旋转k次
    for(var i=0; i<k; i++) {
        var init = nums[nums.length - 1];
        for(var j=0; j<nums.length; j++){
            var temp = nums[j];
            nums[j] = init;
            init = temp;
        }
    }
};
/*
    189.旋转数组: 时间复杂度O(n),n个元素被反转n次; 空间复杂度O(1)
        关键点:
            1. 元素数组 [1,2,3,4,5,6,7]
            2. 反转所有数字[7,6,5,4,3,2,1]
            3. 反转前k个数字[5,6,7, 4,3,2,1]
            4. 反转后n-k个数字[5,6,7,1,2,3,4]
*/
function reverseNum(nums, start, end) {
    while(start < end){
        var temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}
var rotate = function(nums, k) {
    k = k % nums.length;
    reverseNum(nums, 0, nums.length-1);
    reverseNum(nums, 0, k-1);
    reverseNum(nums, k, nums.length - 1);
    return nums;
};

// 268.缺失数字: easy + 排序数组 + 遍历 + 边界问题
var missingNumber = function(nums) {
    // 排序
    nums.sort((a, b) => a - b);
    // 判断是否以0开始
    if(nums[0] > 0) return 0;
    // 判断序列是否断层
    for(let i=1; i<nums.length; i++) {
        if(nums[i] - nums[i-1] > 1) {
            return nums[i-1] + 1;
        }
    }
    // 未断层序列,边界处理
    return nums[nums.length - 1] + 1;
};

// 携程算法题, 腾讯算法题
// 将数组扁平化并且去除其中重复数据，最终得到一个升序且不重复的数组
function flatList(arr) {
    return Array.from(new Set(arr.flat(Infinity))).sort((a, b) => {return a - b;});
}

function flatListApi(arr) {
    return Array.from(new Set(arr.toString().split(','))).sort((a, b) => {return a - b;}).map(Number);
}