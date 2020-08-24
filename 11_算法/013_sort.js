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
quickSort(arr);
console.log(arr);