// 实现栈: 栈顶/栈底   进栈/出栈
function Stack() {
    this.dataStore = [];  // 保存栈内元素
    // 标记可以插入新元素的位置,栈内压入元素该变量变大,弹出元素该变量变小
    this.top = 0;  

    // 进栈
    this.push = function(element) {
        this.dataStore.push(element);
    };
    // 出栈
    this.pop = function() {
        this.dataStore.pop();
    };
    // 栈的大小
    this.size = function() {
        this.dataStore.length;
    }
    // 清空栈
    this.clear = function() {
        this.dataStore = [];
    };  
    // 是否为空栈
    this.isEmpty = function() {
        return this.dataStore.length === 0;
    }
    this.peek = peek;  // 返回栈顶元素
    this.length = length;  // 栈的长度
}

// 向栈内压入元素,同时让指针top+1,一定要注意++(后加)
function push(element) {
    this.dataStore[this.top++] = element;
}

// 出栈操作,同时将top-1(先减)
function pop() {
    return this.dataStore[--this.top];
}

// 返回栈顶元素,变量top值-1,返回不删除
function peek() {
    return this.dataStore[this.top-1];
}

// 返回栈内元素的个数
function length() {
    return this.top;
} 

// 清空栈 最简单处理方法就是直接将top设置为0,
// 因为栈不存在索引问题,只有一个指针,访问方式只能从一端,不能通过索引,另外一端进行访问
function clear() {
    // this.dataStore.length = 0;
    this.top = 0;
}

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