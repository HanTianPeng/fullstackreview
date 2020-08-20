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

// 剑指Offer40(面试题17.14):最小的k个数 + 大顶堆 + 时间复杂度O(nlogk) + 空间复杂度O(k)
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

// 交换位置函数 
var swap = function(heap, i, j) {
    let temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
};

// 堆化函数
var heapify = function(heap, heapSize, i, map) {
    while(true) {
        let minIndex = i;
        // left
        if(2*i <= heapSize && map.get(heap[2*i]) < map.get(heap[i])) minIndex = 2*i;
        // right
        if(2*i+1 <= heapSize && map.get(heap[2*i+1]) < map.get(heap[minIndex])) minIndex = 2*i+1;
        // 边界处理
        if(minIndex === i) break;
        // 交换位置
        swap(heap, i, minIndex);
        // 继续堆化
        i = minIndex;
    }
};

// 原地建堆函数: 从后往前,自上而下式建小顶堆
var bulidHeap = function(heap, heapSize, map) {
    // 边界处理
    if(heapSize === 1) return ;
    // 从最后一个非叶子节点开始,自上而下式堆化
    for(let i=Math.floor(heapSize / 2); i>=1; i--) {
        heapify(heap, heapSize, i, map);
    }
};

// 347.前K个高频元素 + medium + 小顶堆
var topKFrequent = function(nums, k) {
    // 利用hashmap进行元素统计
    let map = new Map();

    // 遍历
    nums.map((num) => {
        if(map.has(num)) {
            map.set(num, map.get(num) + 1)
        }else {
            map.set(num, 1);
        }
    });

    // 边界处理: 如果元素数量小鱼等于K
    if(map.size <= k) return [...map.keys()];

    // 定义一个堆
    let heap = [, ];
    
    // 遍历
    let i = 0;
    map.forEach((value, key) => {
        if(i < k) {
            // 取前k个建堆,插入堆
            heap.push(key);
            // 原地建立前k堆,并进行堆化
            if(i === k - 1) bulidHeap(heap, k, map);
        }else if(value > map.get(heap[1])) {
            // 替换
            heap[1] = key;
            // 堆化
            heapify(heap, k, 1, map);
        }
        i++;
    });
    // 删除第一个元素
    heap.shift();
    return heap;
};


// 交换函数
var swap = function(heap, i, j) {
    let temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
};

// 堆化函数
var heapify = function(heap, heapSize, i) {
    while(true) {
        let minIndex = i;
        // left
        if(2*i <= heapSize && heap[2*i] < heap[i]) minIndex = 2*i;
        // right
        if(2*i+1 <= heapSize && heap[2*i+1] < heap[minIndex]) minIndex = 2*i+1;
        // 边界处理
        if(minIndex === i) break;
        // 交换位置
        swap(heap, i, minIndex);
        // 继续堆化
        i = minIndex;
    }
};

// 原地建堆函数: 从后往前,自上而下式建小顶堆
var bulidHeap = function(heap, heapSize) {
    // 边界处理
    if(heapSize === 1) return ;
    // 从最后一个非叶子节点开始,自上而下式堆化
    for(let i=Math.floor(heapSize/2); i>=1; i--) {
        heapify(heap, heapSize, i);
    }
};

// 215.数组中的第k个最大元素: medium + 小顶堆
var findKthLargest = function(nums, k) {
    // 从nums中取出前k个数，构建一个小顶堆
    let heap = [, ],
        i = 0;
    while(i < k) heap.push(nums[i++]);
    // 堆化
    bulidHeap(heap, k);

    // 从k位置开始遍历
    for(let i=k; i<nums.length; i++) {
        if(nums[i] > heap[1]) {
            // 替换
            heap[1] = nums[i];
            // 堆化
            heapify(heap, k, 1);
        }
    }
    return heap[1];
};

