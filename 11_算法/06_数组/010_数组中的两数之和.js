/*
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

示例:
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
*/ 

/*
暴力法:
    时间复杂度: O(n^2)

    空间复杂度: O(n)
*/
var twoSum = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
        diff = target - nums[i];
        for (let j = i + 1; j < nums.length; j++) {
            if (diff === nums[j]) {
                return [i, j];
            }
        }
    }
};
result = twoSum([-1, 2, -3, -4, -5], 1);
console.log(result);

/*
  哈希表法:
      时间复杂度: O(n)

      空间复杂度: O(n)
*/
function twoSumV2(nums, target) {
    var map = {};
    for (let i = 0; i < nums.length; i++) {
        var diff = nums[i] - target;
        // 这里前面做判断: 因为两个数相加,肯定一个数在前面,一个数在后面
        if (diff in map) {
            return [map[diff], i];
        }
        map[nums[i]] = i;
    }
}