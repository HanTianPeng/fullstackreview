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