// 节点
function Node(element) {
    this.element = element;
    this.next = null;

}

// 链表
function LList() {
    this.head = new Node("head");
    this.find = find;
    this.insert = insert;
    this.display = display;
    this.findPrevious = findPrevious;
    this.remove = remove;
    this.reverse = reverse;
}

// 查找
function find(item) {
    var currentNode = this.head;
    while(currentNode.element != item) {
        currentNode = currentNode.next;
    }
}

// 插入
function insert(newElement, item) {
    var newNode = new Node(newElement);
    var currNode = find(item);
    newNode.next = currNode.next;
    currNode.next = newNode;
}

// 遍历
function display() {
    var currNode = this.head;
    while(currNode.next != null) {
        console.log(currNode.element);
        currentNode = currentNode.next;
    }
}

// 查找前驱
function findPrevious(item) {
    var currentNode = this.head;
    while(currentNode.next != null && currentNode.next.element != item) {
        currentNode = currentNode.next;
    }
    return currentNode;
}

// 删除
function remove(item) {
    var previousNode = findPrevious(item);
    var currentNode = find(item);
    if(previousNode.next != null) {
        previousNode.next = currentNode.next;
        currentNode.next = null;
    }
}

// 反转
function reverse() {
    var currentNode = this.head;
    var previouseNode = null;
    while(currentNode) {
        var next = currentNode.next;
        currentNode.next = previouseNode;  // 反转后当前节点的next就是正常情况的previouse
        previouseNode = currentNode;
        currentNode = next;
    }
    return previouseNode;
}

// 递归解决反转
function Recurive(previouseNode, currentNode) {
    if(!currentNode) {
        return previouseNode;
    }
    var next = currentNode.next;
    currentNode.next = previouseNode;
    returRecuriven(currentNode, next);

}
function reverse2() {
    var currentNode = this.head;
    var previouseNode = null;
    return Recurive(previouseNode, currentNode);
}