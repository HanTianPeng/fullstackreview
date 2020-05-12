/*
字节跳动: 
翻转字符串里的单词
示例: ' the sky is blue';
输出: 'blue is sky the'

说明:
    无空格字符构成一个单词
    输入字符串可以在前面或则后面包含多余空格, 但是翻转后的字符不能包括
    如果两个单词间有多余的空格. 将翻转后单词间的空格减少到只含有一个
*/

function reverseWords(s) {
    let left = 0,
        right = s.length - 1,
        queue = [];
    
    // 查找左边第一个不为空字符串的索引
    while(s.charAt(left) === ' ') {
        left++;
    }

    // 查找右边第一个不为空字符串的索引
    while(s.charAt(right) === ' ') {
        right--;
    }

    while(left <= right) {
        let char = s.charAt(left);
        if(char === ' ' && word){
            queue.unshift(word);
            word = '';
        }else if(char !== '') {
            word += char;
        }
        left++;
    }
    // 将最后一个元素插入0号索引位置
    queue.unshift(word);

    return queue.join(' ');
}