function Node(element) {
    thie.element = element;
    this.next = null;
    this.previous = null;
}

function LList() {
    this.head = new Node('head');
    this.find = find;
    this.insert = insert;
    this.display = display;
    this.remove = remove;
    this.displayReverse = displayReverse;
}

// 查找
function find(item) {
    var currentNode = this.head;
    while(currentNode.element != item) {
        currentNode = currentNode.next;
    }  
    return currentNode; 
}

// 插入 a->b->c   
function insert(newElement, item) {
    var newNode = new Node(newElement);
    var currentNode = find(item);
    newNode.next = currentNode.next; // 新元素的next,就是以前元素的next
    newNode.previous = currentNode;  // 新元素的previous,就是以前元素
    currentNode.next = newNode;      // 以前元素的next,就是新元素
    if(!(currentNode.next==null)) {
        newNode.next.previous = newNode;  // 如果不是插入到尾节点,以前元素的next元素的前元素,变成现在新元素
    }
}

// 遍历
function display() {
    var currentNode = this.head;
    while(currentNode.next != null) {
        console.log(currentNode.element);
        currentNode = currentNode.next;
    }
}

// 删除
function remove(item) {
    var currentNode = find(item);
    if(currentNode.next != null) {
        currentNode.next.previous = currentNode.previous;
    }
    currentNode.previous.next = currentNode.next;
    currentNode.previous = null;
    currentNode.next = null;
}

// 查找最后一个节点
function findLast() {
    var currentNode = this.head;
    while(currentNode.next != null) {
        currentNode = currentNode.next;
    }
    return currentNode;
}

// 反序
function displayReverse() {
    var currentNode = this.findLast();
    while(currentNode.previous != null) {
         currentNode = currentNode.previous;
    }
}