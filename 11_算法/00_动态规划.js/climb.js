/*
70. 爬楼梯:(方案总和)
状态转移方程:
dp[i] = dp[i-1] + dp[i-2]
*/
var climbStairs = function(n) {
    if(n <= 0) return 0;
    let dp_0 = 1,
        dp_1 = 1;
    // 动态规划
    for(let i=2; i<=n; i++) {
        let temp = dp_1;
        dp_1 = dp_0 + dp_1;
        dp_0 = temp;
    }
    return dp_1;
};
// 746. 使用最小花费爬楼梯
/*
题目理解:
    1. 第i级台阶是第i-1级台阶的阶梯顶部
    2. 踏上第i级台阶需要花费cost[i];直接迈一大步跨过而不踏上去则不用花费
    3. 楼梯顶部在数组之外，如果数组长度为len，那么楼梯订单就在下标为len的地方
定义子问题:
    踏上第i级台阶的体力消耗为到达前两个台阶的最小体力消耗再加上本层体力消耗
        最后迈一步: dp[i-1] + dp[i]
        最后迈两步: dp[i-2] + dp[i]
    实现需要反复执行解决的子问题
        dp[i] = Math.min(dp[i-2], dp[i-1]) + cost[i]
*/
var minCostClimbingStairs = function(cost) {
    let dp_0 = cost[0],
        dp_1 = cost[1];
    // 遍历
    for(let i=2; i<cost.length; i++) {
        let temp = dp_1;
        dp_1 = Math.min(dp_0, dp_1) + cost[i];
        dp_0 = temp;
    }
    return Math.min(dp_0, dp_1);
};