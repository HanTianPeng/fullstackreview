/*
120.三角形最小路径和
[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
// 状态转移方程:
dp[i][j] = Math.min(dp[i+1][j], dp[i+1][j+1]) + triangle[i][j]
dp[i][j]: 当前行当前列
dp[i+1][j]: 下一行当前列的路径总和(向下并且向左移动)
dp[i+1][j+1]:下一行下一列的路径总和(向下并且向右移动)
triangle[i][j]: 自己所在的位置
// 边界问题:
i = triangle.length - 1; 无法向下
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