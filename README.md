## Siplog  
  
一个单页博客。  
A single page blog.  
  
[演示地址][1]  
  
界面通过[card.js][2](我的另一个项目)动态生成。  
后端采用php查询返回数据。  
首页以php定期生成的json文件作为数据来源。  
（单页还有首页这个概念吗？摊手）  
  
    
## 安装  
1.克隆这个项目  
```
git clone https://github.com/jjling2011/siplog.git 
```
  
2.复制dist文件夹到支持php的http目录  
`假设目录为/srv/http`  
```
cd siplog
cp -a dist /srv/http/siplog
```
  
3.创建upload目录,并添加写入权限(通常不需要这步)  
`假设http服务的用户名及组为 http:http`  
```
mkdir /srv/http/siplog/web/upload
chown http:http /srv/http/siplog/web/upload
chmod u+rwx /srv/http/siplog/web/upload
```  
  
4.添加一个数据库并为数据库用户授予以下权限  
```
SELECT,INSERT,UPDATE,DELETE,CREATE,DROP,INDEX,ALTER
```
  
5.打开浏览器输入下网址进行安装  
`http:// ... /siplog/web/install.php`  
  
以上  
  

  [1]: http://ltc.epizy.com/siplog/index.html
  [2]: https://github.com/jjling2011/card.js