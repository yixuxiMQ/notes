# TCP和UDP

# 一、TCP协议

1. TCP，全称为 **传输控制协议**（ transmission control protocol ）；

2. TCP是面向连接（虚连接）的[传输层协议](https://so.csdn.net/so/search?q=传输层协议&spm=1001.2101.3001.7020)

3. 每一条TCP连接只能由两个端点，每一个tcp连接只能是点对点的

4. TCP提供可靠的交付服务，无差错，不丢失，不重复，按序到达（可靠有序，不重不丢）

5. TCP提供全双工通信（双向）

   1. 发送缓存：**准备发送的数据** 和 **已发送但尚未收到确认的数据**
   2. 接收缓存：**按序到达但尚未被接受应用程序读取的数据** 和 **没有按序到达的数据**

6. 面向字节流：

   1. 什么是流：流入到进程或从进程流出的字节序列
   2. TCP把应用程序交下来的数据看成仅仅是一连串的**无结构的字节流**

7. ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2iqh49onzj21km0u0jx9.jpg)

8. ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2iqlp07bcj21kg0u0438.jpg)

9. 连接管理：（三次握手）

   ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2iqszbiwfj21jw0u0q7s.jpg)

10. ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2iqunrdmkj21ow0tgn2o.jpg)

11. 连接释放：（四次挥手）

    ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2iqyy6z7jj21k40u0n2d.jpg)

12. 实现可靠传输：

    ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2ire6c8anj21bg0u0ju3.jpg)

13. 流量控制：

    ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2irqm01mfj21qa0u00x2.jpg)

    ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2irqaaznsj21le0u07ab.jpg)

    

# 二、UDP协议

1. UDP，全称为 **用户数据报协议** （ user datagram protocol ）；

2. UDP是无连接的，减少开销和发送数据之前的时延；

3. UDP使用最大努力交付，即不保证可靠交付；

4. UDP是面向报文的，适合一次性传输少量的数据网络应用；

5. UDP无拥塞控制，适合很多的实时应用；

6. UDP首部开销小，8个字节（8B），TCP首部是20个字节（20B）；

7. 应用层给UDP多长的报文，UDP就照样发送，即一次发一个完整报文。![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2hded584qj21ea0jsgnl.jpg)

8. 首部格式：

   ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2hdf8zftqj21g80gawg4.jpg)



# 三、区别总结

1. TCP面向连接（如打电话要先拨号建立连接）;UDP是无连接的，即发送数据之前不需要建立连接
2. TCP提供可靠的服务。也就是说，通过TCP连接传送的数据，无差错，不丢失，不重复，且按序到达;UDP尽最大努力交付，即不保证可靠交付
3. TCP面向字节流，实际上是TCP把数据看成一连串无结构的字节流;UDP是面向报文的
4. UDP没有拥塞控制，因此网络出现拥塞不会使源主机的发送速率降低（对实时应用很有用，如IP电话，实时视频会议等）
5. 每一条TCP连接只能是点到点的;UDP支持一对一，一对多，多对一和多对多的交互通信
6. TCP首部开销20字节;UDP的首部开销小，只有8个字节
7. TCP的逻辑通信信道是全双工的可靠信道，UDP则是不可靠信道