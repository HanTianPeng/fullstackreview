// 删除排序数组中的重复项
/*
    官方答案:
        关键点: 
            1. 排序数组
            2. 双指针法
            3. 虽然未删除,但是已经通过返回值标记了前面i个元素是不重复,这样对nums也没有副作用
*/
var removeDuplicates = function(nums) {
    var i = 0;
    for (var j=1; j<nums.length; j++) {
        console.log('---第' + (j) + '次', nums[i], nums[j]);
        if(nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j];  
        }
    }
    return i;
};

/*
    关键点:
        1. 排序数组
        2. splice进行删除,for循环不能进行+1操作
        3. 完全符合标题,但是改变了nums原数组,有副作用
*/
var removeDuplicates2 = function (nums) {
    var cur = nums[0];  // nums[1] = 2
    for (var i = 1; i < nums.length;) {
        if (nums[i] === cur)
            nums.splice(i, 1);
        else
            cur = nums[i++];
    }
    return nums.length;
};


var nums = [1, 1, 2, 3, 3];
removeDuplicates(nums);
console.log(nums);
