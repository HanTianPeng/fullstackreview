/*
    两个数组的交集 II
        给定两个数组，编写一个函数来计算它们的交集。

    说明：
        输出结果中每个元素出现的次数，应与元素在两个数组中出现的次数一致。
        我们可以不考虑输出结果的顺序。
    进阶:
        如果给定的数组已经排好序呢？你将如何优化你的算法？
        如果 nums1 的大小比 nums2 小很多，哪种方法更优？
        如果 nums2 的元素存储在磁盘上，磁盘内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？
*/
var intersect = function(nums1, nums2){
    nums1.sort();
    nums2.sort();
    var newNums = [];
    for(var i=0; i<nums1.length;){
        var flag = false;
        for(var j=0; j<nums2.length; j++){
            if(nums1[i] == nums2[j]){
                newNums.push(nums1[i]);
                nums1.splice(i, 1);
                nums2.splice(j, 1);
                flag = true;
                i = 0;
                j = 0;
                break;
            }else{
                j++;
            }
        }
        if(!flag){
            i++;
        }
    }
    return newNums;
}