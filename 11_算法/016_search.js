// 704.二分查找: easy + 二分查找 + 遍历
var search = function(nums, target) {
    // 边界处理
    if(!nums.length) return -1;
    let low = 0,
        high = nums.length - 1;
    while(low <= high) {
        let mid = Math.floor((low + high) / 2);
        if(nums[mid] < target) {
            low = mid + 1;
        }else if(nums[mid] > target) {
            high = mid - 1;
        }else {
            return mid;
        }
    }
};
/*
1201.丑数Ⅲ(被a或b或c整除的正整数)
可能情况:
1.该数只能被a整除
2.该数只能被b整除
3.该数只能被c整除
4.该数只能被a和b同时整除(该数一定是a,b最小公倍数的整数倍)
5.该数只能被a和c同时整除(该数一定是a,c最小公倍数的整数倍)
6.该数只能被b和c同时整除(该数一定是b,c最小公倍数的整数倍)
7.该数只能被a,b,c同时整除(该数一定是a,b,c最小公倍数的整数倍)
情况1 = x/a - 情况4 - 情况5 - 情况7
情况2 = x/b - 情况4 - 情况6 - 情况7
情况3 = x/c - 情况5 - 情况6 - 情况7
情况4 = x/MCM_a_b - 情况7
情况5 = x/MCM_a_c - 情况7
情况6 = x/MCM_b_c - 情况7
情况7 = x/MCM_a_b_c
右边相加即为总的可能数:
count = x/a + x/b + x/c - x/MCM_a_b - x/MCM_a_c - x/MCM_b_c + x/MCM_a_b_c
*/
var nthUglyNumber = function(n, a, b, c) {
    // 获取最小值,并根据最小值假设最大值
    let low = Math.min(a, b, c),
        high = low * n;
    return BinarySearch(low, high, a, b, c, n);
};
// 二分查找法
var BinarySearch = function(low, high, a, b, c, n) {
    while(low < high) {
        let mid = Math.floor((low + high) / 2);
        let MCM_a_b = MCM(a, b),
            MCM_a_c = MCM(a, c),
            MCM_b_c = MCM(b, c),
            MCM_a_b_c = MCM(MCM_a_b, c);
        let count = Math.floor(mid / a) + Math.floor(mid / b) + Math.floor(mid / c) - Math.floor(mid / MCM_a_b) - Math.floor(mid / MCM_a_c) - Math.floor(mid / MCM_b_c) + Math.floor(mid / MCM_a_b_c);
        if(count < n) {
            low = mid + 1;
        }else {
            high = mid;
        }
    }
    return low;
};
// 最小公倍数:两数的乘积除以最大公约数
var MCM = function(num1, num2) {
    while(num2 !== 0) {
        let temp = num1 % num2;
        num1 = num2;
        num2 = temp;
    }
    return Math.floor(num1 * num2; / num1);
};
// 最大公约数:
var DVD = function(num1, num2) {
    while(num2 !== 0) {
        let temp = num1 % num2;
        num1 = num2;
        num2 = temp;
    }
    return num1;
};