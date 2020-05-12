/*
腾讯,B站: 有效括号
题目: 给定一个只包括 '(' ，')' ，'{' ，'}' ，'[' ，']' 的字符串，判断字符串是否有效
    1. 左括号必须用相同类型的右括号闭合
    2. 左括号必须以正确的顺序闭合
    注意: 空字符串可被认为是有效字符串
*/
function Stack() {
    // 初始化
    this.dataStore = [];

    this.length = 0;

    // 进栈
    this.push = function(element) {
        this.dataStore.push(element);
        this.length += 1;
    }

    // 出栈
    this.pop = function(element) {
        if(this.length <= 0) {
            return null;
        }
        let popValue = this.dataStore.pop();
        this.length -= 1;
        return popValue;
    }
}

var stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);


function validBrackets(data) {
    // 创建一个栈
    var stack1 = new Stack();
    var bracketMap = {
        '{': '}',
        '[': ']',
        '(': ')'
    };
    
    for(var i=0; i<data.length; i++) {
        let valueI = data[i];
        // { [ ( 检测这类用stack.push()方法
        if(bracketMap[valueI]) {
            stack1.push(valueI);
        }else if(valueI !== bracketMap[stack1.pop()]) {  // } ] ) 检测这类用stack.pop()方法
            return false;
        }
    }
    return stack1.length === 0;
}

var validBracketResult = validBrackets('{[()]}');
console.log('---有效括号---', validBracketResult);