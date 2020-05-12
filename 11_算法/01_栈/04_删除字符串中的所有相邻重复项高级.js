// 删除字符串中的所有相邻重复项高级
function Stack() {
    this.dataStore = [];
    this.length = 0;

    // 进栈
    this.push = function(element) {
        this.dataStore.push(element);
        this.length += 1;
    }

    // 出栈
    this.pop = function() {
        if(this.length <= 0) {
            return null;
        }
        let popValue = this.dataStore.pop();
        this.length -= 1;
        return popValue;
    }
}

/* 
给你一个字符串 s，「k 倍重复项删除操作」将会从 s 中选择 k 个相邻且相等的字母，并删除它们，使被删去的字符串的左侧和右侧连在一起。
你需要对 s 重复进行无限次这样的删除操作，直到无法继续为止。
在执行完所有删除操作后，返回最终得到的字符串。
*/
function removeDuplicateK(s, k) {
    if(k <= 0) {
        return s;
    }   
    let stack1 = new Stack();
    for(let i=0; i<s.length; i++) {
        let iValue = s[i]
            stack2 = new Stack(),
            j = 0,
            isValid = true;
        while(j < k-1) {
            let popValue = stack1.pop();
            if(popValue !== null){
                stack2.push(popValue);
            }
            if(popValue === null || popValue !== iValue) {
                isValid = false;
                break;
            }
            j += 1;
        }
        if(!isValid) {
            while(stack2.length > 0) {
                stack1.push(stack2.pop());
            }
            stack1.push(iValue);
        }
    }
    return stack1.dataStore.join('');
}

function removeDuplicateKSuper(s, k) {
    if(k <= 0) {
        return s;
    }
    let stack1 = new Stack();
    for(let i=0; i<s.length; i++) {
        let iValue = s[i],
            popValue = stack1.pop();
        if(popValue === null) {
            stack1.push(iValue);
        }else if(popValue[0] !== iValue) {
            stack1.push(popValue);
            stack1.push(iValue);
        }else if(popValue.length < k-1) {
            stack1.push(popValue+iValue);
        }
    }
    return stack1.dataStore.join('');
}

var result = removeDuplicateK('deeedbbcccbdaa', 3);
console.log('---删除相邻重复项k个---', result);
var result2 = removeDuplicateKSuper('deeedbbcccbdaa', 3);
console.log('--优化后删除相邻重复项k个', result2);
