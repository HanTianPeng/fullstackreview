// 二叉树的前序遍历: A -> B -> D -> E -> C -> F
var preorderTraversal = function(root) {
    // 二叉树前序遍历: 递归方法
    let result = [];
    // 递归函数
    let preorderTraversalNode = (node) => {
        if(node) {
            // 写入值
            result.push(node.val);
            // 先遍历左子树
            preorderTraversalNode(node.left);
            // 再遍历右子树
            preorderTraversalNode(node.right);
        }
    };
    // 从根节点开始递归
    if(root) preorderTraversalNode(root);
    return result;
};

// 二叉树的前序遍历: A -> B -> D -> E -> C -> F
var preorderTraversal = function(root) {
    // 二叉树前序遍历: 迭代方法
    let result = [],
        stack = [];
    // 将根节点入栈
    if(root) stack.push(root);
    // 遍历
    while(stack.length) {
        // 获取当前节点
        let curNode = stack.pop();
        // 写入值
        result.push(curNode.val);
        // 当前节点如果有右子树,先将右子树入栈
        if(stack.right) stack.push(node.right);
        // 当前节点如果有左子树,再将左子树入栈
        if(stack.left) stack.push(node.left)
    }
    return result;
};

// 二叉树的后序遍历: D -> E -> B -> F -> C -> A
var postorderTraversal = function(root) {
    // 二叉树的后序遍历: 递归
    let result = [];
    // 定义递归函数
    let postorderTraversalNode = (node) => {
        if(node) {
            // 先遍历左子树
            postorderTraversalNode(node.left);
            // 再遍历右子树
            postorderTraversalNode(node.right);
            // 左子树递归到尽头,即写入值
            result.push(node.val);
        }
    };
    // 从根节点开始递归
    if(root) postorderTraversalNode(root);
    return result;
};

// 二叉树的后序遍历: D -> E -> B -> F -> C -> A
var postorderTraversal = function(root) {
    // 二叉树的后序遍历: 迭代方法
    let result = [],
        stack = [];
    // 将根节点入栈
    if(root) stack.push(root);
    // 遍历
    while(stack.length) {
        // 获取当前节点
        let curNode = stack.pop();
        // 添加值-插入方式
        result.unshift(curNode.val);
        // 先将左子树入栈--因为值是插入的方式存储,而不是压入的方式存储
        if(stack.left) stack.push(curNode.left);
        // 最后将右子树入栈
        if(stack.right) stack.push(curNode.right);
    }
    return result;
};

// 二叉树的中序遍历: D -> B -> E -> A -> C -> F
var inorderTraversal = function(root) {
    // 二叉树的中序遍历: 递归
    let result = [];
    // 定义递归函数
    let inorderTraversalNode = (node) => {
        // 先遍历左子树
        inorderTraversalNode(node.left);
        // 左子树写完,再写左子树对应的父节点,再写左子树与之对应的右子树
        result.push(node.val);
        // 再遍历右子树
        inorderTraversalNode(node.right);
    };
    // 从根节点开始递归
    if(root) inorderTraversalNode(root);
    return result;
}

// 二叉树的中序遍历: D -> B -> E -> A -> C -> F
var inorderTraversal = function(root) {
    // 二叉树的中序遍历: 迭代方法
    let result = [],
        stack = [],
        curNode = root;
    // 遍历
    while(stack.length || curNode) {
        // 现将左子树全部入栈
        while(curNode) {
            stack.push(curNode);
            curNode = curNode.left;
        }
        // 获取当前节点
        curNode = stack.pop();
        // 写入值
        result.push(curNode.val);
        // 如果当前节点没有right值,则下一轮为其父节点;如果当前节点有right值,则下一轮为右子树节点
        curNode = curNode.right;
    }
};