// 14.最长公共前缀: easy + 两两比较 + 遍历
var longestCommonPrefix = function(strs) {
    // 边界处理
    if(!strs.length) return '';
    // 用第一个元素作为典范
    let temp = strs[0];
    for(let i=1; i<strs.length; i++) {
        for(let j=0; j<strs[i].length; j++) {
            // 越界索引判断
            if (j > temp.length-1) break;
            if(strs[i][j] !== temp[j]) {
                temp = temp.slice(0,j);
                break;
            } 
        }
        // 针对temp的长度比遍历元素的长度大
        if(temp.length > strs[i].length) temp = strs[i];
        // 优化
        if(!temp) return '';
    }
    return temp;
};