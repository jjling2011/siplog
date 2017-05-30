## Siplog  
A single page blog.  
一个单页博客。  
  
界面通过[card.js][1](我的另一个项目)动态生成。  
后端采用php查询返回数据。  
首页以php定期生成的json文件作为数据来源。  
（单页还有首页这个概念吗？摊手）  
  
    
## 安装  
1.克隆这个源的全部文件到支持php的http目录。例如：`/srv/http`  
`git clone https://github.com/jjling2011/siplog.git`  

2.创建并为http用户添加upload目录的写入权限。  
```
# mkdir upload
# chown http:http upload
# chmod u+rwx upload
```  
  
3.添加mariandb数据库及添加用户(略)  

4.打开浏览器访问 `http://......../siplog/src/install.php` 填入相应信息  

以上


  [1]: https://github.com/jjling2011/card.js