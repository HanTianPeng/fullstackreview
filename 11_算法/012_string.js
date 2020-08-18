// 125.验证回文串: easy + 反转 + 正则
var isPalindrome = function(s) {
    // 过滤掉除了字母或数字的其他字符
    let filterOnlyNumStr = (s) => {
        let regx = /\W|_/g;
        return s.replace(regx, '').toLowerCase();
    };
    // 只考虑字母和数字字符 忽略字母的大小写
    let onlyNumStr = filterOnlyNumStr(s);

    // 反转字符串
    let reverseStr = (s) => {
        let reverseS = '';
        for(let i=s.length-1; i>=0; i--) {
            reverseS += s[i];
        }
        return reverseS;
    };

    // 反转与之相等
    return onlyNumStr === reverseStr(onlyNumStr);
};

// 125.验证回文字符串: easy + 正则 + 双指针 + 时间复杂度O(n) + 空间复杂度O(n)
var isPalindrome = function(s) {
    // 只考虑字母和数字字符, 忽略字母的大小写
    let formatS = s.replace(/\W|_/g, '').toLowerCase();

    // 双指针
    let left = 0,
        right = formatS.length - 1;

    while(left < right) {
        if(formatS[left] !== formatS[right]) return false;
        left++;
        right--;
    }
    return true;
};

// 125.验证回文字符串: easy + 双指针 + 正则 + 正则表达式缓存 + 时间复杂度O(n) + 空间复杂度O(1)
var isPalindrome = function(s) {
    // 双指针
    let left = 0,
        right = s.length - 1;
    
    while(left < right) {
        // /\W|_/g 中js正则表达式有缓存
        let regx = /\W|_/;
        // 左指针移动, 直到是数字或字母停止
        while(left < right && regx.test(s[left])) left++;

        // 右指针移动, 直到是数字或字母停止
        while(left < right && regx.test(s[right])) right--;

        // 判断之后再进行比较, 因为会出现奇数回文字符串
        if(left < right) {
            if(s[left].toLowerCase() !== s[right].toLowerCase()) return false;

            left++;
            right--;
        }
    }
    return true;
};

// 680.验证回文字符串二: easy + 双指针 + slice + 函数自调用 + 拆分任务
var validPalindrome = function(s, flag = true) {
    let left = 0, right = s.length - 1;
    while (left < right && s[left] === s[right]) left++, right--;
    if (right <= left) return true;
    // slice(): 包括左边,不包括右边
    if (flag == true) return validPalindrome(s.slice(left, right), false) || validPalindrome(s.slice(left + 1, right + 1), false);
    return false;
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

// 14.最长公共前缀: easy + 分治管理 + slice + charAt
var longestCommonPrefix = function(strs) {
    if(!strs.length) return '';

    if(strs.length === 1) return strs[0];

    // 分治管理
    let mid = Math.floor(strs.length / 2),
        left = strs.slice(0, mid),
        right = strs.slice(mid, strs.length);
    return twoStrLongestCommonPrefix(longestCommonPrefix(left), longestCommonPrefix(right));
};

// 求两个字符串的最长公共前缀: slice
var twoStrLongestCommonPrefix = function(str1, str2) {
    let tempFor = str1.length <= str2.length ? str1 : str2,
        temp = str1.length > str2.length ? str1 : str2;

    for(let i=0; i<tempFor.length; i++) {
        if(tempFor[i] !== temp[i]) {
            return temp.slice(0, i);
        }
    }
    return tempFor;
};

// 14.最长公共前缀: easy + 最小最大值 + for循环遍历 + substring
var longestCommonPrefix = function(strs) {
    // 边界处理
	if(strs.length === 0) return '';
	if(strs.length === 1) return strs[0];

    // 获取最大字符串和最小字符串
    let max = 0, 
		min = 0;
	for(let i=0; i<strs.length; i++) {
		if(strs[min] > strs[i]) min = i;
		if(strs[max] < strs[i]) max = i;
	}

    return getTwoStrPrefix(strs[min], strs[max]);
};

// 求两个字符串的最长公共前缀: + for循环高级写法 + substring + charAt
var getTwoStrPrefix = function(str1, str2) {
	let i = 0;
	for(; i<str1.length && i<str2.length; i++) {
		if(str1.charAt(i) !== str2.charAt(i)) {
			break;
		}
	}
	return str1.substring(0, i);
};