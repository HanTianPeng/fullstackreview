
// 28.实现strStr(): easy + BF算法 + 时间复杂度O(m * n)
/*
https://www.jianshu.com/p/8b89ac5c4f2e
*/
var strStr = function(haystack, needle) {
    // 边界处理
    if(!needle.length) return 0;
    // 遍历
    let i=0, j = 0;
    while(i < haystack.length && j < needle.length) {
        if(haystack[i] === needle[j]) {
            i++;
            j++;
        }else {
            i = i - j + 1;
            j = 0;
        }
    }
    if(j === needle.length) return i - j;
    return -1; 
};
// 28.实现strStr(): easy + KMP算法 + 时间复杂度O(m + n)
/*
https://www.jianshu.com/p/86e61233834c
http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html
*/
var strStr = function(haystack, needle) {
    // 边界处理
    if(!needle.length) return 0;
    // 获取next数组
    let getNext = (str) => {
        let nextVal = [-1, 0],
            k =0,
            j = 1;
        while(j < str.length - 1) {
            if(k === -1 || str[j] === str[k]) {
                k++;
                j++;
                if(str[j] !== str[k]) {
                    nextVal[j] = k;
                }else {
                    nextVal[j] = nextVal[k];
                }
            }else {
                k = nextVal[k];
            }
        }
        return nextVal;
    };
    let next = getNext(needle);
    // 遍历
    let i=0, j = 0;
    while(i < haystack.length && j < needle.length) {
        if(j=== -1 ||  haystack[i] === needle[j]) {
            i++;
            j++;
        }else {
            j = next[j];
        }
    }
    if(j === needle.length) return i - j;
    return -1; 
}
// 28.实现strStr(): easy + BM算法 + 时间复杂度O(m + n)
/*
https://www.jianshu.com/p/e9f436f21cdd
http://www.ruanyifeng.com/blog/2013/05/boyer-moore_string_search_algorithm.html
*/
var strStr = function(haystack, needle) {
    // 模式串长度m
    const m = needle.length;
    // 主串长度n
    const n = haystack.length;
    // 边界判断
    if(!m) return 0;
    // 坏字符串山列表
    let generateBmBc = (needle) => {
        const SIZE = 256;
        const m = needle.length;
        // 初始化散列表
        const bmBc = new Array(SIZE).fill(-1);
        for(let i=0; i<m; i++) {
            const ascii = needle.charCodeAt(i);
            bmBc[ascii] = i;
        }
        return bmBc;
    };
    // 生成'坏字符散列表'
    const bmBc = generateBmBc(needle);
    // 好后缀记录数组
    let generateBmGs = (needle) => {
        const suffix = [];
        const prefix = [];
        const m = needle.length;
        // 初始化两个数组
        for(let i=0; i<m; i++) {
            suffix[i] = -1;
            prefix[i] = false;
        }
        for(let i=0; i<m-1; i++) {
            let j = i,
                k = 0;
            // 只要公共后缀子串的长度为k
            while(j >= 0 && needle[j] === needle[m - 1 - k]) {
                // 由于k值记录下标从0开始
                k++;
                // 记录下公共后缀子串的起始下标
                suffix[k] = j;
                // 继续比较下一位字符
                j--;
            }
            // 如果j移动到了首位,表明公共后缀子串是模式串的前缀子串
            if(j === -1) prefix[k] = true;
        }
        return {prefix, suffix};
    };
    // 生成'好后缀规则'中的'prefix数组'和'suffix数组'
    const {prefix, suffix} = generateBmGs(needle);
    // 好后缀移动步数函数
    let moveByBmGs = (j, m, suffix, prefix) => {
        // k表示此时的好后缀长度
        let k = m - 1 - j;
        // 如果在模式串中找到跟好后缀S相匹配的最后一个子串S
        if(suffix[k] !== -1) {
            return j - suffix[k] + 1;
        }
        // 如果没找到，再寻找模式串的前缀子串是否有和好后缀S的后缀子串 匹配的位置
        for(let r = j + 2; r <= m - 1; r++) {
            if(prefix[m - r]) {
                return r;
            }
        }
        return m;
    };
    let i = 0;
    // 外层循环，开始匹配
    while(i <= n - m) {
        let j;
        // 模式串从后往前与主串进行匹配
        for(j=m-1; j>=0; j--) {
            // 如果失败，记录位置j退出内层循环
            if(haystack[i + j] !== needle[j]) break;
        }
        // 如果模式串从前往后遍历了一遍，表示已经匹配
        if(j < 0) return i;
        // 计算坏字符规则下需要移动的步数
        let x = j - bmBc[haystack.charCodeAt(i + j)],
            y = 0;
        if(j < m - 1) {
            // 计算好后缀规则下需要移动的步数
            y = moveByBmGs(j, m, suffix, prefix);
        }
        // 取最大值进行移动
        i = i + Math.max(x, y);
    }
    return -1;
};

// 28.实现strStr(): easy + Sunday算法 + 时间复杂度O(m + n) + 最差时间复杂度O(m * n)
/*
https://zhuanlan.zhihu.com/p/103876168
*/
var strStr = function(haystack, needle) {
    // 获取主串长度,模式串长度
    let sLen = haystack.length,
        pLen = needle.length;
    // 边界处理
    if(pLen > sLen) return -1;
    if(!pLen) return 0;
    // 偏移量计算函数
    let initailOffsetMap = () => {
        const offsetMap = {};
        // 遍历
        for(let i=0; i<needle.length; i++) {
            offsetMap[needle[i]] = pLen - i;
        }
        return x => offsetMap[x] || pLen;
    };
    let getOffset = initailOffsetMap();
    // 遍历匹配
    let s = 0;
    while(s <= sLen - pLen) {
        // 模式串匹配
        let vLen = 0;
        for(let p=0; p<pLen; p++) {
            if(haystack[s+p] === needle[p]) vLen++;
            else break;
        }
        // 是否匹配
        if(vLen === pLen) return s;
        // 跳跃到适合自己的位置
        else s += getOffset(haystack[s + pLen]);
    }
    return -1;
};
console.log('结果----->', strStr('ABABBBAAABABABBA', 'ABABABB'));
