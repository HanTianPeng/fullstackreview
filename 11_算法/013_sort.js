// 交换函数
var swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};
// 快排一次函数
var partition = (arr, left, right) => {
    // 取中间项为基准
    let datum = arr[Math.floor(Math.random()*(right - left + 1)) + left],
        i = left,
        j = right;
    // 开始调整
    while(i < j) {
        // 左指针右移
        while(arr[i] < datum) i++;
        // 右指针左移
        while(arr[j] > datum) j--;
        // 交换
        if(i < j) {
            swap(arr, i, j);
            i++;
            j--;
        }
    }
    return i;
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
// 快排: 分治策略 + 从小到大排序 + 时间复杂度O(nlogn) + 空间复杂度O(nlogn)
var quickSort = (arr) => {
    quick(arr, 0, arr.length - 1);
}
// 测试
let arr = [1, 3, 2, 5, 4]
quickSort(arr)
console.log(arr) // [1, 2, 3, 4, 5]