/*
在一个给定的数组nums中，总是存在一个最大元素 。
查找数组中的最大元素是否至少是数组中每个其他数字的两倍。
如果是，则返回最大元素的索引，否则返回-1。

示例 1:
    输入: nums = [3, 6, 1, 0]
    输出: 1
    解释: 6是最大的整数, 对于数组中的其他整数,
    6大于数组中其他元素的两倍。6的索引是1, 所以我们返回1.
示例 2:
    输入: nums = [1, 2, 3, 4]
    输出: -1
    解释: 4没有超过3的两倍大, 所以我们返回 -1.
提示:
    nums 的长度范围在[1, 50].
    每个 nums[i] 的整数范围在 [0, 100].
*/
// 暴力遍历
var dominantIndex = function(nums) {
    for(let i=0; i<nums.length; i++) {
        let maxValue = nums[i],
            isValid = true;
        
        for(let j=0; j<nums.length; j++) {
            if(nums[j]*2 > maxValue && i !== j) {
                isValid = false;
            }
        }

        if(isValid) {
            return i;
        }
    }
    return -1;
}

// 找出最大与第二大的数字
var dominantIndexV2 = function(nums) {
    let max = nums[0], second = 0, maxIndex = 0;
    for(let i=1; i<nums.length; i++) {
        if(nums[i] > max) {
            [max, second] = [nums[i], max];
            maxIndex = i;
        }else if(nums[i] > second) {
            second = nums[i];
        }
    }

    // 比较最大与第二大
    if(second*2 > max) {
        return -1;
    }
    return maxIndex;
}