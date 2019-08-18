## Iterator迭代器的概念:

## Iterator的作用:
1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，Iterator遍历器对象本质上，就是一个指针对象。
2. 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员；
   第二次调用指针对象的next方法，可以将指针指向数据结构的第二个成员，以此类推....
   不断调用指针对象的next方法，直到它指向数据结构的结束位置。
3. 每次调用next方法，都会返回数据结构的当前成员的信息。具体来说就是返回一个包含value和done两个属性的对象。
   其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

## 案例1：
​```javascript
function makeIterator(array){
    var nextIndex = 0;
    return {
        next: function(){
            return nextIndex < array.length ?
                {value: array[nextIndex++], done: false} : 
                {value: undefined, done: true};
        }
    };
}

var arr = [1, 2, 3, 4];
var iteratorObj = makeIterator(arr);  // 指针对象
value = iteratorObj.next();
console.log(value);  // {value: 1, done: false}
value = iteratorObj.next();
console.log(value);  // {value: 2, done: false}
value = iteratorObj.next();
console.log(value);  // {value: 3, done: false}
value = iteratorObj.next();
console.log(value);  // {value: 4, done: false}
value = iteratorObj.next();
console.log(value);  // {value: undefined, done: true}
value = iteratorObj.next();
console.log(value);  // {value: undefined, done: true}

// 对于遍历器对象来说,done: false, value: undefined属性都是可以忽略的，因此可以简写成:
// makeIterator函数：它是一个遍历器生成函数，作用是返回一个遍历器对象。
function makeIterator(array){
    var nextIndex = 0;
    return {
        next: function(){
            return nextIndex < array.length ? 
                {value: array[nextIndex++]} : 
                {done: true};
        }
    };
}  // 返回该数组的遍历器对象(指针对象)
​```
## 默认Iterator接口:
1. Iterator接口的目的，就是为了所有数据结构，提供了一种统一的访问机制，即for...of循环；
   当使用for...of循环遍历某种数据结构时，该循环会自动去寻找Iterator接口。
2. 一种数据结构只要部署了Iterator接口，我们就称这种数据结构是'可遍历的'(Iterable)。
3. ES6规定，默认的Iterator接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要
   具有Symbol.iterator属性，就可以认为是'可遍历的'(iterable)。
4. Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数，执行这个函数，
   就会返回一个遍历器。
5. 至于属性名Symbol.iterator，它是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、
   类型为Symbol的特殊值，所以要放在方括号内。
6. 原生具备Iterator接口的数据结构: Array Map Set String TypedArray 函数的raguments对象 NodeList对象
​```javascript
const obj = {
    [Symbol.iterator]: function(){
        return {
            next: function(){
                return {
                    value: 1,
                    done: true
                };
            }
        };
    }
};
​```

## 数组Symbol.iterator属性
​```javascript
let a = [1, 2, 3, 4];
let iteratorObj = a[Symbol.iterator]();
iteratorObj.next();
iteratorObj.next();
iteratorObj.next();
iteratorObj.next();
​```