// 小顶堆定义
let MinHeap = function() {
    let heap = [,];
    // 获取堆中元素数量
    this.getSize = () => heap.length - 1;
    // 插入
    this.insert = (key) => {
        heap.push(key);
        // 获取存储的位置
        let i = heap.length - 1;
        // 堆化
        while(Math.floor(i/2) > 0 && heap[i] < heap[Math.floor(i/2)]) {
            // 交换位置
            this.swap(heap, i, Math.floor(i/2));
            i = Math.floor(i/2);
        }
    };
    // 删除堆头并返回
    this.removeHead = () => {
        if(heap.length > 1) {
            if(heap.length === 2) return heap.pop();
            let num = heap[1];
            heap[1] = heap.pop();
            // 堆化
            this.heapify(1);
            return num;
        }
        return null;
    };
    // 获取堆头
    this.getHead = () => {
        return heap.length > 1 ? heap[1] : null;
    };
    // 堆化
    this.heapify = (i) => {
        let heapSize = heap.length - 1;
        // 自上而下堆化
        while(true) {
            let minIndex = i;
            // left
            if(2*i <= heapSize && heap[2*i] < heap[i]) minIndex = 2*i;
            // right
            if(2*i+1 <= heapSize && heap[2*i+1] < heap[minIndex]) minIndex = 2*i+1;
            // 边界处理
            if(minIndex === i) break;
            // 交换位置
            this.swap(heap, i, minIndex);
            // 继续堆化
            i = minIndex;
        }
    };
    // 交换位置
    this.swap = (heap, i, j) => {
        let temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }
};
// 大顶堆定义
let MaxHeap = function() {
    let heap = [,];
    // 堆中元素数量
    this.getSize = () => heap.length - 1;
    // 插入
    this.insert = (key) => {
        heap.push(key);
        // 获取存储位置
        let i = heap.length - 1;
        // 堆化
        while(Math.floor(i/2) > 0 && heap[i] > heap[Math.floor(i/2)]) {
            // 交换位置
            this.swap(heap, i, Math.floor(i/2));
            // 继续堆化
            i = Math.floor(i/2);
        }
    };
    // 获取堆头
    this.getHead = () => {
        return heap.length > 1 ? heap[1] : null;
    };  
    // 删除堆头并返回
    this.removeHead = () => {
        if(heap.length > 1) {
            if(heap.length === 2) return heap.pop();
            let num = heap[1];
            heap[1] = heap.pop();
            this.heapify(1);
            return num;
        }
        return null;
    };
    // 堆化
    this.heapify = (i) => {
        let heapSize = heap.length - 1;
        // 自上而下式堆化
        while(true) {
            let minIndex = i;
            // left
            if(2*i <= heapSize && heap[2*i] > heap[i]) minIndex = 2*i;
            // right
            if(2*i+1 <= heapSize && heap[2*i+1] > heap[minIndex]) minIndex = 2*i+1;
            // 边界处理
            if(minIndex === i) break;
            // 交换位置
            this.swap(heap, i, minIndex);
            // 继续堆化
            i = minIndex;
        }
    };
    // 交换位置
    this.swap = (heap, i, j) => {
        let temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    };
};
var MedianFinder = function() {
    // 大顶堆
    this.lowHeap = new MaxHeap();
    // 小顶堆
    this.hightHeap = new MinHeap();
};
// 插入元素
MedianFinder.prototype.addNum = function(num) {
    // 如果大顶堆为空，或则num小于大顶堆的堆头元素,则插入大顶堆
    if(!this.lowHeap.getSize() || num < this.lowHeap.getHead()) {
        // 比大顶堆的堆顶小，插入到大顶堆中
        this.lowHeap.insert(num);
    }else {
        // 比小顶堆的堆顶大,插入到小顶堆中
        this.hightHeap.insert(num);
    }

    // 比较大小顶堆的是否依然保持平衡
    if(this.lowHeap.getSize() - this.hightHeap.getSize() > 1) {
        // 大顶堆往小顶堆迁移
        this.hightHeap.insert(this.lowHeap.removeHead());
    }
    if(this.hightHeap.getSize() > this.lowHeap.getSize()) {
        // 小顶堆往大顶堆迁移
        this.lowHeap.insert(this.hightHeap.removeHead());
    }
};
// 获取中位数
MedianFinder.prototype.findMedian = function() {
    if(this.lowHeap.getSize() && this.lowHeap.getSize() === this.hightHeap.getSize()) {
        return (this.lowHeap.getHead() + this.hightHeap.getHead()) / 2;
    }
    return this.lowHeap.getHead();
};