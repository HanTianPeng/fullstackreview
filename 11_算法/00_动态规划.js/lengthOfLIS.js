/*
300.最长上升子序列
状态转移方程:
dp[i] = Math.max(dp[i], dp[j] + 1)
*/
var lengthOfLIS = function(nums) {
    // 边界判断
    if(!nums.length) return 0;
    let dp = new Array(nums.length).fill(1),
        max = 0;
    for(let i=0; i<nums.length; i++) {
        for(let j=0; j<i; j++) {
            if(nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        max = Math.max(dp[i], max);
    }
    return max;
};