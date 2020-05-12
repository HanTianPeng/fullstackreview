/*
字节跳动: 最小栈(包含getMin函数的栈)
    设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
        push(x) —— 将元素 x 推入栈中。
        pop() —— 删除栈顶的元素。
        top() —— 获取栈顶元素。
        getMin() —— 检索栈中的最小元素。
*/
function Stack() {
    this.dataStore = [];
    this.length = 0;
    this.min = null;

    // 进栈: 时间复杂度O(1), 空间复杂度O(n)
    this.push = function(element) {
        if(!this.dataStore.length) {
            this.min = x;
        }
        this.min = Math.min(x. this.min);
        this.dataStore.push(element);
        this.length += 1;
    }

    // 出栈: 时间复杂度O(n), 空间复杂度O(n)
    this.pop = function() {
        if(this.length <= 0) {
            return null;
        }

        let popValue = this.dataStore.pop();
        this.length -= 1;
        this.min = Math.min(...this.dataStore);
        return popValue;
    }

    // 获取栈顶元素: 时间复杂度O(1), 空间复杂度O(1)
    this.top = function() {
        if(this.length === 0) {
            return null;
        }
        return this.dataStore[this.length -1];
    }

    // 检索栈中最小元素: 时间复杂度O(1), 空间复杂度O(1)
    this.getMin = function() {
        return this.min;
    }
}