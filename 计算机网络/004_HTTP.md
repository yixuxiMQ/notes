# HTTP协议

# 一、HTTP基本介绍

1. HTTP协议是Hyper Text Transfer Protocol（超文本传输协议）的缩写, HTTP是万维网（WWW:World Wide Web）的数据通信的基础。

2. 什么是超文本？

   1. 超文本是用超链接的方法，将各种不同空间的文字信息组织在一起的网状文本。超文本更是一种用户界面范式，用以显示文本及与文本之间相关的内容。

3. HTTP是一个基于TCP/IP通信协议来传递数据（HTML 文件, 图片文件, 查询结果等）。

   <img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h2kl9w4w4kj20h008cwf0.jpg" alt="img" style="zoom:150%;" />



# 二、HTTP协议的特点

### 一、HTTP1.0的特点

1. **支持客户/服务器模式**
   - HTTP协议支持客户端服务端模式，需要使用浏览器作为客户端来访问服务端。
2. **简单快速**
   - 客户向服务器请求服务时，只需传送请求方法和路径。
   - 请求方法常用的有GET、POST等。每种方法规定了客户与服务器联系的类型不同。
   - 由于HTTP协议简单，使得HTTP服务器的程序规模小，因而通信速度很快。
3. **灵活**
   - HTTP允许传输任意类型的数据对象。
   - 正在传输的类型由Content-Type（Content-Type是HTTP包中用来表示内容类型的标识）加以标记。
4. **短连接**
   - 每次请求一次，释放一次连接。所以无连接表示每次连接只能处理一个请求。
   - 优点：节省传输时间，实现简单。我们有时称这种无连接为短连接。
   - 对应的就有了长链接，长连接专门解决效率问题。当建立好了一个连接之后，可以多次请求。但是缺点就是容易造成占用资源不释放的问题。当HTTP协议头部中字段Connection：keep-alive表示支持长链接。
5. **单向性**
   - 服务端永远是被动的等待客户端的请求。
6. **无状态**
   - HTTP协议是无状态协议。无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。
   - 另一方面，在服务器不需要先前信息时它的应答就较快。
   - 为了解决HTTP协议无状态，于是，两种用于保持HTTP连接状态的技术就应运而生了，一个是Cookie，而另一个则是Session。

### 二、HTTP1.1的特点

1. 默认使用长连接
   - 在HTTP/1.1中已经默认使用Connection: keep-alive（长连接），避免了连接建立和释放的开销，但服务器必须按照客户端请求的先后顺序依次回送相应的结果，以保证客户端能够区分出每次请求的响应内容。
     - 支持“长连接”，即“一次连接可以多次请求”。
     - ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2klu8tsa5j20ci07sjrq.jpg)
   - 通过Content-Length字段来判断当前请求的数据是否已经全部接收。
   - 不允许同时存在两个并行的响应。
2. 管线化
   - 客户端可以同时发出多个HTTP请求，而不用一个个等待响应 。
3. 断点续传
   - 可以将一个大数据，分段传输，客户端可以慢慢显示。

### 三、HTTP2.0的特点

1. **单一的长连接**
   - 在HTTP/2中，客户端向某个域名的服务器请求页面的过程中，只会创建一条TCP连接，即使这页面可能包含上百个资源。 
   - 单一的连接应该是HTTP2的主要优势，单一的连接能减少TCP握手带来的时延 。
   - HTTP2中用一条单一的长连接，避免了创建多个TCP连接带来的网络开销，提高了吞吐量。
2. **多路复用** 
   - 多路复用，连接共享。不同的request可以使用同一个连接传输（最后根据每个request上的id号组合成正常的请求）。
3. **二进制传输**
   - HTTP2.0中所有加强性能的核心是二进制传输，在HTTP1.x中，我们是通过文本的方式传输数据。在HTTP2.0中引入了新的编码机制，所有传输的数据都会被分割，并采用二进制格式编码。
