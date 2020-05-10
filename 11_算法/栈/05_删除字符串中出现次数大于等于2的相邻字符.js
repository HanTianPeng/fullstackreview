// 字节跳动: 删除字符串中出现次数大于等于2的相邻字符
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

// 删除字符串中出现次数大于等于2次的相邻字符
function removeDuplicateMoreTwo(s) {
    let stack1 = new Stack();
    for(let i=0; i<s.length; i++) {
        let popValue = stack1.pop(),
            iValue = s[i];
        
        if(popValue === null) {
            stack1.push(iValue);
        }else if(popValue[0] !== iValue) {
            if(popValue.length >= 2) {
                let secondPopValue = stack1.pop();
                if(secondPopValue === iValue){
                    stack1.push(secondPopValue + iValue);
                }else{
                    stack1.push(secondPopValue);
                    stack1.push(iValue);
                }
            }else{
                stack1.push(popValue);
                stack1.push(iValue);
            }
        }else if(popValue[0] === iValue) {
            stack1.push(popValue + iValue);
        }
    }
    return stack1.dataStore.join('');
}

var result = removeDuplicateMoreTwo('abbbaca');
console.log('---删除字符串中出现大于等于2次的相邻字符---', result);