// 交换函数
var swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};
// 快排一次函数
var partition = (arr, left, right) => {
    // 取中间项为基准
    let datum = arr[Math.floor(Math.random()*(right - left + 1)) + left];
    // 开始调整
    while(left <= right) {
        // 左指针右移
        while(arr[left] < datum) left++;
        // 右指针左移
        while(arr[right] > datum) right--;
        // 交换
        if(left <= right) {
            swap(arr, left, right);
            left++;
            right--;
        }
    }
    return left;
};
// 快排递归函数
var quick = (arr, left, right) => {
    let index;
    if(left < right) {
        // 划分数组
        index = partition(arr, left, right);
        // 分治-left
        if(left < index - 1) quick(arr, left, index - 1);
        // 分治-right
        if(index < right) quick(arr, index, right);
    }
};
// 快排: 分治策略 + 从小到大排序 + 时间复杂度O(nlogn) + 空间复杂度O(nlogn) + 不稳定
var quickSort = (arr) => {
    quick(arr, 0, arr.length - 1);
}

/* 
冒泡排序: 
   核心思想: 两两比较,把最大的一个数冒到最右边
步骤；
    1. 比较相邻的元素,如果第一个比第二个大，就交换他们两个
    2. 对每一对相邻的元素做同样的操作，从开始第一对到结尾的最后一对，这样在最后的元素应该是最大的数
    3. 针对所有的元素重复以上的步骤，除了最后一个
    4. 重复1-3，直到排序结束
*/
var bubbleSort = (arr) => {
    for(let i=0; i<arr.length-1; i++) {
        for(let j=0; j<arr.length-1-i; j++) {
            if(arr[j] > arr[j+1]) {
                swap(arr, j, j+1);
            }
        }
    }
    return arr;
};

// 插入排序: 遍历 + 时间复杂度O(n^2) + 空间复杂度O(1) + 稳定
var insertionSort = (arr) => {
    // 边界处理
    if(arr.length <= 1) return arr;
    // 遍历
    for(let i=1; i<arr.length; i++) {
        // 对于未排序数据,在已排序序列中从后向前扫描,找到相应位置并插入
        let preIndex = i - 1,
            current = arr[i];
        // 从后往前倒序依次比较
        while(preIndex >= 0 && current < arr[preIndex]) {
            // 依次往后挪动
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        // 找到当前元素适合的位置
        arr[preIndex + 1] = current;
    }
    return arr;
};

// 希尔排序: 步长 + 时间复杂度O(nlogn),同时和步长有关系 + 空间复杂度O(1) + 不稳定
var shellSort = (arr) => {
    // 按照步长进行分组
    for(let gap=Math.floor(arr.length/2); gap>0; gap=Math.floor(gap/2)) {
        // 插入排序
        for(let i=gap; i<arr.length; i++) {
            let preIndex = i - gap,
                current = arr[i];
            // 从后往前倒序依次比较
            while(preIndex >= 0 && current < arr[preIndex]) {
                // 依次往后移动
                arr[preIndex + gap] = arr[preIndex];
                preIndex -= gap;
            }
            // 找到当前元素适合的位置
            arr[preIndex + gap] = current;
        }
    }
    return arr;
};
let arr = [59, 20, 17, 36, 98, 14, 23, 83, 13, 28];
bubbleSort(arr);
console.log(arr);

// 384.打乱数组: 时间复杂度O(n)+ 空间复杂度O(n) + 随机数
var Solution = function(nums) {
    this.nums = nums;
};

Solution.prototype.reset = function() {
    return this.nums;
};

Solution.prototype.shuffle = function() {
    let newArr = this.nums.slice(),
        n = newArr.length - 1,
        i;
    while(n > 0) {
        // 随机生成一个数
        i = Math.floor(Math.random() * (n + 1));
        // 交换元素
        swap(newArr, n, i);
        n--;
    }
    return newArr;
};

// 611.有效三角形的个数: medium + 排序 + 双指针
let triangleNumber = function(nums) {
    // 边界处理
    if(nums.length < 3) return 0;
    // 排序
    nums.sort((x, y) => x - y);
    let count = 0;
    // 遍历
    for(let k=nums.length-1; k>1; k--) {
        let i = 0,
            j = k - 1;
        while(i < j) {
            // 两边之和大于第三边
            if(nums[i] + nums[j] > nums[k]) {
                // j - i个元素都满足
                count += j - i;
                j--;
            }else {
                i++;
            }
        }
    }
    return count;
};

// 28.实现strStr(): easy + Sunday算法 + 时间复杂度O(m + n) + 最差时间复杂度O(m * n)
var strStr = function(haystack, needle) {
    // 获取主串长度,模式串长度
    let sLen = haystack.length,
        pLen = needle.length;
    // 边界处理
    if(pLen > sLen) return -1;
    if(!pLen) return 0;
    // 偏移量计算函数
    let initailOffsetMap = () => {
        const offsetMap = {};
        // 遍历
        for(let i=0; i<needle.length; i++) {
            offsetMap[needle[i]] = pLen - i;
        }
        return x => offsetMap[x] || pLen;
    };
    let getOffset = initailOffsetMap();
    // 遍历匹配
    let s = 0;
    while(s <= sLen - pLen) {
        // 模式串匹配
        let vLen = 0;
        for(let p=0; p<pLen; p++) {
            if(haystack[s+p] === needle[p]) vLen++;
            else break;
        }
        // 是否匹配
        if(vLen === pLen) return s;
        // 跳跃到适合自己的位置
        else s += getOffset(haystack[s + pLen]);
    }
    return -1;
};

// 28.实现strStr(): easy + KMP算法
var strStr = function(haystack, needle) {
    // 获取主串长度,模式串长度
    let sLen = haystack.length,
        pLen = needle.length;
    // 边界处理
    if(pLen > sLen) return -1;
    if(!pLen) return 0;
    // 计算部分匹配表
    let inc = [1, 1, 2, 3, 4, 4, 4, 7];
    let s = 0;
    while(s < sLen) {
        let vLen = 0;
        for(let p=0; p<pLen; p++) {
            if(haystack[s+p] === needle[p]) vLen++;
            else break;
        }
        // 是否匹配
        if(vLen === pLen) {
            return s;
        }else {
            // 跳跃到适合自己的位置
            s += inc[vLen];
        }
    }
    return -1;
};
// 28.实现strStr(): easy + KMP算法
var strStr = function(haystack, needle) {
    // 获取主串长度,模式串长度
    let sLen = haystack.length,
        pLen = needle.length;
    // 边界处理
    if(pLen > sLen) return -1;
    if(!pLen) return 0;
    // 计算部分匹配表
    let inc = [];
    for(let i=0; i<pLen; i++) {
        for(let j=0; j<=i; j++) {
            if(needle[j] !== needle[i-j]) {
                inc[i] = j + 1;
                break;
            }
            if(j === i && needle[j] === needle[i - j]) {
                inc[i] = j + 1;
            }
        }
    }
    let s = 0;
    while(s < sLen) {
        for(let p=0; p<pLen; p++) {
            if(haystack[s+p] !== needle[p]) {
                s += inc[p];
                break;
            }
            if(p === pLen - 1 && needle[p] === haystack[s + p]) return s;
        }
    }
    return -1;
};
console.log('结果----->', strStr('BBC ABCDAB ABCDABCDABDE', 'ABCDABD'));

// // 28.实现strStr(): easy + BM算法
// var strStr = function(haystack, needle) {
//     //
// };