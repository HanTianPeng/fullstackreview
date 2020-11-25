/*
299.猜数字游戏: medium + hash
eg:
1123 0111
公牛: 1A
奶牛: 1B
核心思想: 所以为数字; 值为出现的次数
*/
var getHint = function(secret, guess) {
    let bull = cow = 0,
        hash = new Array(10).fill(0);
    // 遍历
    for(let i=0; i<secret.length; i++) {
        // 索引与值都相等的情况,公牛+1
        if(secret.charAt(i) === guess.charAt(i)) {
            bull++;
        }else {
            // 先在guess中出现的数字，所以数量为负数
            if(hash[secret.charAt(i)]++ < 0) cow++;
            // 先在secret中出现的数字,所以数量为正数
            if(hash[guess.charAt(i)]-- > 0) cow++;

        }
    }
    return bull + 'A' + cow + 'B';
};
