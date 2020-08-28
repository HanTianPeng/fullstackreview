/*
任何用动态规划的问题都能用递归
    从子问题入手, 解决原问题, 分两种方法: 自顶向下(递归) / 自底向上(动态规划)
    递归: 借助了函数调用自己实现, 是程序解决问题的方式, 它不会记忆解
    动态规划: 利用迭代将结果存在数组中, 从数组0位开始顺序往后计算
    递归的缺点在于包含重复的子问题, 动态规划的效率更高

动态规划局限性:
    动态规划相比于递归, 有时候不太好理解, 或则边界情况比较难确定
    而且必须是一步步紧邻的, 连续地计算

    结合了记忆化的递归, 灵活很多, 它在递归基础上稍作修改即可, 有时候更好理解, 也少了局限性, 不好用动态规划一定能用它
*/
 // 70.爬楼梯: easy + 动态规划
 var climbStairs = function(n) {
    let dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;

    for(let i=2; i<dp.length; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
};
// 70. 爬楼梯: easy + 动态规划
var climbStairs = function(n) {
    let n0 = 1,
        n1 = 1;
    // 动态规划
    for(let i=2; i<=n; i++) {
        let temp = n1;
        n1 = n0 + n1;
        n0 = temp;
    }
    return n1;
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
        dp[i] = Math.min(dp[i-2], dp[i]) + cost[i]
*/
var minCostClimbingStairs = function(cost) {
    let n = cost.length,
        n1 = cost0,
        n2 = cost1;
    // 遍历
    for(let i=2; i<n; i++) {
        let temp = n2;
        n2 = Math.min(n1, n2) + cost[i];
        n1 = temp;
    }
    return Math.min(n1, n2);
};

// 509.斐波那契数: easy + DP + 时间复杂度(n)
var fib = function(N) {
    if(N <= 0) return 0;

    if(N === 1) return 1;

    let positionN1 = 0,
        positionN2 = 1,
        count = 2;

    while(count <= N) {
        let temp = positionN2;
        positionN2 = positionN1 + positionN2;
        positionN1 = temp;
        count++;
    }
    return positionN2;
};

// 509.斐波那契数: easy + 递归 + 时间复杂度(2^n)
var fib = function(N) {
    if(N <= 0) return 0;

    if(N === 1) return 1;

    return fib(N-1) + fib(N-2);
    
};