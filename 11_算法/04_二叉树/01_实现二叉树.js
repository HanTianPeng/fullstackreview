function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.show = show;
}

function show() {
    return this.data;
}

function BST() {
    this.root = null;
    this.insert = insert;
    this.inOrder = inOrder;
    this.getSmalllest = getSmalllest;


}

// 插入
function insert(data) {
    var n = new Node(data, null, null);
    if(n.root == null) {
        this.root = n;
    }else{
        var current = this.root;
        var parent;
        while(true) {
            parent = current;
            if(data < parent.data) {
                current = current.left;
                if(current == null) {
                    parent.left = n;
                    break;
                }
            }else{
                current = current.right;
                if(current == null) {
                    parent.right = n;
                    break;
                }
            }
        }
    }
}

// 中序遍历  23  22 3 16    递归(最后条件执行完后,然后再返回执行,可以理解成断点挂起)
function inOrder(node) {
    if(!(node==null)) {
        inOrder(node.left);
        console.log(node.data);
        inOrder(node.right);
    }
}

// 查找最小
function getSmalllest(root) {
    var current = this.root || root;
    while(!(current.left == null)) {
        current = current.left;
    }
    return current;
}

// 查找最大
function getMax(root) {
    var current = this.root || root;
    while(!(current.right == null)) {
        current = current.right;
    }
    return current;
}

function find(data) {
    var current = this.root;
    while(current != null) {
        if(current.data == data) {
            return current;
        }else if(current.data > data) {
            current = current.left;
        }else{
            current = current.right;
        }
    }
    return null;
}

function remove(data) {
    removeNode(this.root, data);
}

function removeNode(node, data) {
    if(node == null) {
        return null;
    }
    
    if(node.data == data) {
        if(node.left == null && node.right == null) {
            return null;
        }else if(node.left == null) {
            return node.right;
        }else if(node.right == null) {
            return node.left;
        }else{
            var tempNode = getSmalllest(node.right);
            node.data =tempNode.data;
            node.right = remove(node.right, tempNode.data);
            return node;
        }
    }else if(data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
    }else{
        node.right = removeNode(node.right, data);
        return node;
    }
}

var nums = new BST();
nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(22);
console.log('==遍历==', nums);
nums.inOrder(nums.root);