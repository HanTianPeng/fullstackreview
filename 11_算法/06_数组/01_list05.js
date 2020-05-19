/*
    只出现一次的数字: 
        给定一个非空整数数组，除了某个元素只出现一次以外，
        其余每个元素均出现两次。找出那个只出现了一次的元素。
*/


var singleNumber = function(nums) {
    for(var i=0; i<nums.length; i++){
        var isSingle = true;
        for(var j=0; j<nums.length; j++){
            if(nums[i] == nums[j] && i != j){
                isSingle = false;
            }
        }
        if(isSingle){
            return nums[i];
        }
    }
}

/*

*/
var singleNumber = function(nums) {
    nums.sort();
    for(var i=0; i<nums.length; i++){
        if(i === 0){
            if(nums[i+1] != nums[i]){
                return nums[i];
            }
        }else if(i === nums.length-1){
            if(nums[i] != nums[i-1]){
                return nums[i];
            }    
        }else if(nums[i-1] != nums[i] && nums[i] != nums[i+1] ){
            return nums[i];
        }
    }
}

console.log(singleNumber([2,2,1]));

/*
    哈希表:
*/