/*
198.打家劫舍: (单排)
状态转移方程:
dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i])
*/
var rob = function(nums) {
    // 边界处理
    if(!nums.length) return 0;
    let dp_0 = 0,
        dp_1 = nums[0];
    for(let i=1; i<nums.length; i++) {
        let temp = dp_1;
        dp_1 = Math.max(dp_1, dp_0 + nums[i]);
        dp_0 = temp;
    }
    return dp_1;
};
/*
213.打家劫舍: (环形)
分析:
    1. 偷窃第一个房间,则取nums.slice(0, nums.length-1)的最大金额
    2. 不偷窃第一个房间,则取nums.slice(1)的最大金额
*/
var robCircle = function(nums) {
    // 边界处理
    if(!nums.length) return 0;
    if(nums.length === 1) return nums[0];
    return Math.max(rob(nums.slice(0, nums.length - 1)), rob(nums.slice(1)))；
};