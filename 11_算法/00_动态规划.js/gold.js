/*
经典动态规划题目: 国王与金矿
1. 最优子结构:
    10个工人挖前4个矿
    10个工人中留几个人挖第五个矿,其余的挖前4个矿的最优解

2. 状态转移方程:
    F(n, w) = Math.max(F(n-1, w), F(n - 1, w - p[n - 1]) + g[n - 1])

3. 边界
    n <=1 && w < p[0]    => F(n, w) = 0
    n ==1 && w >= p[0]   => F(n, w) = g[0]
    n > 1 && w < p[n-1]  => F(n-1, w)
    n > 1 && w >= p[n-1] => Math.max(F(n-1, w), F(n-1, w-p[n-1]) + g[n-1])
*/
var getMostGold = function(n, w, g, p) {
    // n: 金矿数量 w: 工人人数 g: 金矿黄金含量 p: 金矿的用工量

    let preResult = new Array(p.length+1).fill(0),
        result = new Array(p.length+1).fill(0);

    // 初始化第一行
    for(let i=1; i<=w; i++) {
        if(i >= p[0]) preResult[i] = g[0];
    }

    // 从第二个金矿开始,遍历所有金矿
    for(let j=1; j<n; j++) {
        // 每个矿山都要去计算当前工人数时可获得的最大黄金数
        for(let k=1; k<=w; k++) {
            // 工人数不满足挖
            if(k < p[j]) {
                result[k] = preResult[k];
            }else {
                result[k] = Math.max(preResult[k], preResult[k- p[j]] + g[j]);
            }
        }
        // 拷贝下一行
        for(let i=1; i<=w; i++) {
            preResult[i] = result[i];
        }
    }
    return result[w];
};
let gold = getMostGold(5, 10, [400, 500, 200, 300, 350], [5, 5, 3, 4, 3])
console.log(gold); // 900