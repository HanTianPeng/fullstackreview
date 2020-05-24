/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    let maxLen = Math.max(a.length, b.length);

    // padStart()用另一个字符串填充当前字符串,以便于产生的字符串达到给定的长度.填充从当前字符串的开始(左侧)应用
    a = a.padStart(maxLen, '0'),
    b = b.padStart(maxLen, '0');

    let result = [],
        isAdd = 0,
        sum = 0;

    // 逆序遍历
    for(let i=maxLen-1; i>=0; i--) {
        let aValue = a[i],
            bValue = b[i];
        
        sum = aValue + bValue + isAdd;

        result[i] = sum % 2;
        isAdd = sum >= 2 ? 1 : 0;
    }   

    // 末尾加一
    isAdd && (result.unshift(isAdd));
    return result.join('');
};