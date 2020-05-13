/*
滑动窗口解决最大值问题:
    给定一个数组和滑动窗口的大小k，请找出所有滑动窗口里的最大值
解题思路:
    1. 比较当前元素和双端队列第一个元素(索引值),相差>=k时队首出列
    2. 依次比较双端队列的队尾与当前元素i对应的值，队尾元素值较小的时出列，直到不小于当前元素i的值，或则队列为空，这是为了保证当队头出队时，新的队头依旧是最大值
    3. 当前元素入队
    4. 从第k次遍历开始，依次把最大值(双端队列的队头)添加到结果中
复杂度分析:
    时间复杂度: O(n)
    空间复杂度: O(n)
*/
function getSlideWindowMax(nums, k) {
    let deque = [],
        result = [];
    
    for(let i=0; i<nums.length; i++) {
        // 把滑动窗口之外的踢出来
        if(i - deque[0] >= k) {
            deque.shift();  // 滑动窗口的第二个元素为接下来的最大值
        }
        if(deque.length) {
            while(nums[deque[deque.length - 1]] <= nums[i]) {
                deque.pop();
            }
        }
        deque.push(i);

        // 从第k次遍历开始，依次把最大值(双端队列的队头)添加到结果中
        if(i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    return result;
}

/*
暴力破解:
    复杂度分析:
        时间复杂度: O(n*k)
        空间复杂度: O(n)
*/
function getSlideQindowMaxForce(nums, k) {
    let arr = [],
        result = [];
    for(let i=0; i<nums.length; i++) {  // 复杂度O(n)
        arr.push(nums[i]);
        if(i >= k - 1) {
            result.push(Math.max(...arr));  // 复杂度O(k)
            arr.shift();
        }
    }
}
