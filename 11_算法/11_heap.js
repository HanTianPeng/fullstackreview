/*
    堆(Heap):
        > 用数组实现的二叉树,所以它没有使用父指针或则子指针;堆根据堆属性来排序,堆属性决定了树中节点的位置

    堆的常用方法:
        > 构建优先队列
        > 支持堆排序
        > 快速找出一个集合中的最小值(或者最大值)

    堆属性:
        > 最大堆:
            父节点的值比每一个子节点的值都要大
        > 最小堆:
            父节点的值比每一个子节点的值都要小
    
    注意点:
        堆的根节点中存放的是最大或则最小元素,但是其他节点的排序顺序是未知的。

    堆与普通树之间区别:
        > 节点顺序:
            二叉搜索树: 左子节点 < 父节点 < 右子节点;
            最大堆: 两个子节点都比父节点小
            最小堆: 两个子节点都比父节点大

        > 内存占用:
            普通树: 占用内存空间比它们存储的数据要多,因为必须为节点对象以及左右子节点指针分配内存
            堆: 仅仅使用一个数据来存储数组,且不使用指针

        > 平衡:
            二叉搜索树必须是平衡的情况下，其大部分操作的复杂度才能达到O(logn)
            堆中不需要整棵树都是有序的，我们只需要满足堆属性即可，所以在堆中平衡不是问题。因为堆中数据的组织方式可以保证O(logn)的性能

        > 搜索:
            二叉搜索树很快
            堆很慢,但是堆的目的是将最大或则最小的节点放在最前面,从而快速的进行相关插入/删除操作

    堆的存储:
        parent(i) = i / 2
        left(i) = 2i + 1
        right(i) = 2i + 2

    创建堆的方式:
        > 插入式创建:
            每次插入一个节点,实现一个大顶堆(小顶堆)
        > 原地创建:
            堆化，给定一组节点，实现一个大顶堆(小顶堆)
*/

// 交换位置
var swap = function(items, i, j) {
    let temp = items[i];
    items[i] = items[j];
    items[j] = temp;
};

// 定义堆
var Heap = function() {
    let items = [,];
};

// 插入式建堆
/*
分析插入式建堆思路:
    1. 将节点插入到队尾
    2. 自下而上堆化； 
        将插入节点与其父节点比较,如果插入节点大于父节点(大顶堆),则插入节点与父节点交换位置
    3. 一直重复上一步,直到不需要进行交换或则交换到根节点,此时插入完成
*/
var insert = function(items, key) {
    items.push(key);
    // 获取存储新元素的位置
    let i = items.length - 1;
    // 堆化
    while(i/2 > 0 && items[i] > items[i/2]) {
        // 交换
        swap(items, i, i/2);
        i = i/2;
    }
};

// 堆化函数
var heapify = function(items, heapSize, i) {
    // 自上而下式堆化
    while(true) {
        var minIndex = i;
        // left
        if(2*i <= heapSize && items[2*i] > items[i]) minIndex = 2 * i;
        // right
        if(2*i+1 <=heapSize && items[2*i+1] > items[minIndex]) minIndex = 2 * i + 1;
        // 不需要进行堆化
        if(minIndex === i) break;
        // 交换
        swap(items, i, minIndex);
        // 继续循环堆化
        i = minIndex;
    }
};

// 原地建堆
var buildHeap = function(items, heapSize) {
    // 边界处理
    if(heapSize === 1) return;

    // 从最后一个非叶子节点开始,自上而下式堆化
    for(let i=Math.floor(heapSize / 2); i>=1; i--) {
        heapify(items, heapSize, i);
    }
};

// 最小的k个数 + 大顶堆 + 时间复杂度O(nlogk) + 空间复杂度O(k)
/*
分析利用堆求Top K问题的优势:
    1. 动态数组可能会插入或删除元素,难道我们每次求Top K问题的时候都需要对数组进行重新排序吗？那每次的时间复杂度都为O(nlogn)

    因此: 使用堆，我们可以维护一个K大小的小顶堆,当有数据被添加到数组中时,就将它与堆顶元素比较,
        如果堆顶元素大,则将这个元素替换掉堆顶元素,然后再堆化成一个小顶堆;
        如果比堆顶元素小,则不做处理.
    这样求Top K的问题的时间复杂度仅仅为O(logk)
*/
var getLeastNumbers = function(arr, k) {
    // 从arr中获取前k个数,构成一个大顶堆, 只要保证大顶堆中的最大值都比外面的小即可
    let heap = [, ],
        i = 0;
    while(i < k) heap.push(arr[i++]);

    // 构建大顶堆
    buildHeap(heap, k);

    // 从k位开始遍历数组
    for(let i=k; i<arr.length; i++) {
        if(heap[1] > arr[i]) {
            // 替换
            heap[1] = arr[i];
            // 堆化
            heapify(heap, k, 1);
        }
    }

    // 删除第一个empty元素
    heap.shift();
    return heap;
};
