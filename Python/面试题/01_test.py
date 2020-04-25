# -*- coding: utf8 -*-

# 01-列表解析
dict_data = dict(zip(('a', 'b', 'c', 'd', 'e'), ( 1, 2, 3, 4, 5)))
# print('dict_data===>', dict_data)  # {'a': 1, 'c': 3, 'b': 2, 'e': 5, 'd': 4}

range_data = range(10)
# print('range_data===>', range_data)  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

third_data = [i for i in range_data if i in dict_data]  
# print('third_data===>', third_data)  # []

four_data = [dict_data[i] for i in dict_data]
# print('four_data====>', four_data)  # [1, 3, 2, 5, 4]

five_data = [i for i in range_data if i in four_data]
# print('five_data====>', five_data)  # [1, 2, 3, 4, 5]

# six_data = {i:i*i for i in range_data}
# print('six_data=====>', six_data)  # {0: 0, 2: 4, 1: 1, 4: 16, 5: 25, 8: 64, 9: 81, 7: 49, 6: 36, 3: 9}

seven_data = [[i, i*i] for i in range_data]
# print('seven_data===>', seven_data)  # [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16], [5, 25], [6, 36], [7, 49], [8, 64], [9, 81]]

# 02-01引用类型传参
def func(end_point, li=[]):
    for i in range(end_point):
        li.append(i*i)
    # print('====>', li)

func(2)  # [0, 1]

func(3, [3, 2, 1])  # [3, 2, 1, 0, 1, 4]

func(3)  # [0, 1, 0, 1, 4]  因为li使用了之前内存地址中存储的旧列表

new_list = [6, 7, 8]

func(2, new_list)  # [6, 7, 8, 0, 1]

func(3, new_list)  # [6, 7, 8, 0, 1, 0, 1, 4] 因为new_list为引用类型

def super_func(end_point, li=None):
    """优化后方案"""
    if li is None:
        li = []
    for i in range(end_point):
        li.append(i*i)
    # print('优化后===>', li)

super_func(2)  # [0, 1]

super_func(3)  # [0, 1, 4]

# 02-02-引用类型输出
def f(a, l=[]):
    l.append(a)
    return l

l1 = f(10)  # [10]
l2 = f(123, [])  # [123]
l3 = f('a')  # [10, 'a']
print(l1)  # [10, 'a']
print(l2)  # [123]
print(l3)  # [10, 'a']

# 03-不定参数
"""
如果我们不确定要往函数中传入多少个参数,或则我们想往函数中以列表和元组的形式传参时,那就使用*args
如果我们不确定要往函数传入多少个关键词参数,或则想传入字典的值作为关键词参数时,那就使用**kwargs
*args: 原则拆包
**kwargs: 字典拆包
只能放在最后面
元组只有一个元素的时候记得加逗号
"""
def test(*args, **kwargs):
    print(args, kwargs)

# 04-性能优化
def f1(lIn):
    l1 = sorted(lIn)
    l2 = [i for i in l1 if i<0.5]
    return [i*i for i in l2]

def f2(lIn):
    l1 = [i for i in lIn if i<0.5]
    l2 = sorted(l1)
    return [i*i for i in l2]

def f3(lIn):
    l1 = [i*i for i in lIn]
    l2 = sorted(l1)
    return [i for i in l1 if i<(0.5*0.5)]

# 执行效率 f2 > f1 > f3  列表越小,排序效率越高

import cProfile  # 性能分析工具
import random
lIn = [random.random() for i in range(100000)]
# cProfile.run('f1(lIn)')
"""
4 function calls in 0.039 CPU seconds

Ordered by: standard name

ncalls  tottime  percall  cumtime  percall filename:lineno(function)
    1    0.007    0.007    0.038    0.038 01_test.py:68(f1)
    1    0.001    0.001    0.039    0.039 <string>:1(<module>)
    1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
    1    0.032    0.032    0.032    0.032 {sorted}
"""
# cProfile.run('f2(lIn)')
"""
4 function calls in 0.023 CPU seconds

Ordered by: standard name

ncalls  tottime  percall  cumtime  percall filename:lineno(function)
    1    0.007    0.007    0.022    0.022 01_test.py:73(f2)
    1    0.001    0.001    0.023    0.023 <string>:1(<module>)
    1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
    1    0.015    0.015    0.015    0.015 {sorted}
"""
# cProfile.run('f3(lIn)')
"""
4 function calls in 0.041 CPU seconds

Ordered by: standard name

ncalls  tottime  percall  cumtime  percall filename:lineno(function)
    1    0.008    0.008    0.040    0.040 01_test.py:78(f3)
    1    0.001    0.001    0.041    0.041 <string>:1(<module>)
    1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
    1    0.032    0.032    0.032    0.032 {sorted}
"""

