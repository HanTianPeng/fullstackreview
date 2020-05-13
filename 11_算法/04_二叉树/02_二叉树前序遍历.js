function BinaryTree() {
    let Node = function(val) {
        this.val = val;
        this.left = null;
        this.right = right;
    };

    let root = null;

    /*
    前序遍历:
    */
    this.preorderTraversal = function(root) {
        let result = [];
        let preOrderTraverseNode = function(node) {
            if(node) {
                // 先该节点
                result.push(node.val);
                // 然后遍历左子树
                preOrderTraverseNode(node.left);
                // 然后遍历右子树
                preOrderTraverseNode(node.right);
            }
        };
        
        // 开始从根节点遍历
        preOrderTraverseNode(root);

        return result;
    }

    /*
        迭代方法:
            解题思路分析:
                首先根入栈;
                将根节点出栈, 将根节点值放入结果数组中;
                然后遍历左子树、右子树；因为栈是先入后出,所以我们先右子树入栈,然后左子树入栈;
                继续出栈(左子树被出栈)......
                一次循环出栈遍历入栈，直到栈为空，遍历完成

            复杂度分析:
                时间复杂度: O(n)
                空间复杂度: O(n)
    */
    this.preorderTraversalIteral = function(node) {
        let list = [],
            stack = [];

        // 当根节点不为空的时候, 将根节点入栈
        if(root) {
            stack.push(root);
        }

        while(stack.length > 0) {
            let firstNode = stack.pop();
            // 第一步: 先访问的是根节点
            list.push(firstNode.val);

            // 先打印左子树, 然后右子树; 所以先加入栈的是右子树,然后是左子树
            if(firstNode.right !== null) {
                stack.push(firstNode.right);
            }

            if(firstNode.left !== null) {
                stack.push(firstNode.left);

            }
        }

        return list;
    }
}