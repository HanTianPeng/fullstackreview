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
var threeSum = function(nums) {
    let result = [],
        targetMap = {};
    for(let i = 0; i < nums.length; i++) {
        let target = nums[i],
            valueMap = {};
        for(let j = 0; j < nums.length; j++) {
            if(i === j) {
                continue;
            }
            let diffValue = 0 - nums[j] - target;
            if(diffValue in valueMap) {
                if(target in targetMap) {
                    
                }else{
                    targetMap[targetMap] = target;
                    result.push([i, j, valueMap[diffValue]]);
                }
            }
            valueMap[diffValue] = j;
        }
    }
    return result;
};