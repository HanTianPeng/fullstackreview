/*
70. 爬楼梯:(方案总和)
1.问题拆解:
达到第n个楼梯可以从第n-1个楼梯和第n-2个楼梯到达
2.状态转移方程:
dp[i] = dp[i-1] + dp[i-2]
3.边界处理:
dp0 = 1
dp1 = 1
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

/*
120.三角形最小路径和
[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
1.问题拆解:
达到[i][j]这个元素,经过这个元素的路径肯定也会经过[i-1][j]或则[i-1][j+1];
第一种方案: 从上向下考虑,但是对于下面元素的最左边或则最右边元素只会有一条路径
第二种方案: 从下向上考虑,到达上面元素的是下面左边或则右边两条路径的最小值
2.状态转移方程:
dp[i][j] = Math.min(dp[i+1][j], dp[i+1][j+1]) + triangle[i][j]
dp[i][j]: 当前行当前列
dp[i+1][j]: 下一行当前列的路径总和(向下并且向左移动)
dp[i+1][j+1]:下一行下一列的路径总和(向下并且向右移动)
triangle[i][j]: 自己所在的位置
[
     [2+3+5+1],
    [3+5+1,4+5+1],
   [6+1,5+1,7+3],
  [4,1,8,3]
 [0,0,0,0,0]
]
3.边界问题:
i = triangle.length - 1; 无法向下
4.优化点:
由于每层只会用到上一次计算的那层数据,因此不需要利用二维数组
*/
var minimumTotal = function(triangle) {
    // 自底向上; i=triangle.length - 2;边界问题处理
    for(let i=triangle.length - 2; i>=0; i--) {
        for(let j=0; j<triangle[i].length; j++) {
            triangle[i][j] = Math.min(triangle[i+1][j], triangle[i+1][j+1]) + triangle[i][j];
        }
    }
    return triangle[0][0];
}; 
// 自底向上,其实每次只会用到上一层数据,因此不需要二位数组存储所有可能情况
var minimumTotal = function(triangle) {
    // triangle.length+1:边界问题
    let dp = new Array(triangle.length + 1).fill(0);
    for(let i=triangle.length-1; i>=0; i--) {
        for(j=0; j<triangle.length; j++) {
            dp[j] = Math.min(dp[j], dp[j+1]) + triangle[i][j]; 
        }
    }
    return dp[0];
};

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