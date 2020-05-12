/*
滑动窗口实现无重复字符的最长字符串:
    给定一个字符串,请你找出其中不含有重复字符的最长字符串的长度

滑动窗口:
    其实就是一个队列，比如abcabcbb，
    进入队列(窗口)为abc满足题目要求，当再进入a，队列变成了abca
    此时需要进行移动:
        我们只要把队列的左边的元素移出就行了，直到满足题目要求！
        一直维持这样的队列，找出队列出现最长的长度时候，求出解！
        时间复杂度：O(n^2), 其中b.indexOf()时间复杂度O(n), b.splice(0, index+1)的时间复杂度也为O(n)
        空间复杂度: O(n)
*/
function LengthOfLongestSubString(s) {
    var max = 0;
    var b = []; // 滑动窗口
    for (let i = 0; i < s.length; i++) {
        let index =b.indexOf(s[i]);
        if (index !== -1) {
            b.splice(0, index+1); // 更新窗口
        }
        b.push(s[i]);
        max = Math.max(b.length, max);
    }
    return max;
}
var result = LengthOfLongestSubString("abcabcbb");
console.log("---滑动窗口实现无重复字符的最长字符串---", result);

// 另外一种方案: 暴力破解
function lengthOfLongestSubstringlower(s) {
    var arr = [],
      res = 0;
    for (let i = 0; i < s.length; i++) {
      let item = s[i],
        index = arr.indexOf(item);
      if (index !== -1) {
        res = arr.length > res ? arr.length : res;
        arr.length = 0;
        s = s.substr(index + 1);
        i = -1;
      } else {
        arr.push(item);
        if (i === s.length - 1) {
          res = arr.length > res ? arr.length : res;
        }
      }
      if (res >= s.length) break;
    }
    return res;
}

// 小测试: 
function testI(test) {
    if (~test) {
      console.log('~符号作用----', ~test);
    } else {
      console.log('~符号无作用--', ~test);
    }
}
testI(-1);