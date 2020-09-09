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