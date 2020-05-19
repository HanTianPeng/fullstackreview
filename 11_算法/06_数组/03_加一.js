/*
    加一:
        给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
        最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
        你可以假设除了整数 0 之外，这个整数不会以零开头。
*/

/*
    关键点:
        1. 个位数为9，需要在首位加一个新元素1
        2. 个位数不为0, 需要在末尾的数字进行+1的加法运算
*/
var plusOne = function(digits) {
    digits = digits + 1;
    for(var i=digits.length -1; i>=0; i--){
        digits[i] = digits[i] + 1;
        digits[i] = digits[i] % 10;
        if(num != 0){
            return digits;
        }
    }
    digits.splice(0, 0, 1);
};

// 从个位数开始进行加法,判断是否需要进1
var plusOneV2 = function(digits) {
    let newDigits = [],
        add = 0,
        sum = 0;
    for(let i=digits.length-1; i>=0; i--) {
        sum = i === digits.length - 1 ? digits[i] + add + 1 : digits[i] + add;
        if(sum >= 10) {
            add = 1;
        }else{
            add = 0;
        }
        // 在最前面插入余数
        newDigits.unshift(sum % 10);
    }
    // 判断是否进1
    add && (newDigits.unshift(add));
    return newDigits;
}