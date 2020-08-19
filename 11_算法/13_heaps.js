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

// 数组中的第k个最大元素: medium + 小顶堆
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