# 05-猴子补丁
"""
猴子补丁: 在单元测试的时候常见被使用
另外: mock模块极力推荐了解
"""
import requests
def get_page(url):
    try:
        result = requests.get(url)
    except requests.HTTPError as e:
        # print('HTTPError')
        pass

def mock_get(url):
    raise requests.HTTPError

requests.get = mock_get
get_page('http:wweb.namibox.com/api/data')

# 06-python语言特性

# 07-递归遍历文件目录

# 08-python的多线程

# 09-01-@classmethod, @staticmethod, @property三个方法

# 10-01:深度优先,广度优先

# 10-02:
class P(object):
    x = 1

class C(P):
    pass

class S(P):
    pass

print(P.x, C.x, S.x)  # 1, 1, 1
C.x = 2
print(P.x, C.x, S.x)  # 1, 2, 1
P.x = 3
print(P.x, C.x, S.x)  # 3, 2, 3

# 10-03:super函数的基本用法

# 11-python的垃圾回收

# 12-python实现单例模式
class Dog(object):
    __instance = None  # 私有的类属性
    
    def __new__(cls):
        if cls.__instance == None:
            cls.__instance = object.__new__(cls)  # 创建对象
            return cls.__instance
        else:
            return cls.__instance

# 13-对52张(除去大小王)
def func(data):
    count_map = {}
    for i in data:
        if count_map.get(i):
            count_map[i] = count_map[i] + 1
        else:
            count_map[i] = 1
    return sorted(data, key=lambda x: (count_map.get(x), x), reverse=True)
data = [3, 5, 3, 7, 'Q', 7, 3]
result = func(data)
print(result)

# 14-删除一个list里面的重复元素
new_list = list(set(data))  # 方法1

new_list_2 = []
for i in data:
    if i not in new_list_2:  # 方法2
        new_list_2.append(i)  

for i in data:
    if data.count(i) != 1:  # 方法3
        for x in range(data.count(i) - 1):
            data.remove(i)

# 15-输入一行字符，分别统计出其中英文字母、空格、数字和其它字符的个数。
def count(s):
 count_english=count_number=count_other=count_space=0
 for i in s:
  if (ord(i)>=97 and ord(i)<=122) or (ord(i)>=65 and ord(i)<=90):
   count_english=count_english+1
  elif ord(i)>=48 and ord(i)<=57:
   count_number=count_number+1
  elif ord(i)==32:
   count_space=count_space+1
  else:
   count_other=count_other+1
 print "英文字母个数：%d个"%count_english
 print "数字个数：%d个"%count_number
 print "其他字符个数：%d个"%count_other
 print "空格个数：%d个"%count_space

 # 16-冒泡排序

 # 17-装饰器
 def auth(auth_type = 'filedb'):   #最外层闭包函数传入验证类型auth_type
   def auth_func(func):
      def wrapper(*args,**kwargs):
         print('认证类型是：',auth_type)
         if auth_type == 'filedb':   #用阿里判断是何种认证类型
            if current_user['username'] and current_user['login']:   #如果已经登录，则无需登陆
               res = func(*args,**kwargs)
               return res
            username = input('用户名：').strip()   #上面if不成立，则登录
            password = input('密码：').strip()
            for user_dic in user_list:    #for遍历的是用户列表的中用户信息字典
               if username == user_dic['name'] and password == user_dic['password']: #登录验证
                  current_user['username'] = username   #登录成功，更改用户状态
                  current_user['login'] = True
                  res = func(*args,**kwargs)
                  return res
            else:   #该处else没放在if下是因为，要遍历所有的用户列表才能判断是否真的有错
               print('用户名或密码错误，请重新登录！')
         elif auth_type == 'ladb':
            print('认证类型是：',auth_type)
            res = func(*args,**kwargs)
            return res
      return wrapper
   return auth_func

# 18-算法:一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法
def jumpFloor(number):
    flo = []
    for i in range(number):
        if i ==0:
            flo.append(1)
        elif i ==1:
            flo.append(2)
        else:
            flo.append(flo[i-1]+flo[i-2])
    return flo.pop()

# 19-循环遍历终止
def f():
    return [lambda  x: i*x for i in range(4)]
print([m(2) for m in f()])  # [0, 2, 3, 6]

# 20-filter函数

# 21-linux种的文件权限


 