/*
263.丑数(判断是否为丑数)
丑数就是质因数只包含 2, 3, 5 的正整数。
1是特殊的丑数
*/
var isUgly = function(num) {
    // 边界处理
    if(n <= 0) return false;
    // 除以5
    while(num % 5) num = num / 5;
    // 除以3
    while(num % 3) num = num / 3;
    //除以2
    while(num % 2) num = num / 2;
    return num === 1;
};
// 264.找到第n个丑数
var nthUglyNumber = function(n) {
    if(n < 1) return 0;
    let p2 = 0,
        p3 = 0,
        p4 = 0,
        dp = new Array(n).fill(0);
    // 第一个丑数
    dp[0] = 1;
    for(let i=1; i<n; i++) {
        dp[i] = Math.min(dp[p2]*2, dp[p3]*3, dp[p5]*5);
        if(dp[i] === dp[p2]*2) p2++;
        if(dp[i] === dp[p3]*3) p3++;
        if(dp[i] === dp[p5]*5) p5++;
    }
    return dp[n-1];
};
