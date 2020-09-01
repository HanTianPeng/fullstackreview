/*
贪心算法:
    1. 在对问题求解识，总是做出在当前看来是最好的选择。
*/

// 134. 加油站: medium + 贪婪算法
var canCompleteCircuit = function(gas, cost) {
    // 假设车辆能在前i个加油站跑起来
    let run = 0;
    // 全程预计的剩余油量
    let remain = 0;
    // 起点位置
    let start = 0;
    // 遍历
    for(let i=0; i<gas.length; i++) {
        run += gas[i] - cost[i];
        remain += gas[i] - cost[i];
        // 车辆无法跑到i+1个加油站
        if(run < 0) {
            start = i + 1;
            run = 0;
        }
    }
    return remain < 0 ? -1 : start;

};

// 121.
var maxProfit = function(prices) {
    if(!prices.length) return 0;
    let dp = [[0, -prices[0]]];
    for(let i=1; i<prices.length; i++) {
        dp[i] = [];
        dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]);
        dp[i][1] = Math.max(dp[i-1][1], -prices[i]);
    }
    return dp[prices.length-1][0];
};
var maxProfit = function(prices) {
    let dp_i_0 = 0,
        dp_i_1 = Number.MIN_SAFE_INTEGER;
    for(let i=0; i<prices.length; i++) {
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
        dp_i_1 = Math.max(dp_i_1, -prices[i]);
    }
    return dp_i_0;
};
var maxProfit = function(prices) {
    let dp_i_0 = 0,
        dp_i_1 = Number.MIN_SAFE_INTEGER;
    for(let i=0; i<prices.length; i++) {
        let temp = dp_i_0;
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
        dp_i_1 = Math.max(dp_i_1,  temp-prices[i]);
    }
    return dp_i_0;
};
// 122. 买卖股票的最佳时机二: easy + 贪婪算法
var maxProfit = function(prices) {
    let max = 0;
    // 遍历
    for(let i=0; i< prices.length - 1; i++) {
        // 假设只要获利，就一直可以卖
        if(prices[i + 1] > prices[i]) {
            max += prices[i + 1] - prices[i];
        }
    }
    return max;
};
// 122. 买卖股票的最佳时机二: easy + 贪婪算法 + 谷买入峰卖出
var maxProfit = function(prices) {
    let valley = prices[0]; // 谷值
        peak = prices[0];  // 峰值
        max = 0;
        index = prices.length - 1,
        i = 0;
    while(i < index) {
        // 降
        while(prices[i] > prices[i+1] && i < index) i++;
        // 获取谷值
        valley = prices[i];
        // 涨
        while(prices[i] <= prices[i+1] && i < index) i++;
        // 获取峰值
        peak = prices[i];
        max += peak - valley;
    }
    return max;
};
// 122. 买卖股票的最佳时机二: easy + 动态规划 + 与(746.使用最小花费爬楼梯)类似
var maxProfit = function(prices) {
    let max = 0, minPrice = prices[0];
    for(let i=1; i<prices.length; i++) {
        minPrice = Math.min(prices[i], minPrice);
        max = Math.max(max, prices[i] - minPrice);
    }
    return max;
};

