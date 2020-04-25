# -*- coding: utf8 -*-

"""
1.拷贝:
    原则上就是把数据分离处理,复制其数据,并以后修改互不影响
2.浅拷贝:
    - 拷贝的是内存地址
    案例:
        1. 切片
        2. 工厂函数(list, dir, set)
        3. copy.copy()
3.深拷贝:
    - 拷贝的是值
    案例:
        1. copy.deepcopy()
4. 拷贝的特殊情况:
    - 对于非容器类型(如数字/字符串等没有拷贝说法)
    - 元组变量

5. 不可变类型:
    修改不可变类型,其实是开辟一块内存空间,创建一个新对象,产生新的内容地址
"""

import copy

# 第一种情况: = (数据完全共享)
data = [1, 2, 3, ['a', 'b']]
newData = data
newData[0] = '11'
newData[3][0] = 'aa'
# print(data)  # [11, 2, 3, ['aa', b]]
# print(id(data) == id(newData))  # True

# 第二种情况: 浅拷贝(复制其数据独立内存存放,但是只拷贝成功第一层)
rowData = [1, 2, 3, ['a', 'b']]
copyData = copy.copy(rowData)
# print(copyData)  # [1, 2, 3, ['a', 'b']]
copyData[3][0] = 'aa'
# print(rowData)  # [1, 2, 3, ['aa', 'b']]
# print(copyData)  # [1, 2, 3, ['aa', 'b']]
copyData[0] = 11
# print(rowData)  # [1, 2, 3, ['aa', 'b']]
# print(copyData)  # [11, 2, 3, ['aa', 'b']]
# print(id(rowData) == id(rowData))  # False

# 第三种情况: 深拷贝(复制其数据完完全全存放在独立的内存,数据不共享)
originData = [1, 2, 3, ['a', 'b']]
deepCopyData = copy.deepcopy(originData)
# print(deepCopyData)  # [1, 2, 3, ['a', 'b']]
deepCopyData[3][0] = 'aa'
# print(deepCopyData)  # [1, 2, 3, ['aa', 'b']]
# print(originData)  # [1, 2, 3, ['a', 'b']]

# 特殊情况
tupleData = (1, 2, 3, [])
copyTupleData = copy.deepcopy(tupleData)
# print(tupleData is copyTupleData)  # False

tuplePureData = (1, 2, 3)
copyTuplePureData = copy.deepcopy(tuplePureData)
# print(tuplePureData is copyTuplePureData)  # True