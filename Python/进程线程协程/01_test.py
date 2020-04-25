# -*- coding: utf8 -*-

"""
1.线程:
  >操作系统能够进行运算调度的最小单位.它被包含在进程之中,是进程中的实际运作单位.
  >-条线程指的是进程中一个单一顺序的控制流,一个进程中可以并发多个线程,每条线程并行执行不同的任务
  >方法:
    start: 线程准备就绪,等待CPU调度
    setName: 设置线程名称
    getName: 获取线程名称
    setDaemon: 把一个主进程设置为Daemon线程后,主线程执行过程中,后台线程也在进行,主线程执行完毕后,后台线程不论有没有执行完成,都会停止.
    join: 逐个执行每个线程,执行完成后继续往下执行,该方法使得多线程变得无意义
    run: 线程被cpu调度后自动执行线程对象的run方法
  >线程锁: 
    一个进程下可以启动多个线程,多个线程共享父进程的内存空间,每个线程可以访问同一份数据,所以当多个线程同时要修改同一份数据时,就会出现错误
    lock.acquire(): 修改数据前加锁
    lock.release(): 修改数据后释放锁
  >递归锁:
    一个大锁中再包含子锁
  >Semaphore:
    同时允许一定数量的线程更改数据
  >event:
    实现两个或多个线程间的交互,默认碰到event.wait方法时就会阻塞
    event.set(): 设定后遇到wait不阻塞
    event.clear(): 设定后遇到wait后阻塞
    event.isSet(): 判断有没有被设定

2.进程:
  >进程本身不可执行,仅是资源的集合
  >进程间通讯:
    每个进程都拥有自己的内存空间,因此不同进程间内存是不共享的,要想实现两个进程间的数据交换
    1) Queue(队列):
      父进程与子进程进行交互
      同属于同一个父进程下的不同子进程进行交互
    2) Pipe(管道):
      把管道的两头分别赋给两个进程,实现两个进程的相互通信
    3) Manager(实现了进程间真正的数据共享):
      
    4)进程池:
      进程池内部维护一个进程序列,当使用时,则去进程池中获取一个进程,如果进程池序列中没有可供使用的进程,那么程序就会等待,直到进程池中有可用进程为止
      apply: 同步
      apply_async: 异步

3.协程:
  >微线程,是一种用户态的轻量级线程.协程能保留上一次调用时的状态,每次过程重入时,就相当于进入上一次调用的状态.
  >换种说法:进入上一次离开所处逻辑流的位置,当程序中存在大量不需要CPU的操作时(IO),适用于协程.
  >协程有极高的执行效率,因为子程序切换不是线程切换,而是由程序自身控制,因此,没有线程切换的开销
  >不需要多线程的锁机制,因为只有一个线程,也不存在同时写变量冲突,再协程中控制共享资源不加锁,只需要判断状态就好了,所以执行效率比多线程高很多
  >因为协程是一个线程执行,所以想要利用多核CPU,最简单的方法是多进程+协程,这样既充分利用多核,又充分发挥协程的高效率

4.进程与线程之间的区别:
  >没有可比性,进程是资源集合,线程是真正执行任务
  >如果真的要说谁快,进程真正依靠线程运行,所以速度一样
  >启动一个线程比启动一个进程更快
  >创建新线程很简单,创建新进程需要对其父进程进行一次克隆
  >线程共享内存空间,进程的内存是独立的
  >同一个进程的线程之间可以直接交流,两个进程想通信,必须通过一个中间代理来实现
  >一个线程可以控制和操作同一个进程中的其他线程,但是进程只能操作子进程
"""