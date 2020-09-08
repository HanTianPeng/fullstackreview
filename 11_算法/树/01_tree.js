// 108.将有序数组转换为二叉搜索树: easy + 递归 + 中序遍历
var sortedArrayToBST = function(nums) {
    let buildTree = (left, right) => {
        if(left > right) return null;
        let mid = Math.floor((left + right) / 2),
            root = new TreeNode(nums[mid]);
        root.left = buildTree(left, mid - 1);
        root.right = buildTree(mid + 1, right);
        return root;
    };
    return buildTree(0, nums.length - 1);
};