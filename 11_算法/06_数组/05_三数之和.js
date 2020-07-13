/*
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

示例：
    给定数组 nums = [-1, 0, 1, 2, -1, -4]，

    满足要求的三元组集合为：
    [
    [-1, 0, 1],
    [-1, -1, 2]
    ]
*/
// 排序 + 双指针夹逼
var threeSum = function(nums) {
    if(!nums || nums.length < 3) return [];
    
    let result = [],
        left,
        right;
    // 先从小到大排序
    nums.sort((a, b) => a - b);

    for(let i=0; i<nums.length; i++) {
        // 已经排序好的,大于零就没有继续查找的必要
        if(nums[i] > 0) break;
        
        // 因为已经排序好了,所以可以直接去重
        if(i > 0 && nums[i] === nums[i - 1]) continue;

        left = i + 1;
        right = nums.length - 1;

        // 双指针夹逼
        while(left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if(!sum) {
                // sum为0
                result.push(nums[i], nums[left], nums[right]);

                // 去重
                while(left < right && nums[left] === nums[left + 1]) left++;
                while(left < right && nums[right] === nums[right - 1]) right--;
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