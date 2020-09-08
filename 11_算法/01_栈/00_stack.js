// 栈的定义
function Stack() {
    // 初始化
    this.dataStore = [];
    this.length = 0;

    // 进栈
    this.push = function(element) {
        this.dataStore.push(element);
        this.length++;
    };

    // 出栈
    this.pop = function() {
        if(!this.dataStore.length) return null;

        let popValue = this.dataStore.pop();
        return popValue;
    }
}

// 155.最小栈: easy + 栈
var MinStack = function() {
    // 初始化
    this.dataStore = [];
    // 栈的最小值
    this.min = null;
    
};

/** 
 * @param {number} x
 * @return {void}
 */
// 进栈: 时间复杂度O(1)
MinStack.prototype.push = function(x) {
    // 这一步非常关键,能够让push的时间复杂度变为O(n)
    if(!this.dataStore.length) this.min = x;
    this.min = Math.min(x, this.min);
    this.dataStore.push(x);
};

/**
 * @return {void}
 */
// 出栈: 时间复杂度O(n)
MinStack.prototype.pop = function() {
    // 边界处理
    if(!this.dataStore.length) return null;
    this.dataStore.pop();
    this.min = Math.min(...this.dataStore);
};

/**
 * @return {number}
 */
// 获取栈顶元素: 时间复杂度O(1)
MinStack.prototype.top = function() {
    if(!this.dataStore.length) return null;
    return this.dataStore[this.dataStore.length-1];
};

/**
 * @return {number}
 */
// 获取最小元素O(1)
MinStack.prototype.getMin = function() {
    return this.min;
};

// 20.有效的括号: easy + 栈 + 哈希表 + 注意括号包含括号
var isValid = function(s) {
    // 定义一个栈
    let stack = [],
        map = {
            '{': '}',
            '[': ']',
            '(': ')'
        };

    // 进栈
    for(let i=0; i<s.length; i++) {
        let valueI = s[i];
        // 避免括号包含括号,所以先判断是否存在
        if(map[valueI]) {
            stack.push(map[valueI]);
        }else if(valueI !== stack.pop()) {
            return false;
        }
    }
    return stack.length === 0;
};

// 84.柱状图中最大的矩形: hard + 暴力破解 + 双指针 + 时间复杂度O(n^2)
var largestRectangleArea = function(heights) {
    let max = 0;

    // 遍历
    for(let i=0; i<heights.length; i++){
        // 获取当前柱状图默认覆盖的宽度: 初始化宽度为自己,即为1
        let w = 1,
            h = heights[i],
            left = i,
            right = i;
        
        // 左边指针
        while(--left >= 0 && heights[left] >= h) w++;

        // 右边指针
        while(++right < heights.length && heights[right] >= h) w++;
        max = Math.max(max, w * h);
    }
    return max;
};

// 84.柱状图中的矩形: hard + 单调递增栈 + 时间复杂度O(n)
var largestRectangleArea = function(heights) {
    // 定义一个单调递增栈
    let stack = [],
        max = 0;

    // 特殊处理
    heights = [0, ...heights, 0];

    // 遍历
    for(let i=0; i<heights.length; i++) {
        // 当前柱状图比栈顶柱状图矮,开始单调栈
        while(stack.length && heights[i] < heights[stack[stack.length - 1]]) {
            // 栈顶元素出栈,并保存栈顶柱状图的索引
            const stackTopIndex = stack.pop();
            // 高度
            let ht = heights[stackTopIndex];
            // 宽度
            let width = stack.length ? i - stack[stack.length - 1] - 1 : 1;
            // 最大面积
            max = Math.max(max, ht * width);
        }
        stack.push(i);
    }
    return max;
};

// 42.接雨水一: hard + 暴力破解法 + 时间复杂度O(n^2) + 空间复杂度O(1)
/*
核心思想:
    1. 每根柱子上面能接纳多少雨水取决于什么?
        > 取决于这根柱子左边两边的最大高度中较小的那根A
        > 如果当前柱子大于等于A的高度,则为0
        > 否则就为: 柱子A - 当前柱子的高度; 为当前这根柱子能接纳的水
*/
var trap = function(height) {
    let sum = 0;
    // 遍历
    for(let i=1; i<height.length-1; i++) {
        let leftMax = 0,
            rightMax = 0;
        // 获取左边最大值
        for(let j=i-1; j>=0; j--) {
            leftMax = Math.max(leftMax, height[j]);
        }
        // 获取右边最大值
        for(let k=i+1; k<height.length; k++) {
            rightMax = Math.max(rightMax, height[k])
        }

        // 获取左边最大值与右边最大值中较小的那个纸
        let min = Math.min(leftMax, rightMax);

        // 当前柱状图能接多少水
        if(min <= height[i]) continue;

        sum = sum + (min - height[i]);
    }

    return sum;
};

