// 66.加一: easy + 遍历 + unshift + 个位加一 + 十位进一 + 位运算
var plusOne = function(digits) {
    let sum = 0,
        isAdd = 0
        newDigits = [];

    for(let i=digits.length-1; i>=0; i--) {
        // 个位数字加-
        sum = i === digits.length - 1 ? digits[i] + 1 + isAdd : digits[i] + isAdd;
        isAdd = sum >= 10 ? 1 : 0;
        newDigits.unshift(sum % 10);
    }

    // 是否进十
    isAdd && newDigits.unshift(isAdd);
    return newDigits;
};

// 26.删除排序数组中的重复项: easy + 排序数组 + 遍历 + 标识位 + splice
var removeDuplicates = function(nums) {
    // 边界处理
    if(nums.length <= 1) return nums.length;

    let index = 1;

    // 遍历
    for(let i=1; i<nums.length; i++) {
        if(nums[i] !== nums[i-1]) {
            nums[index] = nums[i];
            index++;
        }
    }
    // 删除后面元素
    nums.splice(index, nums.length - index);
    return nums.length;
};

 // 283.移动零: easy + 遍历 + 标志位
 var moveZeroes = function(nums) {
    // 设置一个标志位
    let j = 0;
    // 遍历
    for(let i=0; i<nums.length; i++) {
        if(nums[i] !== 0) {
            nums[j] = nums[i];
            if(i !== j) {
                nums[i] = 0;
            }
            j++;
        }
    }
    return nums;
};

// 189.旋转数组: medium + 占座 + do-while循环
var rotate = function(nums, k) {
    // 边界处理
    if(!nums) return [];

    // 优化旋转次数
    k = k % nums.length;

    // 每个元素换位一次
    let count = 0;

    // 开始换位
    for(let i=0; count<nums.length; i++) {
        // 从第一个元素开始换位
        let current = i,
            prev = nums[current];
        
        // 跳棋, 回到原来位置停止
        do {
            let next = (current + k) % nums.length,
                temp = nums[next];
            
            // 将当前元素开始跳到后一个位置
            nums[next] = prev;
            current = next;
            prev = temp;
            count++;
        } while(
            current !== i
        );
    }
    return nums;
};

// 268.缺失数字: easy + 排序数组 + 遍历 + 边界问题
var missingNumber = function(nums) {
    // 排序
    nums.sort((a, b) => a - b);

    // 判断是否以0开始
    if(nums[0] > 0) {
        return 0;
    }

    // 判断序列是否断层
    for(let i=1; i<nums.length; i++) {
        if(nums[i] - nums[i-1] > 1) {
            return nums[i-1] + 1;
        }
    }

    // 未断层序列,边界处理
    return nums[nums.length - 1] + 1;
};
