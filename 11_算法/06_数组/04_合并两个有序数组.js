// 合并两个有序整数数组nums1和nums2,请将nums2合并到nums1中,使nums1成为一个有序数组
function mergeTwoList(nums1, m, nums2, n) {
    let len1 = m - 1,
        len2 = n -1,
        len = m + n - 1;
    while(len2 >= 0){
        if(len1 < 0){
            nums1[len--] = nums2[len2--];
            continue
        }
        nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--] : nums2[len2--];
    }
}

var nums1 = [1, 3, 5, 7];
var m = 4;
var nums2 = [2, 4, 6, 8];
var n = 4;

// mergeTwoList(nums1, m, nums2, n);
// console.log(nums1);

// 通过concat与sort方法解决, 缺点: concat()返回的为一个新数组,不会对原来数组进行改变
function twoNumCancat(nums1, nums2) {
    return nums1.concat(nums2).sort((a, b) => {return a - b;});
}
var result = twoNumCancat(nums1, nums2);
console.log('--concat-sort-合并---', result);

