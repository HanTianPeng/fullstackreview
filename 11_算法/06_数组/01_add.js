/*
136.只出现一次的数字: easy + 异或运算
要求: 即要控制时间复杂度,又要控制空间复杂度,异或运算最方便.
位运算:
    按位与运算
    按位或运算
    按位异或运算: a与b相反为1，相同为0
异或运算规律:
    a^0 = a (任何数和0异或运算等于本身)
    a^a = 0 (任何数和本身异或运算等于0)
    a^b^c = b^c^a (异或运算满足交换定律)

按位运算符是把数字看作二进制来进行计算的。Python中的按位运算法则如下，只针对整型数据：
    a=60的二进制是：0011 1100
    b=13的二进制是：0000 1101
    a和b进行二进制按位算法：
        0011 1100
        0000 1101
    ------------------
        0000 1100    ---->a&b(a，b按位与运算结果)
        0011 1101    ---->a|b(a，b按位或运算结果)
        0011 0001    ---->a^b(a，b按位异或运算结果)  即a和b相反结果才是1，相同则为0
    取反：    a=60，0011 1100 按位取反：结果为 1100 0011
    移位：
    a=60，0011 1100
    a<<3 左移动3位 则是向二进制右边加3个0 ，结果是：11 1100 000,值为480，等效于 x *  2**y
    a>>3 右移动3位 则是将二进制位全部向右移动3位 ，结果是：1 1100,值为28，将a的各二进位全部向 右移动3位，相当于将a的二进制位前3位切除 。等效于x / 2**y  (取整)
*/
var singleNumber = function(nums) {
    let result = 0;
    for(let i=0; i<nums.length; i++) {
        result = nums[i] ^ result;
    }
    return result;
};
// 136.只出现一次的数字: easy + 排序数组 + 遍历 + 边界处理
var singleNumber = function(nums) {
    nums.sort((a, b) => a - b);
    for(let i=0; i<nums.length; i++) {
        if(i === 0 && nums[i] !== nums[i+1]) return nums[i];
        if(i === nums.length-1 && nums[i] !== nums[i-1]) return nums[i];
        if(i>0 && i<nums.length-1 && nums[i] !== nums[i-1] && nums[i] !== nums[i+1]) return nums[i];
    }
    return null;
};
