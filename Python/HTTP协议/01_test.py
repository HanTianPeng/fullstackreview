# -*- coding: utf8 -*-

"""
1. HTTP协议: 超文本传输协议,位于TCP/IP四层模型当中的应用层
  > 数据链路层 -> 网络层(IP/ARP) -> 传输层(TCP/UDP) -> 应用层(HTTP/FTP)
  > 物理层 -> 数据链路层 -> 网络层 -> 传输层 -> 会话层 -> 表示层 -> 应用层
  > HTTP协议通过请求/响应的方式,在客户端和服务端之间进行通信
  > 缺点: 不够安全
    1) HTTP协议的信息传输完全以明文方式,不做任何加密,因此可能被中间人恶意截获甚至篡改(中间人攻击)
    2) 对称加密(AES): 双方约定一个随机生成的密钥,在后续通信过程中,一方使用密钥进行加密,另一方使用密钥进行解密
      存在问题: 后续通信确实对明文进行加密,但是第一次约定加密方式和密钥的通信仍然是明文
    3) 非对称加密: 一组密钥对(公钥和私钥),既可以公钥加密,私钥解密;也可以私钥加密,公钥解密;为上一步密钥传输做一层额外的保护
      存在问题: 在传输公钥的时候,中间人虽然不知道私钥,但是可以另外自己生成一对公钥私钥,把自己的公钥传输出去
    4) 证书颁发机构(CA)
        1> 改成把公钥发给证书颁发机构,向证书颁发机构申请证书
        2> 证书颁发机构自己也有一对公钥私钥,机构利用自己的私钥将服务器发过来的公钥加密
        3> 另外证书颁发机构通过服务端网址等信息生成一个证书签名,证书签名同样经过机构的私钥加密
        4> 证书下发给服务端
        5> 当客户端请求服务端,服务端就不再直接返回公钥给客户端,而是把自己申请的证书返回给客户端
        6> 客户端收到证书,需要验证证书真伪.而各大浏览器和操作系统已经维护了所有权威证书机构的名称和公钥
        7> 客户端找到对应机构的公钥,解密证书签名
        8> 客户端按照同样的签名规则,自己生成一个证书签名,两个签名一致,则证明证书有效
  > 数据链路层 -> 网络层(IP/ARP) -> 传输层(TCP/UDP) -> SSL ->应用层(HTTP/FTP)
  > 最新推出的TLS协议,是SSL3.0协议的升级版本,和SSL协议的大体原理相同

2. 访问百度过程
  > 域名解析
    1) 浏览器缓存:
      浏览器有百度DNS则会缓存DNS
    2) 系统缓存:
      从Host文件中查找对应的百度域名和IP
    3) 路由器缓存:
      路由器会缓存部分DNS,查找是否有百度域名和IP
    4) ISP DNS缓存:
      电信的DNS缓存
    5) 根域名服务器查找对应IP,根域名服务器将请求转至下一级,直至找到IP

  > 浏览器与服务器建立连接
    1) 一旦浏览器收到正确的IP地址,它将与服务器建立TCP连接,使用称之为TCP/IP三次握手的过程建立此连接以进行数据传输

  > 浏览器发送HTTP请求

  > Nginx解包,分析
    1) 静态文件请求,根据Nginx配置的静态文件目录,返回请求的资源
    2) 动态请求,Nginx将请求转发给uWSGI
    3) uWSGI接收到包进行处理,转发给wsgi
    4) wsgi根据请求调用django工程,处理完后返回值转发给wsgi
    5) wsgi将返回值进行打包,转发给uWSGI
    6） uWSGI接收后转发给Nginx,Nginx最终将返回值返回给浏览器

  > 浏览器渲染页面
"""