4. **首部压缩（Header Compression）**
   - HTTP1.x的header很多时候都是重复多余的，导致带宽的浪费
   - HTTP2.0使用`HPACK`算法对头部进行压缩，既避免了重复header的传输，又减小了需要传输数据的大小。
5. **服务端推送（Server Push）**
   - 在HTTP2.0中，服务端可以在客户端某个请求后，主动推送其他资源。比如社交网站在导航栏实时显示新提醒和私信的数量，用户的在线状态更新，股价行情监控、显示商品库存信息、多人游戏、文档协作等。
6. **更安全**
   - HTTP2.0使用了`tls`的拓展ALPN做为协议升级，除此之外，HTTP2.0对`tls`的安全性做了近一步加强，通过黑名单机制禁用了几百种不再安全的加密算法。

### 四、HTTP3.0的特点

1. 



# 三、HTTP协议的请求

> 1. 当你在浏览器输入URL [http://www.itbaizhan.cn](https://link.zhihu.com/?target=http%3A//www.itbaizhan.cn) 的时候，浏览器发送一个Request去获取 [http://www.itbaizhan.cn](https://link.zhihu.com/?target=http%3A//www.itbaizhan.cn) 的html. 服务器把Response发送回给浏览器。
> 2. 浏览器分析Response中的 HTML，发现其中引用了很多其他文件，比如图片，CSS文件，JS文件。
> 3. 浏览器会自动再次发送Request去获取图片，CSS文件，或者JS文件。
> 4. 等所有的文件都下载成功后。 网页就被显示出来了。



1. Request 消息分为3部分：

   - 第一部分叫Request line

   - 第二部分叫Request header

   - 第三部分是Request body

   - Request header和Request body之间有个空行

2. 客户端发送一个HTTP请求到服务器的请求消息包括以下格式：

   ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2kpfdxr7nj20by05eq32.jpg)

