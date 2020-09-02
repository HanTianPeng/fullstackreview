/*
贪心算法:
    1. 在对问题求解识，总是做出在当前看来是最好的选择。
*/

// 134. 加油站: medium + 贪婪算法
var canCompleteCircuit = function(gas, cost) {
    // 假设车辆能在前i个加油站跑起来
    let run = 0;
    // 全程预计的剩余油量
    let remain = 0;
    // 起点位置
    let start = 0;
    // 遍历
    for(let i=0; i<gas.length; i++) {
        run += gas[i] - cost[i];
        remain += gas[i] - cost[i];
        // 车辆无法跑到i+1个加油站
        if(run < 0) {
            start = i + 1;
            run = 0;
        }
    }
    return remain < 0 ? -1 : start;
};