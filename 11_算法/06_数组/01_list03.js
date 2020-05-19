// 旋转数组: 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

/*
    自己的方法:
        关键点: 
            1. 循环k次
            2. 在左边添加元素,值为最右边那个值
            3. 删除左右的那个值
*/
var rotate = function(nums, k) {
    if(k <= 0){
        return nums;
       }
    k = k % nums.length;  // 优化
    for(var i=0; i<k; i++){
            nums.splice(0, 0, nums[nums.length -1]);
            nums.splice(nums.length-1, 1);
    }
    return nums;
};

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
    使用额外的数组: 时间复杂度O(n), 空间复杂度O(n)
        关键点:
            1. 我们可以用一个额外的数组来将每个元素放到正确的位置上，
            2. 原本数组里下标为i的我们把它放到 (i+k)%数组长度的位置。
            3. 然后把新的数组拷贝到原数组中。
*/
var rotate3 = function(nums, k) {
    if(k <= 0){
        return nums;
    }
    var newNums = new Array(nums.length);
    console.log('---',newNums);
    for(var i=0; i<nums.length; i++){   
        // newNums.splice((i+k)%nums.length, 1, nums[i]);
        newNums[(i+k)%nums.length] = nums[i];
    }
    return newNums;

}

/*
    使用环状替换: 时间复杂度O(n), 空间复杂度O(1)
        关键点:
            [1,2,3,4,5,6,7], 2
            1--->3  换座位(0号位置空出来)----> (0 + 2) % 7 跳到2号的位置
            3--->5  换座位(2号位置被挤出来)---> (2 + 2) % 7 跳到4号的位置
            5--->7  换座位(4号位置被挤出来)---> (4 + 2) % 7 跳到6号的位置
            7--->2  换座位(6号位置被挤出来)---> (6 + 2) % 7 跳到1号的位置
            2--->4  换座位(1号位置被挤出来)---> (1 + 2) % 7 跳到3号的位置
            4--->6  换座位(3号位置被挤出来)---> (3 + 2) % 7 跳到5号的位置
            6--->1  换座位(5号位置被挤出来)---> (5 + 2) % 7 跳到0号的位置, 0号位置没有人
*/
var rotate4 = function(nums, k) {
    var count = 0;  // n个同学,需要换n次位置
    var k = k % nums.length;
    for(var i=0; count<nums.length; i++) {
        var current = i;  // 空位置
        var prev = nums[current];
        do{
            var next = (k + current) % nums.length;
            var temp = nums[next];
            nums[next] = prev;
            prev = temp;
            current = next;
            count++;
        }while(current != i);
    }
    return nums;
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