/*
    移动零:
        给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
*/
var moveZeroes = function(nums) {
    var count = [];
    for(var i=0; i<nums.length;){
        if(nums[i] == 0){
            nums.splice(i, 1);
            count.push(0);
            i = i;
        }else{
            i++;
        }
    }
    if(count.length > 0){
        nums.splice(nums.length, 0, ...count);
    }
};