// 42.接雨水一: hard + 单调递减栈 + 时间复杂度O(n) + 空间复杂度O(n)
/*
核心思想:
    1. 什么是否形成洼地?
        > 当碰到即将进入的元素大于前面进入的元素时候,形成洼地,计算当前洼地的面积; 并且弹出这个柱状图
        > 洼地的宽度； 即将进入的索引 - 这个洼地的索引 - 1
        > 洼地的高度: 即将进入的柱状图与 栈顶的柱状图中较小的那个高度 - 当前计算洼地的柱状图的高度
*/
var trap = function(height) {
    // 边界处理
    if(height.length <= 1) return 0;

    // 定义单调递减栈
    let stack = [],
        cur = 0,
        sum = 0;

    // 遍历
    while(cur < height.length) {
        // 当前柱状图比栈顶大,开始单调栈(形成洼地的前提: 由于栈内元素排序规则为从大到小，新入元素一旦比栈顶元素大,即可形成洼地)
        // 一旦形成洼地,该洼地即可计算面积,并且失效弹出
        while(stack.length && height[cur] > height[stack[stack.length - 1]]) {
            let stackTopIndex = stack.pop();
            
            // 边界处理
            if(!stack.length) break;
            
            // 由于栈内元素排序规则为从大到小, 因此洼地的左右两边高度的最小值即为洼地的最大高度;
            // 洼地的左边: 新的栈顶的高度   洼地的右边: 即将新入的元素的高度 洼地的自身: 洼地自身的高度
            let ht = Math.min(height[cur], height[stack[stack.length - 1]]) - height[stackTopIndex];

            // 根据上述高度的计算规则: 获取洼地的宽度
            let width = cur - stack[stack.length - 1] - 1;

            sum += width * ht;
        }
        stack.push(cur);
        cur++;
    }
    return sum;
};

// 1047.删除字符串中的所有相邻重复项: easy + 单调栈 + 时间复杂度O(n)
var removeDuplicates = function(S) {
    // 创建一个栈
    let stack = [];

    // 遍历
    for(let i=0; i<S.length; i++) {
        if(stack.length && stack[stack.length-1] === S[i]) {
            stack.pop();
        }else {
            stack.push(S[i]);
        }
    }
    return stack.join('');
};

// 1209.删除字符串中的所有相邻重复项二: medium + 单调栈 + 整体思维
var removeDuplicates = function(s, k) {
    // 定义一个栈
    let stack = [];

    // 遍历
    for(let i=0; i<s.length; i++) {
        // 栈为空,新元素直接入栈
        if(!stack.length) {
            stack.push(s[i]);
        // 新元素与栈顶元素0索引不一致,则直接作为新元素入栈
        } else if(stack[stack.length - 1][0] !== s[i]) {
            stack.push(s[i]);
        // 新元素与栈顶元素0索引一致性,且长度小于k-1，则新元素与栈顶结合
        }else if(stack[stack.length - 1].length < k - 1) {
            stack[stack.length - 1] = stack[stack.length - 1] + s[i];
        }else {
            // 满足k个,删除栈顶元素
            stack.pop();
        }
    }
    return stack.join('');
};

// 字节面试题:删除字符串中出现次数大于等于2对的相邻字符: hard + 单调栈 + 整体思维 + 边界处理 (abbbaca => ca)
var removeDuplicateMoreTwo = function(s) {
    // 创建一个栈
    let stack = [];

    // 遍历
    for(let i=0; i<s.length; i++) {
        // 栈的长度为空,直接添加进入
        if(!stack.length) {
            stack.push(s[i]);
        // 栈的栈顶与新元素不等，则新元素作为栈的一个新元素添加进入? 不一定
        }else if(stack[stack.length - 1][0] !== s[i]) {
            // 如果栈顶元素的长度大于等于2,则删除栈顶元素,新元素准备入栈,一定作为一个新元素入栈吗？
            if(stack[stack.length - 1].length >= 2) {
                stack.pop();
                // 如果新栈的栈顶与新入元素一致性,则新元素应该与栈顶元素结合一起,否则作为新元素入栈
                if(stack.length && stack[stack.length - 1] === s[i]) {
                    stack[stack.length - 1] = stack[stack.length - 1] + s[i];
                }else {
                    stack.push(s[i]);
                }
            }else {
                // 栈顶元素的长度小于2,则直接新元素作为新元素入栈
                stack.push(s[i]);
            }
        // 栈顶元素的0索引位置与新元素一致性,新元素与栈顶元素结合一体
        }else {
            stack[stack.length - 1] = stack[stack.length - 1] + s[i];
        }
    }
    return stack.join('');
}