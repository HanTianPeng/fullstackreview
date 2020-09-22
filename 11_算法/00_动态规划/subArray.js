/*
53.最大子序列和: 经典
[-2,1,-3,4,-1,2,1,-5,4]
最大子序列和:[4，-1，2，1],result=6;
1.问题拆解:
子数组看做一段区间,因此可以由起始点和终止点确定一个子数组,
两个点,我们先确定一个点,然后找另外一个点.
比如说,如果我们确定一个子数组的截止元素在i位置,
这个时候需要思考的问题:以结尾的所有子数组中,和最大的是对少？
    1. i这个位置的元素自身成为一个子数组
    2. 位置元素的值与i-1结尾的所有子数组中的和的最大值
2.状态转换方程:
dp[n] = Math.max(dp[n-1]+array[i], array[i])
dp[n] = Math.max(dp[n-1], 0) + array[i];
3.边界问题:
dp0 = Number.MIN_SAFE_INTEGER
4.优化点:
因为只需要记录前一个区段的最大值，所以通过一个变量记录即可
*/
var maxSubArray = function(nums) {
    let dp0 = Number.MIN_SAFE_INTEGER,
        max = dp0;
    for(let i=0; i<nums.length; i++) {
        dp0 = Math.max(dp0, 0) + nums[i];
        max = Math.max(max, dp0);
    }
    return max;
};