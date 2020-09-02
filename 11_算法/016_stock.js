/*
121. 买卖股票的最佳时机:(只允许交易一次)
公式推导:
    k: 买入即减一
    dp_i_k_0 = Math.max(dp_i-1_k_0, dp_i-1_k_1 + prices[i])
    dp_i_k_1 = Math.max(dp_i-1_k_1, dp_i-1_k_1_0 - prices[i])
*/
var maxProfit = function(prices) {
    let profitOut = 0,
        profitIn = -prices[0];
    // 遍历
    for(let i=1; i<prices.length; i++) {
        profitOut = Math.max(profitOut, profitIn + prices[i]);
        profitIn = Math.max(profitIn, -prices[i]);
    }
    return profitOut;
};
// 121. 买卖股票的最佳时机(只允许交易一次): easy + 动态规划 + 最小值最大值思想 + 与(746.使用最小花费爬楼梯)类似 
var maxProfit = function(prices) {
    let max = 0, minPrice = prices[0];
    for(let i=1; i<prices.length; i++) {
        // 最小值
        minPrice = Math.min(prices[i], minPrice);
        // 差值的最大值
        max = Math.max(max, prices[i] - minPrice);
    }
    return max;
};
/*
122. 买卖股票的最佳时机:(多次交易)
*/
var maxProfit = function(prices) {
    let profitOut = 0,
        profitIn = -prices[0];
    // 遍历
    for(let i=1; i<prices.length; i++) {
        let temp = profitOut;
        profitOut = Math.max(profitOut, profitIn + prices[i]);
        profitIn = Math.max(profitIn, temp - prices[i]);
    }
    return profitOut;
};
// 122. 买卖股票的最佳时机(多次交易): easy + 贪婪算法
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
// 122. 买卖股票的最佳时机(多次交易): easy + 贪婪算法 + 谷买入峰卖出
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
/*
309. 买卖股票的最佳时机:(冷冻期)
*/
var maxProfit = function(prices) {
    let profitOut = 0,
        profitIn = -prices[0]
        profitFreeze = 0;
    // 遍历
    for(let i=1; i<prices.length; i++) {
        let temp = profitOut;
        profitOut = Math.max(profitOut, profitIn + prices[i]);
        profitIn = Math.max(profitIn, profitFreeze - prices[i]);
        // 冻结期的利润
        profitFreeze = temp;
    }
    return profitOut;
};
/*
714. 买卖股票的最佳时机:(手续费)
*/
var maxProfit = function(prices, fee) {
    let profitOut = 0,
        profitIn = -prices[0];
    // 遍历
    for(let i=1; i<prices.length; i++) {
        let temp = profitOut;
        profitOut = Math.max(profitOut, profitIn + prices[i] - fee);
        profitIn = Math.max(profitIn, temp - prices[i]);
    }
    return profitOut;
};
/*
123. 买卖股票的最佳时机:(2次交易)
*/
var maxProfit = function(prices) {
    // 初始化利润
    let profit = [];
    for(j=0; j<=2; j++) {
        profit[j] = {
            profitOut: 0,
            profitIn: -prices[0]
        }
    }
    // 遍历
    for(let i=0; i<prices.length; i++) {
        for(let j=1; j<=2; j++) {
            profit[j] = {
                profitOut: Math.max(profit[j].profitOut, profit[j].profitIn + prices[i]),
                profitIn: Math.max(profit[j].profitIn, profit[j-1].profitOut - prices[i])
            }
        }
    }
    return profit[2].profitOut;
};
/*
188. 买卖股票的最佳时机:(k次交易)
*/
var maxProfit = function(k, prices) {
    // 边界处理
    if(k > Math.floor(prices.length / 2)) k = Math.floor(prices.length / 2);
    // 初始化利润
    let profit = [];
    for(j=0; j<=k; j++) {
        profit[j] = {
            profitOut: 0,
            profitIn: -prices[0]
        }
    }
    // 遍历
    for(let i=0; i<prices.length; i++) {
        for(let j=1; j<=k; j++) {
            profit[j] = {
                profitOut: Math.max(profit[j].profitOut, profit[j].profitIn + prices[i]),
                profitIn: Math.max(profit[j].profitIn, profit[j-1].profitOut - prices[i])
            }
        }
    }
    return profit[k].profitOut;
};