/*
什么是树？
    树是一种非线性的数据结构,分层存储；
    仅有唯一一个根节点，没有节点则为空树
    除根节点外，每个节点都有并仅有唯一一个父节点
    节点间不能形成闭环

树的常见概念:
    拥有相同父节点的节点，相互称为兄弟节点
    节点的深度: 从根节点到该节点所经历的边的个数
    节点的高度: 节点到叶节点的最长路径
    树的高度: 根节点的高度

二叉树:
    最多仅有两个子节点的树(最多能分成两个叉的树)

平衡二叉树:
    二叉树中，每个节点的左右子树的高度相差不能大于1，称之为平衡二叉树

满二叉树:
    除了叶节点外每一个节点都有左右子叶且叶子节点都处在最底层的二叉树

完全二叉树:
    深度为h，除第h层外，其他各层(1~h-1)的节点数都达到最大个数，第h层所有的节点都连续集中在最左边

二叉树的遍历:
    前序遍历: 对于二叉树中的任意一个节点, 先打印该节点, 然后是它的左子树, 最后右子树
                ---A---
            ---B---             ---C---
        ---D---     ---E---             ---F---

        A -> B -> D -> E -> C -> F

    中序遍历: 对于二叉树中的任意一个节点, 先打印它的左子树, 然后就是该节点, 最后右子树
        D -> B -> E -> A -> C -> F

    后序遍历: 对于二叉树中的任意一个节点, 先打印它的左子树, 然后是右子树, 最后该节点
        D -> E -> B -> F -> C -> A

  2. 树被用来存储具有层级关系的数据,还被用来存储有序列表

  3. 二叉树进行查找特别快,二叉树的添加或删除也非常块

  4. 集合中不允许相同成员存在
  
  - 02-最大/最小深度

  - 03-LCA问题

  - 04-对称二叉树

  - 05-路径相关问题
    - 二叉树直径

    - 所有路径

    - 最大路径和

  - 06-二叉搜索树
    - 验证二叉搜索树

    - 有序数组 -> 二叉搜索树

    - 不同的二叉搜索树
*/

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

