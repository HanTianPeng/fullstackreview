// 旋转数组: 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

/*
    暴力破解法: 时间复杂度O(n*k),空间复杂度O(1)
        关键点:
            1. 每次将数组旋转1个元素
*/
var rotate2 = function(nums, k){
    if(k <= 0){
        return nums;
    }
    // 旋转k次
    for(var i=0; i<k; i++) {
        var init = nums[nums.length - 1];
        for(var j=0; j<nums.length; j++){
            var temp = nums[j];
            nums[j] = init;
            init = temp;
        }
    }
}

/*
    反转: 时间复杂度O(n),n个元素被反转n次; 空间复杂度O(1)
        关键点:
            1. 元素数组 [1,2,3,4,5,6,7]
            2. 反转所有数字[7,6,5,4,3,2,1]
            3. 反转前k个数字[5,6,7, 4,3,2,1]
            4. 反转后n-k个数字[5,6,7,1,2,3,4]
*/

// [1,2,3,4,5] 
function reverseNum(nums, start, end) {
    while(start < end){
        var temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}

var rotate5 = function(nums, k) {
    k = k % nums.length;
    reverseNum(nums, 0, nums.length-1);
    reverseNum(nums, 0, k-1);
    reverseNum(nums, k, nums.length - 1);
    return nums;
}

console.log('---111--',rotate5([1,2,3,4,5,6,7],3));  // 3+ 3 % 7 =6 [].splice(6,1,4)

// [7, 1, 2, 3, 4, 5, 6]   3/7 3  4+3 / 7 

// [6, 7, 1, 2, 3, 4, 5]