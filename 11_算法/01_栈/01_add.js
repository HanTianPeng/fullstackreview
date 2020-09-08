/*
栈: 
  1. LIFO: 后入先出,比如子弹弹夹,先装进去的在底部,后装进去的在顶部

  2. 栈内元素只能通过列表的一端访问,这一端称为``栈顶(反之栈底)``
  
  3. 插入新元素,称为``进栈/入栈/压栈``
  
  4.  删除元素, 成为``出栈/退栈``
*/
// 面试题 03.05. 栈排序: medium + 空间换时间 + 字节面试题
var SortedStack = function() {
    this.leftStack = [];
    this.rightStack = [];
};

/** 
 * @param {number} val
 * @return {void}
 */
SortedStack.prototype.push = function(val) {
    if(!this.leftStack.length){
        this.leftStack.push(val);
    }else {
        while(this.leftStack.length && this.leftStack[this.leftStack.length - 1] < val) {
            this.rightStack.push(this.leftStack.pop());
        }
        this.leftStack.push(val);
        while(this.rightStack.length) {
            this.leftStack.push(this.rightStack.pop());
        }
    }
};

/**
 * @return {void}
 */
SortedStack.prototype.pop = function() {
    if(this.leftStack.length) this.leftStack.pop();
};

/**
 * @return {number}
 */
SortedStack.prototype.peek = function() {
    if(this.leftStack.length) return this.leftStack[this.leftStack.length - 1];
    return -1;
};

/**
 * @return {boolean}
 */
SortedStack.prototype.isEmpty = function() {
    return this.leftStack.length === 0 ;
};

// 回文算法
function isPalindrome(word) {
    var stack = new Stack();
    for(var i=0; i<word.length; i++) {
        stack.push(word[i]);
    }
    var rword = '';
    while(stack.length() > 0) {
        reword += stack.pop();
    }
    
    if(rword === word){
        return true;
    }
    return false;
}