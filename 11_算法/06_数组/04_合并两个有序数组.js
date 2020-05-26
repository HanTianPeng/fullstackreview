/*
给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

说明:
    初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
    你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
 
示例:
    输入:
        nums1 = [1,2,3,0,0,0], m = 3
        nums2 = [2,5,6],       n = 3

    输出: [1,2,2,3,5,6]
*/

// 合并两个有序整数数组nums1和nums2,请将nums2合并到nums1中,使nums1成为一个有序数组
function mergeTwoList(nums1, m, nums2, n) {
    // 数组索引从0开始计算
    let lenNums1 = m - 1,
        lenNums2 = n -1,
        lenTotal = m + n - 1;
    
    // 将nums2全部按顺序排列入nums1中
    while(lenNums2 >= 0){
        // nums1已经从大往小把后面坑位占用;剩余的前面坑位就都是nums2将要排列进入的
        if(lenNums1 < 0){
            nums1[lenTotal--] = nums2[lenNums2--];
            continue
        }
        nums1[lenTotal--] = nums1[lenNums1] >= nums2[lenNums2] ? nums1[lenNums1--] : nums2[lenNums2--];
    }
    return nums1;
}

// 通过concat与sort方法解决, 缺点: concat()返回的为一个新数组,不会对原来数组进行改变
function twoNumCancat(nums1, nums2) {
    return nums1.concat(nums2).sort((a, b) => {return a - b;});
}

