// 删除字符串中所有相邻重复项

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

// 删除字符串中的所有相邻重复项
function removeAdjacentDuplicates(s) {
    var stack1 = new Stack();
    for(let i=0; i<s.length; i++) {
        let popValue = stack1.pop(),
            iValue = s[i];
        if(popValue === iValue) {
            continue
        }else{
            if(popValue !== null){
                stack1.push(popValue);
            }
            stack1.push(iValue);
        }
    }
    return stack1.dataStore.join('');
}

var result = removeAdjacentDuplicates('abbaca');
console.log('---删除重复项---', result);
