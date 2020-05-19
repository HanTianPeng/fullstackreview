// 存在重复: 给定一个整数数组，判断是否存在重复元素。如果任何值在数组中出现至少两次，函数返回 true。如果数组中每个元素都不相同，则返回 false。

/*

*/
var containsDuplicate = function(nums) {
    if(nums.length <=1) {
        return false;
    }
    for(var i=0; i<nums.length; i++){
        for(var j=i+1; j<nums.length; j++){
            if(nums[i] == nums[j]){
                return true;
            }
        }
    }
    return false;
}

function sortNums(nums){
    var count = 0;
    for(var j=count; j<nums.length; j++){
        for(var i=0; i<nums.length; i++){
            if(nums[i] > nums[i+1]){
                var temp = nums[i];
                nums[i] = nums[i+1]
                nums[i+1] = temp;
            }
        }
        count ++;
    }
    
}
var containsDuplicate2 = function(nums){
    // 首先进行排序
    sortNums(nums);
    for(var i=0; i<nums.length; i++){
        if(nums[i] == nums[i+1]){
            return true;
        }
    }
    return false;
}