// 携程算法题, 腾讯算法题
// 将数组扁平化并且去除其中重复数据，最终得到一个升序且不重复的数组
function flatList(arr) {
    return Array.from(new Set(arr.flat(Infinity))).sort((a, b) => {return a - b;});
}

function flatListApi(arr) {
    return Array.from(new Set(arr.toString().split(','))).sort((a, b) => {return a - b;}).map(Number);
}

var arr = [
    [1, 2, 2],
    [3, 4, 5, 5],
    [6, 7, 8, 9, [
        11, 12, [
            12, 13, [14]
        ]
    ]],
    10
];

var flatResult = flatList(arr);
console.log('--数组扁平化---', flatResult);

var flatApiResult = flatListApi(arr);
console.log('---数组扁平化--toString-', flatApiResult);