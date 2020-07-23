function LList() {
    // 判断一个单链表是否有环: 标志位法: 时间复杂度O(n)  空间复杂度: O(n)
    this.linkListHaveCycle = function () {
        let firstNode = this.head;
        if (!firstNode) {
            return false;
        }

        while (firstNode) {
            // 打标志
            if (firstNode.flag) {
                return true;
            }
            firstNode.flag = true;
            firstNode = firstNode.next;
        }
        return false;
    }

    // 判断一个单链表是否有环: 快慢指针: 时间复杂度:O(n)  空间复杂度O(1)
    this.linkListHaveCyclePoint = function () {
        let head = this.head;
        if (!head || !head.next) {
            return false;
        }
        // 创建快慢指针: 遍历单链表,快指针一次走两步,慢指针一次走一步,如果单链表中存在环,则快慢指针终会指向同一个节点,否则直到快指针指向null时,快慢指针都不可能相遇
        let slow = head.next,
            fast = head.next.next;

        while (slow !== fast) {
            if (!fast || !fast.next) {
                return false;
            }
            slow = slow.next;
            fast = fast.next.next;
        }

        return true;
    }

    // 判断一个单链表是否有环: JSON.stringify
    this.linkListHaveCycleJSON = function () {
        let firstNode = this.head;
        try {
            JSON.stringify(firstNode);
        } catch (e) {
            return true;
        }
        return false;
    }
}

