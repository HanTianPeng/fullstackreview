/*
编写一个函数来查找字符串数组中的最长公共前缀。
如果不存在公共前缀，返回空字符串 ""。

示例 1:
	输入: ["flower","flow","flight"]
	输出: "fl"
示例 2:
	输入: ["dog","racecar","car"]
	输出: ""
	解释: 输入不存在公共前缀。
说明:
	所有输入只包含小写字母 a-z 。
*/
// 方法一: 逐个比较
var longestCommonPrefix = function(strs) {
	// 边界问题
	if(strs.length === 0) {
		return '';
	}
	let targetStr = strs[0];
	// 从第二个开始,逐个进行对比
	for(let i=1; i<strs.length; i++) {
		let j = 0
		for(; j<targetStr.length && j<strs[i].length; j++) {
			// 从一个字符串中返回指定的字符
			if(targetStr.charAt(j) !== strs[i].charAt(j)) {
				// js中break是终止当前这个循环
				break;
			}
		}
		// 返回一个字符串在开始索引到结束索引之间的一个子集合
		targetStr = targetStr.substring(0, j);
		if(targetStr === '') {
			return '';
		}
	}
	return targetStr;
};

// 方法二: 最大最小值
var longestCommonPrefixV2 = function(strs) {
	if(strs.length === 0) {
		return '';
	}
	if(strs.length === 1) {
		return strs[0];
	}
	let max = 0, 
		min = 0;
	
	for(let i=0; i<strs.length; i++) {
		if(strs[min] > strs[i]) {
			min = i;
		}
		if(strs[max] < strs[i]) {
			max = i;
		}
	}

	let j = 0;
	for(; j<strs[min].length; j++) {
		if(strs[min].charAt(j) !== strs[max].charAt(j)) {
			break;
		}
	}
	return strs[min].substring(0, j);
}

// 方法三: 分治管理
var longestCommonPrefixV3 = function(strs){
	if(strs.length === 0) {
		return ''
	}
	if(strs.length === 1) {
		return strs[0];
	}

	let mid = Math.floor(strs.length / 2),
		leftStrs = strs.slice(0, mid),
		rightStrs = strs.slice(mid, strs.length);
	return getTwoStrPrefix(longestCommonPrefixV3(leftStrs), longestCommonPrefixV3(rightStrs));
}

var getTwoStrPrefix = function(str1, str2) {
	let i = 0;
	for(; i<str1.length && i<str2.length; i++) {
		if(str1.charAt(i) !== str2.charAt(i)) {
			break;
		}
	}
	return str1.substring(0, i);
}