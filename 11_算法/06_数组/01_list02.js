// 买卖股票的最佳时机 II
var list =[7,1,5,3,6,4];
/*
    官方答案:
        关键点: 
*/

// 时间复杂度 O(n),遍历一次
// 空间复杂度O(1), 需要常量的空间
var maxProfit = function(prices){
    var maxprofit = 0;
    for(var i=0; i<prices.length; i++) {
        if(prices[i+1] > prices[i]) {
            maxprofit += prices[i+1] - prices[i];
        }
    }
    return maxprofit;
}

var maxProfit2 = function(prices) {
    var valley = prices[0]; // 谷值
    var peak = prices[0];  // 峰值
    var maxprofit = 0;
    for(var i=0; i<prices.length; i++) {
        if(prices[i] >= prices[i+1] && i < prices.length -1) {
            console.log(peak - valley, i);
            valley = prices[i+1];
        }

        if(prices[i] <= prices[i+1] && i < prices.length -1) {
            
            peak = prices[i+1];
            maxprofit += peak - valley;
        }

        if(i === prices.length - 1 && prices[i-1] <= prices[i]){
            maxprofit += peak - valley;
        }
        
    }
    
    return maxprofit;
}

console.log('最大利润===>', maxProfit2(list));

