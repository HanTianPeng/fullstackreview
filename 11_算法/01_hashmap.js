// 1.两数之和: easy + 哈希表
var twoSum = function(nums, target) {
    // 使用hashMap方式解决
    let targetMap = {};
    for(let i=0; i<nums.length; i++) {
        let diffValue = target - nums[i];
        if(diffValue in targetMap) {
            return [targetMap[diffValue], i];
        }
        targetMap[nums[i]] = i;
    }
};

// 409.最长回文串: easy + 哈希表 + map + map判断为空
var longestPalindrome = function(s) {
    // 创建一个map
    let map = new Map(),
        count = 0;

    // 遍历
    for(let i=0; i<s.length; i++) {
        if(map.has(s[i])) {
            count += 2;
            map.delete(s[i]);

        }else{
            map.set(s[i], 1);
        }
    }

    if(map.size) count++;
    return count;
};