// 230.二叉搜索树中第K小的元素: medium + 递归 + 二叉树的中序遍历
var kthSmallest = function(root, k) {
    let result = null;
    // 边界处理
    if(k <= 0) return result;
    // 递归函数
    let inorderTraversalNode = (node) => {
        // 递归条件
        if(node) {
            // 递归遍历左子树
            inorderTraversalNode(node.left);
            // 获取第K个最小元素
            if(--k === 0) {
                result = node.val;
                return;
            }
            // 递归遍历右子树
            inorderTraversalNode(node.right);
        }
    };
    // 从根节点开始递归遍历
    inorderTraversalNode(root);
    return result;
};
// 230.二叉搜索树中第K小的元素: medium + 栈 + 二叉树的中序遍历
var kthSmallest = function(root, k) {
    // 边界处理
    if(!root || k <= 0) return null;
    // 定义一个栈
    let stack = [],
        curNode = root;
    // 遍历
    while(stack.length || curNode) {
        while(curNode) {
            stack.push(curNode);
            curNode = curNode.left;
        }
        curNode = stack.pop();
        if(--k === 0) return curNode.val;
        curNode = curNode.right;
    }
    return null;
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
            if(!result[step]) result[step] = [];
            // 写入值
            result[step].push(node.val);
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

// 二叉树的层序遍历(剑指 Offer 32 - I. 从上到下打印二叉树): 从左至右, 一层一层遍历: 广度优先搜索: BFS(采用双端队列)
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

// 105.从前序与中序遍历序列构造二叉树(剑指 Offer 07. 重建二叉树): medium + 递归 + 整体思维
var buildTree = function(preorder, inorder) {
    // 根据前序遍历(根 -> 左 -> 右), 获取根节点--边界处理
    if(!preorder.length) return null;
    // 根据前序创建根节点
    let node = new TreeNode(preorder[0]);
    // 根据中序遍历(左 -> 根 -> 右), 获取中序遍历中根节点的索引
    let index = inorder.indexOf(preorder[0]);
    // 根据中序遍历(左 -> 根 -> 右), 获取中序遍历的左子树, 右子树(整体思维)
    let inLeft = inorder.slice(0, index),
        inRight = inorder.slice(index+1);
    // 根据前序遍历(根 -> 左 -> 右)及与中序遍历的对称特性, 获取前序遍历的左子树,右子树(整体思维)
    let preLeft = preorder.slice(1, index+1),
        preRight = preorder.slice(index+1);
    // 构建左子树
    node.left = buildTree(preLeft, inLeft);
    // 构建右子树
    node.right = buildTree(preRight, inRight);
    // 返回树
    return node;
};

// 106.从中序与后序遍历序列构造二叉树: medium + 递归 + 整体思维
var buildTree = function(inorder, postorder) {
    // 根据后序遍历(左 -> 右 -> 根),获取根节点-边界判断
    if(!postorder.length) return null;
    // 创建根节点(js中没有-1索引)
    let node = new TreeNode(postorder[postorder.length - 1]);
    // 根据中序遍历(左 -> 根 -> 右), 获取中序遍历中根节点的索引
    let index = inorder.indexOf(postorder[postorder.length - 1]);
    // 根据中序遍历(左 -> 根 -> 右), 获取中序遍历的左子树,右子树(整体思维)
    let inorderLeft = inorder.slice(0, index),
        inorderRight = inorder.slice(index+1);
    // 根据后序遍历(左 -> 右 -> 根)及 与中序遍历的对称特性, 获取后序遍历的左子树,右子树(整体思维)
    let postorderLeft = postorder.slice(0, index),
        postorderRight = postorder.slice(index, postorder.length-1);
    // 构建左子树
    node.left = buildTree(inorderLeft, postorderLeft);
    // 构建右子树
    node.right = buildTree(inorderRight, postorderRight);
    // 返回树
    return node;
};

// 889.根据前序和后序遍历构造二叉树: medium + 递归 + 整体思维
var constructFromPrePost = function(pre, post) {
    // 根前序遍历(根 -> 左 -> 右), 获取根节点-边界判断
    if(!pre.length) return null;
    // 创建根节点
    let node = new TreeNode(pre[0]);
    // 根据前序遍历(根 -> 左 -> 右), 获取后序遍历中根节点的左子树的索引-边界判断(js语言可以不需要边界判断)
    if(pre.length === 1) return node;
    // 获取后序遍历中根节点的左子树的索引
    let index = post.indexOf(pre[1]);
    // 根据前序遍历(根 -> 左 -> 右) 及 与后序遍历的对称性, 可获取前序遍历的左子树, 右子树(整体思维)
    let preLeft = pre.slice(1, index+2),
        preRight = pre.slice(index+2);
    // 根据后序遍历(左 -> 右 -> 根),获取后序遍历的左子树,右子树(整体思维)
    let postLeft = post.slice(0, index+1),
        postRight = post.slice(index+1, post.length-1);
    // 构建左子树
    node.left = constructFromPrePost(preLeft, postLeft);
    // 构建右子树
    node.right = constructFromPrePost(preRight, postRight);
    // 返回树
    return node;
};

// 剑指 Offer 27.二叉树的镜像: easy + 递归
var mirrorTree = function(root) {
    // 递归结束条件
    if(!root) return null;
    // 左右子树替换指向
    let temp = root.left;
    root.left = root.right;
    root.right = temp;
    // 递归左子树
    mirrorTree(root.left);
    // 递归右子树
    mirrorTree(root.right);
    // 返回镜像二叉树
    return root;
};

// 对称二叉树: 检查它是否是镜像对称即可.
// 101.对称二叉树: easy + 递归
var isSymmetric = function(root) {
    // 边界处理
    if(!root) return true;
    // 递归函数
    let isEqual = function(leftNode, rightNode) {
        // 递归结束条件: 左右子树都为null
        if(!leftNode && !rightNode) return true;
        // 递归结束条件: 左右有一个为null
        if(!leftNode || rightNode) return false;
        // 继续递归
        return leftNode.val === rightNode.val && isEqual(leftNode.left, rightNode.right) && isEqual(leftNode.right, rightNode.left);
    };
};
// 101.对称二叉树: easy + 迭代 + 栈
var isSymmetric = function(root) {
    // 边界处理
    if(!root) return true;
    // 定义一个栈
    let stack = [root.left, root.right];
    //遍历
    while(stack.length) {
        // 获取左右子树
        let leftNode = stack.pop(),
            rightNode = stack.pop();
        // 左右子树均存在
        if(leftNode && rightNode) {
            // 比较大小
            if(leftNode.val !== rightNode.val) return false;
            // 下一轮入栈
            stack.push(leftNode.left);
            stack.push(rightNode.right);
            stack.push(leftNode.right);
            stack.push(rightNode.left);
        }else if(leftNode || rightNode) {
            // 左右子树只存在一个
            return false;
        }
    }
    return true;
};

// 二叉树的深度: 根节点到最远叶子节点的最长路径上的节点数
// 104.二叉树的最大深度(剑指 Offer 55 - I): easy + 递归
var maxDepth = function(root) {
    // 递归结束条件
    if(!root) return 0;
    // 获取左右子树的最大深度
    let left = maxDepth(root.left),
        right = maxDepth(root.right);
    return 1 + Math.max(left, right);
};

// 110.平衡二叉树: easy + 递归 + 二叉树的最大深度
var isBalanced = function(root) {
    // 二叉树最大深度递归函数
    let balanced = (node) => {
        // 递归结束条件
        if(!root) return 0;
        // 获取左右子树的最大深度
        let left = balanced(node.left),
            right = balanced(node.right);
        // 差值大于1的,直接标记为-1；后续递归就不需要进行左右减法运算，仍然直接返回-1
        if(left === -1 || right === -1 || Math.abs(left - right) > 1) return -1;
        // 获取左右子树最大深度
        return 1 + Math.max(left, right);
    };
    // 从头节点开始
    return balanced(node) === -1;
};
// 110. 平衡二叉树: easy + 递归 + 分治管理 + 二叉树的最大深度
var isBalanced = function(root) {
    // 当前函数递归结束条件
    if(!root) return true;
    // 二叉树最大深度递归函数
    let maxDepth = (node) => {
        // 递归结束条件
        if(!node) return 0;
        // 获取左右子树的最大深度
        let left = maxDepth(node.left),
            right = maxDepth(node.right);
        // 返回左右子树最大深度
        return 1 + Math.max(left, right);
    };
    // 获取左右子树最大深度
    let left = maxDepth(node.left),
        right = maxDepth(node.right);
    // 左右子树最大深度是否大于1
    if(Math.abs(left - right) > 1) return false;
    // 继续递归
    return isBalanced(root.left) && isBalanced(root.right);
};

// 二叉树的直径: 两结点之间的路径长度是以它们之间边的数目表示
// 543.二叉树的直径: easy + 二叉树的最大深度 + 递归
var diameterOfBinaryTree = function(root) {
    let res = 0;
    // 递归函数
    let maxDepth = (node) => {
        // 递归结束条件
        if(!node) return 0;
        // 获取左右子树的最大深度
        let left = maxDepth(node.left),
            right = maxDepth(node.right);
        // 计算最大直径
        res = Math.max(left + right, res);
        // 获取根节点深度
        return Math.max(left, right) + 1;
    };
    // 从根节点递归
    maxDepth(root);
    return res;
};

// 236.叉树的最近公共祖先(剑指 Offer 68 - II): medium + 递归 + 二叉树的最大深度
var lowestCommonAncestor = function(root, p, q) {
    // 递归结束条件
    if(!root || root === p || root === q) return root;
    // 遍历左子树,右子树
    let left = lowestCommonAncestor(root.left, p, q),
        right = lowestCommonAncestor(root.right, p, q);
    // 在右子树上找到目标节点
    if(!left) return right;
    // 在左子树上找到目标节点
    if(!right) return left;
    // 左右子树均找到目标元素,则返回公共祖先
    return root;
};

// 235.二叉搜索树的最近公共祖先: easy + 递归 + 二叉搜索树特征(左节点 < 根节点 < 右节点) + 整体思维
var lowestCommonAncestor = function(root, p, q) {
    // p,q分布在左子树,继续寻找左子树中最近公共祖先
    if(p.val < root.val && q.val < root.val) {
        return lowestCommonAncestor(root.left, p, q);
    }
    // p,q分布在右子树,继续寻找右子树中最近公共祖先
    if(p.val > root.val && q.val > root.val) {
        return lowestCommonAncestor(root.right, p, q);
    }
    // 否则就是p,q的最近公共祖先
    return root;
};
// 235.二叉搜索树的最近公共祖先: easy + 迭代方法 + 二叉搜索树特征(左节点 < 根节点 < 右节点) + 整体思维
var lowestCommonAncestor = function(root, p, q) {
    while(root) {
        // p,q分布在左子树,继续寻找左子树中最近公共祖先
        if(p.val < root.val && q.val < root.val) {
            root = root.left;
        }else if(p.val > root.val && q.val > root.val) {
            // p,q分布在右子树,继续寻找右子树中最近公共祖先
            root = root.right;
        }else {
            break;
        }
    }
    // 否则就是p,q的最近公共祖先
    return root;
};

// 1123.最深叶节点的最近公共祖先: medium + 递归 + 二叉树的最大深度
var lcaDeepestLeaves = function(root) {
    let result = root,
        maxDepth = 0;
    // 定义递归函数
    let DFS = (root, depth) => {
        // 递归结束条件
        if(!root) return depth - 1;
        // 获取左右子树的最大深度
        let leftDepth = DFS(root.left, depth + 1),
            rightDepth = DFS(root.right, depth + 1);
        // 获取最大深度
        maxDepth = Math.max(maxDepth, leftDepth, rightDepth);
        // 确定返回结果
        if(leftDepth === maxDepth && rightDepth === maxDepth) result = root;
        // 获取左右子树中最大深度
        return Math.max(leftDepth, rightDepth);
    };
    // 根节点开始
    DFS(root, 0);
    return result;
};
// 111.二叉树的最小深度: easy + 递归 + 二叉树的最大深度: 
var minDepth = function(root) {
    // 递归结束条件
    if(!root) return 0;
    // 获取左子树,右子树的最小深度
    let left = minDepth(root.left),
        right = minDepth(root.right);
    // 返回值
    if(left > 0 && right > 0) {
        // 根节点有左右子节点
        return 1 + Math.min(left, right);
    }else if(left > 0) {
        // 根节点有左节点
        return 1 + left;
    }else if(right > 0) {
        // 根节点有右节点
        return 1 + right;
    }else {
        // 根节点没有左右节点
        return 1;
    }
};
// 111.二叉树的最小深度: easy + 双端队列 + 二叉树的层序遍历
var minDepth = function(root) {
    // 边界处理
    if(!root) return 0;
    let result = 1;
    // 定义一个双端队列
    let deque = [root];
    // 遍历
    while(deque.length) {
        let len = deque.length;
        // 层序遍历
        while(len--) {
            let curNode = deque.shift();
            if(!curNode.left && !curNode.right) {
                return result;
            }
            if(curNode.left) deque.push(curNode.left);
            if(curNode.right) deque.push(curNode.right);
        }
        result++;
    }
    return result;
};

// 给定一个二叉树,找到该树中两个指定节点间的最短距离
/*
分析过程:
    1. node1为node2的祖先节点
    2. node2为node1的祖先节点
    3. node1与node2不是一条直线上,但存在为共同祖先节点
延伸问题:
    二叉树的最近公共祖先
*/
var lowestCommonAncestor = function(root, p, q) {
    let rightNum = 0,
        leftNum = 0;
    // 边界判断
    if(!root || root === p || root === q) return root;

    // 左子树
    let left = lowestCommonAncestor(root.left, p, q);

    // 右子树
    let right= lowestCommonAncestor(root.right, p, q);

    // 子树最终肯定分布在祖先的左右两个不同深度的叶上,所以一直递归,直到同时找到两个叶子，就为祖先
    if(left && right) return rightNum + leftNum;

    if(left) leftNum++;

    if(right) rightNum++;

    // 分布在左子树,目的找到p,或则q
    return left ? left : right;
};

// 112.路径总和: easy + 递归
var hasPathSum = function(root, sum) {
    // 边界处理
    if(!root) return false;
    // 递归结束条件
    if(root.val === sum && !root.left && !root.right) return true;
    // 递归
    return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);
};