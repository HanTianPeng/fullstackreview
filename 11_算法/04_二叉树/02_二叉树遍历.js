// 二叉树的前序遍历: A -> B -> D -> E -> C -> F ： 递归方法
var preorderTraversal = function(root) {
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

// 二叉树的前序遍历: A -> B -> D -> E -> C -> F ： 迭代方法(栈)
var preorderTraversal = function(root) {
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

// 二叉树的后序遍历: D -> E -> B -> F -> C -> A : 递归
var postorderTraversal = function(root) {
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

// 二叉树的后序遍历: D -> E -> B -> F -> C -> A : 迭代方法(栈)
var postorderTraversal = function(root) {
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

// 二叉树的中序遍历: D -> B -> E -> A -> C -> F : 递归
var inorderTraversal = function(root) {
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

// 二叉树的中序遍历: D -> B -> E -> A -> C -> F : 迭代方法(栈)
var inorderTraversal = function(root) {
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

// 二叉树的层序遍历: 从左至右，一层一层遍历: 深度优先搜索: DFS
var leverOrder = function(root) {
    let result = [];
    // 边界处理
    if(!root) return result;
    // 深度优先搜索函数
    let DFS = (node, step) => {
        if(node) {
            // 每一层没有数组存数据,就先创建一个空数组
            if(!node[step]) node[step] = [];
            // 写入值
            node[step].push(node.val);
            // 左子树深度优先
            DFS(node.left, step+1);
            // 右子树深度优先
            DFS(node.right, step+1);
        }
    };
    // 开始深度优先搜索
    DFS(root, 0);
    // 返回结果
    return result;
};

// 二叉树的层序遍历: 从左至右, 一层一层遍历: 广度优先搜索: BFS(采用双端队列)
var leverOrder= function(node) {
    let result = [],
        deque = [];
    // 边界判断
    if(!root) return result;
    // 将根节点入队列
    deque.push(root);
    // 遍历
    while(deque.length) {
        // 获取队列长度
        let len = deque.length;
        // 定义存储当前层的数组
        let leverResult = [];
        // 遍历
        while(len--) {
            // 获取当前节点
            let curNode = deque.shift();
            // 写入值
            leverResult.push(curNode.val);
            // 如果当前节点有左子树，压入队列
            if(curNode.left) deque.push(curNode.left);
            // 如果当前节点有右子树,再压入队列
            if(curNode.right) deque.push(curNode.right);
        }
        // 将一层值写入
        result.push(leverResult);
    } 
    return result;
};

// 二叉树的层次遍历: 从底向上,从左至右,一层一层遍历: 广度优先搜索: DFS
var levelOrderBottom = function(root) {
    let result = [];
    // 边界处理
    if(!root) return result;
    // DFS函数
    let DFS = (node, step) => {
        if(node) {
            // 每一层没有数组存数据,就先创建一个空数组
            if(!result[step]) result[step] = [];
            // 写入值
            result[step].push(node.val);
            // 左子树深度优先遍历
            DFS(node.left, step+1);
            // 右子树深度优先遍历
            DFS(node.right, step+1);
        }
    };
    // 从根节点深度优先
    DFS(root, 0);
    return result.reverse();
};

// 二叉树的层次遍历: 从底向上,从左至右,一层一层遍历: 广度优先搜索: BFS(双端队列)
var levelOrderBottom = function(root) {
    let result = [],
        deque = [];
    // 边界判断
    if(!root) return result;
    // 将根节点入队列
    deque.push(root);
    // 遍历
    while(deque.length) {
        // 获取队列长度
        let len = deque.length;
        // 定义存储当前层的数组
        let levelResult = [];
        // 遍历
        while(len--) {
            // 获取当前节点
            let curNode = deque.shift();
            // 写入值
            levelResult.push(curNode.val);
            // 如果当前节点有左子树,压入队列
            if(curNode.left) deque.push(curNode.left); 
            // 如果当前节点有右子树,压入队列
            if(curNode.right) deque.push(curNode.right);
        }
        // 将第一层值插入进入
        result.unshift(levelResult);
    } 
    return result;
};