3. 以访问：[http://www.itbaizhan.cn/course/id/18.html?a=3&b=4](https://link.zhihu.com/?target=http%3A//www.itbaizhan.cn/course/id/18.html%EF%BC%9Fa%3D3%26b%3D4) 为例，查看请求状态：

   ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2kpi0yi8gj20on0dydgi.jpg)

   1. 请求行

      1. GET /course/id/18.html?a=3&b=4 HTTP/1.1

      2. POST /login HTTP/1.1

         ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2kppr3jp3j20pf06mgmk.jpg)

   2. 请求头

      1. 请求头用于说明是谁或什么在发送请求、请求源于何处，或者客户端的喜好及能力。

      2. 服务器可以根据请求头部给出的客户端信息，试着为客户端提供更好的响应。

      3. 请求头中信息的格式为key：value。

         | 请求头关键词                  | 解释                                                         |
         | :---------------------------- | :----------------------------------------------------------- |
         | **Host**                      | 客户端指定自己想访问的WEB服务器的域名/IP 地址和端口号。      |
         | **Connection**                | 连接方式。如果值是close则表示基于短连接方式，如果该值是keep-alive，网络连接就是持久的，在一定时间范围内不会关闭，使得对同一个服务器的请求可继续在该连接上完成。 |
         | **Upgrade-Insecure-Requests** | 服务端是否支持https加密协议。                                |
         | **Cache-Control**             | 指定请求和响应遵循的缓存机制。                               |
         | **User-Agent**                | 浏览器表明自己的身份（是哪种浏览器）。例如Chrome浏览器：Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36。 |
         | **Accept**                    | 告诉WEB服务器自己接受什么介质类型，*/* 表示任何类型，type/* 表示该类型下的所有子类型。 |
         | **Accept-Encoding**           | 浏览器申明自己接收的编码方法，通常指定压缩方法，是否支持压缩，支持什么压缩方法（gzip，deflate）。 |
         | **Accept-Language**           | 浏览器申明自己接收的语言。语言跟字符集的区别：中文是语言，中文有多种字符集，比如big5，gb2312，gbk等。 |
         | **Accept-Charset**            | 浏览器告诉服务器自己能接收的字符集。                         |
         | **Referer**                   | 浏览器向WEB 服务器表明自己是从哪个网页URL获得点击当前请求中的网址/URL。 |
         | **Refresh**                   | 表示浏览器应该在多少时间之后刷新文档，以秒计时。             |
         | **Cookie**                    | 可向服务端传递数据一种模型。                                 |

   3. 请求体

      1. 客户端传递给服务器的数据。比如：表单使用post方式提交的数据、上传文件数据等。

         ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2kq8getoxj20iy0a3jsf.jpg)

   4. 请求方式

      | 请求方式    | 解释                                                         |
      | ----------- | ------------------------------------------------------------ |
      | **GET**     | 向指定的资源发出“显示”请求。GET请求中会将请求中传递的数据包含在URL中并在浏览器的地址栏中显示。GET请求传递数据时要求数据必须是ASCII字符。GET请求可以被浏览器缓存。 |
      | **POST**    | 向指定资源提交数据，请求服务器进行处理（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求传递数据时，数据可以试试ASCII字符也可以是字节型数据，默认为字符型。POST请求默认情况下不会被浏览器所缓存。 |
      | **HEAD**    | 向服务器索要与GET请求相一致的响应，只不过响应体将不会被返回。这一方法可以在不必传输整个响应内容的情况下，就可以获取包含在响应消息头度中的元信息。 |
      | **PUT**     | 向指定资源位置上传其最新内容。                               |
      | **DELETE**  | 请求服务器删除Request-URI所标识的资源。                      |
      | **TRACE**   | 回显服务器收到的请求，主要用于测试或诊断。                   |
      | **OPTIONS** | 这个方法可使服务器传回该资源所支持的所有HTTP请求方法。用'*'来代替资源名称，向Web服务器发送OPTIONS请求，可以测试服务器功能是否正常运作。 |
      | **CONNECT** | HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。通常用于SSL加密服务器的链接（经由非加密的HTTP代理服务器）。 |

   5. GET和POST的区别：

      ```css
      1. GET在浏览器回退的时候是无害的，而POST会再次提交请求
      2. GET产生的URL地址可以被记录获取到，而POST不可以
      3. GET请求会被浏览器主动cache，而POST不会，除非手动设置
      4. GET请求只能进行URL编码，而POST支持多种编码方式
      5. GET请求参数会被完整保留在浏览器历史记录里，而POST参数不会被保留
      6. GET请求在URL中传送的参数是有长度限制的，而POST没有；对参数的类型，GET只接受ASCLL字符，而POST可以是字符也可以是字节
      7. GET比POST安全性更低，因为参数会暴露在URL中，所以不能用来传递敏感信息
      8. GET参数通过URL传递，POST放在Request body中
      ```



# 四、HTTP协议的响应

1. Response消息也由三部分组成：

   - 第一部分叫Response line
   - 第二部分叫Response header
   - 第三部分叫Response body

2. 服务端为浏览器返回消息格式如下：

   ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2krznv6cfj20hh087gm4.jpg)

3. 响应行

   ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2ks0wc3i4j20mm05lglr.jpg)

   - 响应行：HTTP/1.1 200 OK

     - 和请求消息相比，响应消息多了一个“响应状态码”，它以“清晰明确”的语言告诉客户端本次请求的处理结果。

     - 状态码分类：

       ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2ksxrqlwuj20lr06uq3n.jpg)

     - 状态码列表

       ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2l289zcg2j20lj03z0t8.jpg)

       ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2l28matvpj20lk09jq4l.jpg)

       ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2l29190bmj20lk0bvgo0.jpg)

       ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2l29h81dcj20lk0nldi9.jpg)

       ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2l29vmyqdj20ll03ft8v.jpg)

       ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2l2a5kbyvj20lm094gn1.jpg)

     - 常见状态码及含义

       ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2l2bmvu2zj212a0muwgt.jpg)

4. 响应头

   响应头用于告知浏览器当前响应中的详细信息，浏览器通过获取响应头中的信息可以知道应该如何处理响应结果。响应头中信息的格式为key：value。

   1. **Date**：响应的Date使用的是GMT时间格式，表示响应消息送达时间。
   2. **Server**：服务器通过这个Server告诉浏览器服务器的类型。
   3. **Vary**：客户端缓存机制或者是缓存服务器在做缓存操作的时候，会使用到Vary头，会读取响应头中的Vary的内容，进行一些缓存的判断。
   4. **Content-Encoding**：文档的编码(Encode)方式。用gzip压缩文档能够显著地减少HTML文档的响应时间。
   5. **Content-Length**：表示内容长度。只有当浏览器使用持久HTTP连接时才需要这个数据。
   6. **Content-Type**：表示响应的文档属于什么MIME类型。

5. 响应体

   响应体就是响应的消息体，如果是纯数据就是返回纯数据，如果请求的是HTML页面，那么返回的就是HTML代码，如果是JS就是JS代码，如此之类。



# 五、HTTP缓存

> 浏览器工作过程的第一步就是从网络中下载各种各样的资源，比较耗时，很多不经常发生变化的静态资源可以储存在客户端（保存到本地磁盘中），以便下次使用。
>
> 因此浏览器引入了缓存机制，也叫做HTTP缓存机制。

1. 基本思想

   在客户端建立一个缓存池（资源池），所有对资源的请求都会优先获取缓存中的信息，已决定是否需要向服务器发出请求。

   ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2l2qu9fyfj20u20gnjsi.jpg)

2. 查询方式

   资源的唯一性是通过 URL 来标记的，因此从资源池中查询资源的关键字就是 URL。如果两个资源有不同的 URL，但它们的内容完全一样，也会被认为是两个不同的资源。

3. 生命周期

   由于磁盘存储的空间是有限的，因此，资源池会清除那些“最近最少使用”的资源。

4. 缓存：

   1. **强制缓存**

      1. 在已缓存的资源未失效( 未过期 )的情况下，不会向服务器发送请求，会直接从资源池中读取资源。

      2. 资源未失效：

         ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2l2u3qgzaj20up0ftt98.jpg)

      3. 资源已经失效：

         ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2l2unzkgrj20ub0fk3zo.jpg)

      4. 缓存规则：

         1. 对于强制缓存而言，响应头中有两个字段标明了它的缓存规则，一个是 Expires，另一个是 Cache-Control。

         2. **Expires**

            1. Expires 的值包含具体的日期和时间，是服务器返回的资源到期时间， 即在此时间之前，可以直接从资源池中读取资源，无需再次请求服务器。

            2. ```JSON
               Expires: Wed, 31 Jul 2019 02:58:24 GMT
               ```

         3. **Cache-Control**

            1. Cache-Control 可以被用于请求和响应头中，组合使用多种指令来指定缓存机制。下面列举了比较常用的指令：

               ```css
               private：资源只可以被客户端缓存，Cache-Control 的默认值。
               public：资源可以被客户端和代理服务器缓存。
               max-age=t ：客户端缓存的资源将在 t 秒后失效。
               no-cache：需要使用对比缓存来验证资源( 下面会详细介绍 )。
               no-store：不缓存任何资源。
               ```

               private 和 public 的区别在于是否允许中间节点( 即代理服务器 )进行资源缓存，如果 Cache-Control 值设置为 public：

               客户端 <--> 代理服务器 <--> 服务器

               中间的代理服务器可以缓存资源，如果下一次再请求同一资源，代理服务器就可以直接把自己缓存的资源返回给客户端，而无需再请求服务器。但如果 Cache-Control 值设置为 private，表明资源只能被当前用户在客户端缓存，属于私有缓存，不能作为共享缓存( 代理服务器缓存的资源可以共享 )。

            2. ```json 
               Cache-Control: max-age=31536000
               // Cache-Control 仅指定了 max-age，所以默认为 private，缓存时间为 31536000 秒( 365天 )。也就是说，在 365 天内再次请求该资源时，都会直接使用资源池中的资源。
               ```

            3. **Expires 与 Cache-Control 同时出现**

               Expires 属于 HTTP/1.0 的产物，而 Cache-Control 属于 HTTP/1.1 的产物，如果服务器同时设置了 Expires 与 Cache-Control，那么以更先进的 Cache-Control 为准。在某些不支持 HTTP/1.1 的环境中，Expires 才能发挥作用，现阶段只是一种兼任性的写法。

      5. 强制缓存的弊端

         强制缓存的判定标准，主要依据来自于是否超出某个时间或者某个时间段，而不关心服务器端资源是否已经更新，这可能会导致加载的资源早已不是服务器端最新的内容。

   2. **协商缓存**（对比缓存）

      针对强制缓存的弊端，对比缓存需要进行**资源比对**来判断是否可以使用缓存。
      客户端第一次请求资源时，服务器会将**缓存标识**与资源一起返回给客户端，客户端将二者备份至资源池中。当再次请求相同资源时( 此时，强制缓存期限已到，缓存资源还在 )，客户端将**备份的缓存标识**发送给服务器，服务器根据**缓存标识**进行验证，如果验证结果为未更新，服务器会返回 304 状态码，通知客户端可以继续使用缓存资源。
      有一点需要特别注意：**对比缓存的优先级低于强制缓存**，因此只有在强制缓存失效后，客户端才会携带缓存标识向服务器发起请求。

      1. 资源未更新：

         ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2l39rjqtvj20un0fbjst.jpg)

      2. 资源已经更新：

         ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2l3anbit4j20ud0ezwg3.jpg)

      3. 缓存规则：

         1. 对比缓存最重要的是缓存标识的传递。缓存标识在请求头和响应头之间进行传递，具体方式可以分为以下两组：

            1. **Last-Modified / If-Modified-Since**

               1. 当我们第一次发出请求时，Last-Modified 由服务器返回，通知客户端，该资源的最后修改时间。当我们再次请求该资源时，If-Modified-Since 由客户端发送，其保存了 Last-Modified 的值。服务器收到请求后，将 If-Modified-Since 的值与被请求资源的最后修改时间进行比对。若资源的最后修改时间大于 If-Modified-Since 的值，说明资源被修改过，则返回状态码 200 以及最新资源；若资源的最后修改时间小于或等于 If-Modified-Since 的值，说明资源无修改，则返回状态码 304，通知客户端继续使用缓存资源。

               2. ```json
                  //第二次发出请求时，请求头内容
                  If-Modified-Since: Mon, 23 Jul 2018 08:29:29 GMT
                  
                  //第二次发出请求时，响应头内容
                  Last-Modified: Mon, 23 Jul 2018 08:29:29 GMT
                  
                  //此时，状态码应该为：
                  Status Code: 304 Not Modified
                  ```

            2. **ETag / If-None-Match**

               1. 当我们第一次发出请求时，ETag 由服务器返回，其值为该资源的标签。当我们再次请求该资源时，If-None-Match 由客户端发送，其保存了 ETag 的值。服务器收到请求后，将 If-None-Match 的值与被请求资源的标签进行比对。若资源的标签不等于 If-None-Match 的值，说明资源被修改过，则返回状态码 200 以及最新资源；若资源的标签等于 If-None-Match 的值，说明资源无修改，则返回状态码 304，通知客户端继续使用缓存资源。
                  **ETag / If-None-Match 组合的优先级高于 Last-Modified / If-Modified-Since 组合。**

               2. ```json
                  //第二次发出请求时，请求头内容
                  If-None-Match: W/"5ce-164c641f628"
                  
                  //第二次发出请求时，响应头内容
                  ETag: W/"5ce-164c641f628"
                  
                  //此时，状态码应该为：
                  Status Code: 304 Not Modified
                  ```

   3. 应用缓存机制

      ![img](https://tva1.sinaimg.cn/large/e6c9d24ely1h2l3i453pfj20vn0ij76b.jpg)