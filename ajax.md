ajax配合jquery来使用

**get请求数据**

```
$.get('url',参数，回调函数)
```

url： string类型 ，必须填， 是要请求的资源地址

参数（要提交的数据）和回调函数是可选填的

```javascript
<button id="btn">使用get发起不带参数的请求</button>
    <script>
      $(function () {
        $("#btn").on("click", function () {
          $.get("http://www.liulongbin.top:3006/api/getbooks", function (res) {
            console.log(res);
          });
        });
      });
     </script>
```

```javascript
<button id="btn">使用get发起带参数的请求</button>
    <script>
      $(function () {
        $("#btn").on("click", function () {
          $.get("http://www.liulongbin.top:3006/api/getbooks",{id:1}, function (res) {
            console.log(res);
          });
        });
      });
     </script>
//添加了中间的参数之后就可以获取id为2的相关数据，参数的写法需要使用对象的写法
```

**post提交数据**

```javascript
$.post(url,数据,回调函数)
```

url： string类型 ，必须填， 是要请求的资源地址

参数（要提交的数据）和回调函数是可选填的

```javascript
 <button id="btn">提交数据</button>
    <script>
      $(function () {
        $("#btn").on("click", function () {
          $.post(
            "http://www.liulongbin.top:3006/api/addbook",
            {
              bookname: "看见",
              author: "柴静",
              publisher: "上海图书出版社",
            },  //#username=abc&content=abc，也可用这种写法去上传数据，但是属性名要一一对应
            function (res) {
              console.log(res);
            }
          );
        });
      });
    </script>
```



![image-20221204184827197](C:\Users\杨宇浩\AppData\Roaming\Typora\typora-user-images\image-20221204184827197.png)

![image-20221204184917511](C:\Users\杨宇浩\AppData\Roaming\Typora\typora-user-images\image-20221204184917511.png)

post后可以在响应中看到是否成功

**$.ajax()函数的语法**

```javascript
$.ajax({
    type: '',  //请求的方式，例如get或者post
    url: '',  //请求的url地址
    data: {}  //这次请求要携带的数据
    success: function(res){}  //请求成功之后的回调函数
})

```

**第二部分学习**

表单由三个基本部分组成 1.表单标签 2.表单域 3.表单按钮

form标签的属性

![image-20221206164532661](C:\Users\杨宇浩\AppData\Roaming\Typora\typora-user-images\image-20221206164532661.png)

1.action

一.action属性用来规定当提交表单时，向何处发送表单数据

二.action属性的值应该是后端提供的一个url地址，这个url地址专门负责接收表单提交过来的数据，当form表单在未指定action属性值得情况下，action的默认值为当前页面的url地址

2.method

get方式适合用来提交少量的，简单数据（不以保密的方式提交信息）

post方式适合用来提交大量的、复杂的、或包含文件上传的数据（以保密的方式提交信息）

在实际开发中，form表单的post提交方式用的最多，很少用get。例如登录，注册，添加数据等表单操作，都使用post方式来提交表单

3.enctype

在涉及到文件上传操作时，必须将enctype的值设置为multipart/form-data

如果不涉及到文件上传，就直接设置为application/x-www-form-urlencoded即可

**表单同步提交以及他的缺点**

form表单同步提交后，整个页面会发生跳转，跳转到action URL所指向的地址，用户体验很差

form表单同步提交后，页面之前的状态和数据会丢失

**通过jquery来实现监听表单提交事件**

```javascript
<form action="/login" id="f1">
      <input type="text" name="user_name" />
      <input type="password" name="password" />
      <button type="submit">提交</button>
    </form>
    <script>
      $(function () {
        // $("#f1").submit(function () {
        //   alert("监听表单事件方法1");
        // });
        $("#f1").on("submit", function () {
          alert("监听表单事件方法2");
        });
      });
    </script>
```

阻止表单的默认提交行为（阻止表单的提交和页面的跳转）

```javascript
<form action="/login" id="f1">
      <input type="text" name="user_name" />
      <input type="password" name="password" />
      <button type="submit">提交</button>
    </form>
    <script>
      $(function () {
        // $("#f1").submit(function (e) {
        //   e.preventDefault();
        // });
        $("#f1").on("submit", function (e) {
           e.preventDefault();  //通过这行代码来阻止表单的默认提交行为
        });
      });
    </script>
```

快速获取表单的值

```javascript
<form action="/login" id="f1">
      <input type="text" name="user_name" />
      <input type="password" name="password" />
      <button type="submit">提交</button>
    </form>
    <script>
      $(function () {
        $("#f1").on("submit", function (e) {
           e.preventDefault();  //通过这行代码来阻止表单的默认提交行为
           var data= $(this).serialize();
           console.log(data)  //user_name=asd&password=123
            //直接可以获取到表单中的值，但是必须每个input中需要有name属性，不然获取不到他的值，$("").serialize();前面的选择器是指向表单标签form的，也就是说本案中使用$(this).serialize()与$("#f1")。serialize()是同样效果的
        });
      });
    </script>
```

**演示模板引擎的使用**（参考新闻页面的代码）

有了演示模板引擎之后减少对数据操作的工作量（在数据多的时候很好的减少工作量【比用循环添加标签方便】）

1.使用实例

```javascript
<script src="template-web.js"></script> //1.第一步是引进这个引擎
<div id="container"></div>
    <!-- 3.定义模板 -->
    <!-- 3.1.模板的html结构，必须定义到script中,也就是需要
      为script标签添加像如下的type属性 -->
    <script type="text/html" id="tpl-user">
      <h1>{{name}}============{{age}}</h1> //用两个大括号括起来的就是要用到的数据，这是template的标准语法
    </script>
    <script>
      //2.定义要渲染的数据
      var data = { name: "zs", age: 18 };
      // 4.调用template函数,函数的第一个参数为模板的id，
      // 第二个参数为要渲染的数据
      var htmlStr = template("tpl-user", data);
      //5.渲染html结构
      $("#container").html(htmlStr);
    </script>
```

2.标准语法-输出

```javascript
{{value}}
{{obj.key}}
{{obj['key']}}
{{a?b:c}}
{{a|| b}}
{{a + b}}
//在{{}}语法中，可以进行变量的输出，对象属性的输出，三元表达式输出，逻辑或输出等等（如上）
```

3.标准语法原文输出

```javascript
{{<h1>你好<h1>}} //这个是直接将括号内所有东西当字符串输出
{{@ <h1>你好<h1>}} //这样写才能识别到html标签 
```

4.标准语法的判断输出

```javascript
{{if flag==0}}
flag的值是0
{{if flag==1}}
flag的值是1
{{/if}}   //这个flag要在template函数中的data中存在
```

5.标准语法-循环输出

```javascript
{{each arr}}
  {{$index}} {{$value}}
{{/each}}
```

**过滤器的基本使用**

```javascript
<div id="container"></div>
    <script type="text/html" id="tpl-user">
      <h1>{{reg | dataFormat}}</h1>  //这个就是过滤器的使用，有点像linux的管道
    </script>
    <script>
       //这个过滤器的定义还得放在最上面   
      template.defaults.imports.dataFormat = function (date) {  
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y + "-" + m + "-" + d;  //必须要有return
      };
      var data = { reg: new Date() };
      var htmlStr = template("tpl-user", data);
      $("#container").html(htmlStr);
```

**模板引擎的原理**

```javascript
<script>
      // var str = "<div>{{name}}今年{{ age }}岁了</div>";
      // var pattern = /{{\s*([a-zA-Z]+)\s*}}/;
      // var res1 = pattern.exec(str);
      // str = str.replace(res1[0], res1[1]);
      // console.log(str);
      // var res2 = pattern.exec(str);
      // str = str.replace(res2[0], res2[1]);
      // console.log(str);
      // 使用while循环replace
      var data = { name: "张三", age: 20 };
      var str = "<div>{{name}}今年{{ age }}岁了</div>";
      var pattern = /{{\s*([a-zA-Z]+)\s*}}/;   //正则表达式把{{}}及里面的东西筛选出来
      // var patternresult = null;
      // while ((patternresult = pattern.exec(str))) {
      //   str = str.replace(patternresult[0], patternresult[1]);
      // }
      while (pattern.exec(str) !== null) {
        str = str.replace(pattern.exec(str)[0], data[pattern.exec(str)[1]]);  //将data里的数据替换{{}}中的东西
      }
      console.log(str);
    </script>
```



**使用xhr发起get数据请求**

```javascript
<script>
      //1.创建XHR对象
      var xhr = new XMLHttpRequest();
      //2.调用open函数
      xhr.open("get", "http://www.liulongbin.top:3006/api/getbooks");
      //3.调用send函数
      xhr.send();
      //4.监听onreadystatschange事件
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {//这个是判断获取是否正确
          console.log(xhr.responseText//获取服务器响应的数据);
        }
      };
    </script>
// XHR.readyState == 状态（0，1，2，3，4），而且状态也是不可逆的：
//0：请求未初始化，还没有调用 open()。
//1：请求已经建立，但是还没有发送，还没有调用 send()。
//2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）。
//3：请求在处理中；通常响应中已有部分数据可用了，没有全部完成。
//4：响应已完成；您可以获取并使用服务器的响应了。
```

带参数的请求

```javascript
 xhr.open("get", "http://www.liulongbin.top:3006/api/getbooks?id=1");
//url的末尾跟参数，如果是多个参数则使用&
 xhr.open("get", "http://www.liulongbin.top:3006/api/getbooks?id=1&bookname=西游记");
```

**携带参数的本质**

```javascript
$.get('url',{name:'zs',age:20},function(){})
参数的写法有多种
$.get('url?name=zs&age=20',function(){})

```

url编码，在url地址中只允许出现英文相关字母，标点符号，数字，如果url中出现包含中文这样的字符，则需要对中文字符进行编码

![](C:\Users\杨宇浩\AppData\Roaming\Typora\typora-user-images\image-20221209200625529.png)

```javascript
//url解码与编码
var str = "今天星期五";
      var str2 = encodeURI(str); //%E4%BB%8A%E5%A4%A9%E6%98%9F%E6%9C%9F%E4%BA%94
      console.log(str2);
      var str3 = decodeURI("%E4%BB%8A%E5%A4%A9");
      console.log(str3);
//今天  三个%为一个字
```

**使用xhr发起post请求**

```javascript
<script>
      //创建xhr对象
      var xhr = new XMLHttpRequest();
      //调用open函数
      xhr.open("post", "http://www.liulongbin.top:3006/api/addbook");
      //设置content-type属性
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      //调用send函数
      xhr.send("bookname=水浒传&author=施耐庵&publisher=上海图书出版社");
      //监听事件
      xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
          console.log(xhr.responseText);
        }
      };
    </script>
```



**数据交换格式**

一般使用的是json和xml，但是一般使用得比较多的是json

json的本质就是一个字符串

![image-20221209203751524](C:\Users\杨宇浩\AppData\Roaming\Typora\typora-user-images\image-20221209203751524.png)

```javascript
{
    "name": "zs",
    "age": 20,
    "gender": "男",   //字符串必须使用双引号来包括
    "address": null,  //没有的值用null
     "hobby":[]"吃饭","睡觉","打豆豆"]   
}
```

![image-20221209204134086](C:\Users\杨宇浩\AppData\Roaming\Typora\typora-user-images\image-20221209204134086.png)

```javascript
["java","python","php"]
[["a","b","c"],[1,2,3]]
```

![image-20221209204614685](C:\Users\杨宇浩\AppData\Roaming\Typora\typora-user-images\image-20221209204614685.png)

```javascript
var json='{"a":"hello","b":"world"}' //json其实就是字符串
```

**json和js对象的互转**

```javascript
<script>
      var obj = {
        a: "hello",
        b: "world",
      };
      var json = JSON.stringify(obj);  //这个由有js对象转换为json
      console.log(json);
      var obja = JSON.parse(json);   //这个是又json转化为js对象
      console.log(obja); 
    </script>
```

一般服务器响应回来的responseText就是json字符串来的，需要用到里面的数据就要用到上述函数将json转换为js对象

将数据对象转换为字符串的过程叫做序列化，例如调用JSON.stringify()函数操作

将字符串转化为数据对象的过程叫做反序列化，例如调用JSON.parse()函数的操作

**封装自己的ajax函数**

```javascript
function ressolveData(data) {
  var arr = [];
  for (let k in data) {
    arr.push(k + "=" + data[k]);
  }
  return arr.join("&");
}
function itheima(options) {
  var xhr = new XMLHttpRequest();
  //把外界传递过来的参数对象转换为查询字符串
  var qs = ressolveData(options.data);
  if (options.method.toUpperCase() === "GET") {
    xhr.open(options.method, options.url + "?" + qs);
    xhr.send();
  } else if (options.method.toUpperCase() === "POST") {
    xhr.open(options.method, options.url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(qs);
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var result = JSON.parse(xhr.responseText);
      options.success(result);
    }
  };
}

```

**XHR Level2的新特性**

1.设置http的请求时限

```javascript
<script>
      var xhr = new XMLHttpRequest();
      //设置请求时限
      xhr.timeout = 100;   //单位为ms，如果在这段时间访问不成功就执行下面的函数
      //设置超时以后的处理函数，过了上面的时限就会自动停止http请求
      xhr.ontimeout = function () {
        console.log("请求超时了");
      };
      xhr.open("get", "http://www.liulongbin.top:3006/api/getbooks");
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.responseText);
        }
      };
    </script>
```

FormData对象管理表单数据

```javascript
<script>
      //新建FormData对象
      var fd = new FormData();
      //为FormData添加表单项
      fd.append("uname", "zs");
      fd.append("upwd", "123456");
      var xhr = new XMLHttpRequest();
      xhr.timeout = 300;
      xhr.ontimeout = function () {
        console.log("超时了");
      };
      xhr.open("post", "http://www.liulongbin.top:3006/api/formdata");
      //直接提交FormData对象
      xhr.send(fd);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(JSON.parse(xhr.responseText));
        }
      };
    </script>
```

FormData对象获取网页表单的值

```javascript
<form id="form">
      <input type="text" name="user" />
      <input type="password" name="upwd" />
      <input type="submit" value="确认" />
    </form>
    <script>
      var form = document.querySelector("#form");
      form.addEventListener("submit", function (e) {
        //阻止表单默认提交行为
        e.preventDefault();
        //创建FormData，快速获取到form表单中的数据
        var fd = new FormData(form);
        var xhr = new XMLHttpRequest();
        //以下是计算文件的上传进度
          xhr.upload.onprogress = function (e) {  
              //监听xhr.upload的onprogress事件
              /*e.lengthComputable是一个布尔值，表示当前上传的资源是否具有可计算的长度*/
          if (e.lengthComputable) {
              //e.loaded已传输的字节
              //e.total需传输的总字节
            var perventage = Math.ceil((e.loaded / e.total) * 100);
            console.log(perventage);
          }
        };
         
          
        xhr.open("post", "http://www.liulongbin.top:3006/api/formdata");
        xhr.send(fd);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
          }
        };
      });
    </script>
```

**文件上传的综合案例**

用到了jquery，bootstrap库

```javascript
<body>
    <input type="file" id="file1" />
    <button id="btnUpload">上传文件</button>
    <br />
    <img src="" alt="" id="img" width="800" />
    <div class="progress" style="width: 500px">
      <div
        class="progress-bar progress-bar-info"
        id="progress"
        role="progressbar"
        aria-valuenow="20"
        aria-valuemin="0"
        aria-valuemax="100"
        style="width: 0%"
      >
        <span class="sr-only">20% Complete</span>
      </div>
    </div>
    <script>
      //获取文件上传按钮
      var btnUpload = document.querySelector("#btnUpload");
      btnUpload.addEventListener("click", function () {
        //获取到用户选择的文件列表 .files是一个属性，他是文件的长度（数量）
        var files = document.querySelector("#file1").files;
        if (files.length <= 0) {
          return alert("请选择要上传的文件！");
        }
        var fd = new FormData();
        //将用户选择的文件，添加到FormData中
        fd.append("avatar", files[0]);
        var xhr = new XMLHttpRequest();
        //监听xhr.upload的onprogress事件,监听文件上传进度
        xhr.upload.onprogress = function (e) {
          if (e.lengthComputable) {
            //计算出上传的速度
            var perventage = Math.ceil((e.loaded / e.total) * 100);
            console.log(perventage);
            // var progress=document.querySelector('#progress');
            //设置动态进度条
            $("#progress")
              .attr("style", "width:" + perventage + "%")
              .html(perventage + "%");
          }
        };
        //监听上传完成的事件
        xhr.upload.onload = function () {
          $("#progress")
            .removeClass()
            .addClass("progress-bar progress-bar-success");
        };
        xhr.open("post", "http://www.liulongbin.top:3006/api/upload/avatar");
        xhr.send(fd);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            if (data.status === 200) {
              document.querySelector("#img").src =
                "http://www.liulongbin.top:3006" + data.url;
            } else {
              console.log("图片上传失败" + data.message);
            }
          }
        };
      });
    </script>
  </body>
```

**jquery写文件上传**

```javascript
$("#btn-upload").on("click", function () {
        //这个$("#file1")[0]是把jquery对象转换为dom对象
        //使用Files类必须先创建Files类的实例，创建格式如下所示。
        //var 实例名 = 文件域.files;
        var files = $("#file1")[0].files;
        if (files.length <= 0) {
          return alert("请选择文件后再上传");
        }
        var fd = new FormData();
        fd.append("avatar", files[0]);
        $.ajax({
          method: "post",
          url: "http://www.liulongbin.top:3006/api/upload/avatar",
          data: fd,
          processData: false,  //上传文件这两个属性是必须要写的
          contentType: false,  //
          success: function (res) {
            console.log(res);
          },
        });
      });
```

监听到ajax请求被发起

```javascript
$(document).ajaxStart(function(){
    
})
```

监听到ajax完成的事件

```javascript
$(document).ajaxstop(function(){
    
})
```



**axios发起Ajax请求**

1第一步记得已经axios的包

```javascript
<script src="https://cdn.bootcdn.net/ajax/libs/axios/1.2.1/axios.js"></script> //引入包 
<body>
    <button id="btn">发起GET请求</button>
    <button id="btn1">发起post请求</button>
    <button id="btn2">直接使用axios发起GET请求</button>
    <button id="btn3">直接使用axios发起POST请求</button>
    <script>
      document.querySelector("#btn").addEventListener("click", function () {
        //请求的url地址
        let url = "http://www.liulongbin.top:3006/api/get";
        //请求的参数对象
        let paramsObj = { name: "zs", age: 20 };
        //发起get请求
        axios.get(url, { params: paramsObj }).then(function (res) {
          console.log(res);
          //res并不是服务器返回回来的信息，而是axios封装起来的信息，res.data才是服务器返回的信息
        });
      });
      document.querySelector("#btn1").addEventListener("click", function () {
        let url = "http://www.liulongbin.top:3006/api/post";
        let dataObj = { location: "广东", address: "江门" };
        axios.post(url, dataObj).then(function (res) {
          console.log(res);
          console.log(res.data);
        });
      });
      document.querySelector("#btn2").addEventListener("click", function () {
        let url = "http://www.liulongbin.top:3006/api/get";
        let paramsData = { name: "小明", age: 15 };
        axios({
          method: "GET",
          url: url,
          params: paramsData,
        }).then(function (res) {
          console.log(res.data);
        });
      });
      document.querySelector("#btn3").addEventListener("click", function () {
        let url = "http://www.liulongbin.top:3006/api/post";
        axios({
          method: "post",
          url: url,
          data: {
            name: "abc",
            age: 18,
            weight: "75kg",
            height: "178cm",
          },
        }).then(function (res) {
          console.log(res);
        });
      });
    </script>
  </body>
```

**同源策略**

1.同源指的是两个页面的协议，域名和端口号都相同，则两个页面具有相同的源

![image-20221212203651741](C:\Users\杨宇浩\AppData\Roaming\Typora\typora-user-images\image-20221212203651741.png)

![image-20221212204458830](C:\Users\杨宇浩\AppData\Roaming\Typora\typora-user-images\image-20221212204458830.png)

![image-20221212204758337](C:\Users\杨宇浩\AppData\Roaming\Typora\typora-user-images\image-20221212204758337.png)

![image-20221212204952879](C:\Users\杨宇浩\AppData\Roaming\Typora\typora-user-images\image-20221212204952879.png)

![image-20221212205137657](C:\Users\杨宇浩\AppData\Roaming\Typora\typora-user-images\image-20221212205137657.png)

当出现一下报错就是代表出现跨域

![image-20221212223648734](C:\Users\杨宇浩\AppData\Roaming\Typora\typora-user-images\image-20221212223648734.png)

自己实现一个简单的JSONP

jsonp的原理类似于，在html页面定义了一个函数，然后在外部js调用这个函数并返回数据，但这个时候要确保外部js调用的函数在html页面有定义，所以就需要加上查询字符串（如下）

```javascript
<script>
      function success(data) {
        console.log("获取了data数据");
        console.log(data);
      }
    </script>
    <script src="http://www.liulongbin.top:3006/api/jsonp?callback=success&&name=zs&age=20"></script>
//callback=success&&name=zs&age=20,这段叫查询字符串，这样子告诉服务器执行的是哪个函数，
```

![image-20221212230152098](C:\Users\杨宇浩\AppData\Roaming\Typora\typora-user-images\image-20221212230152098.png)

**jquery中的jsonp**

![image-20221213001435216](C:\Users\杨宇浩\AppData\Roaming\Typora\typora-user-images\image-20221213001435216.png)

```javascript
<script>
      $.ajax({
        url: "http://www.liulongbin.top:3006/api/jsonp?&&name=zs&age=20",
        dataType: "jsonp",  //一定要指定
        success: function (res) {
          console.log(res);
        },
      });
    </script>
```

![image-20221212235140569](C:\Users\杨宇浩\AppData\Roaming\Typora\typora-user-images\image-20221212235140569.png)

如果想自定义jsonp的参数以及回调函数名称，可以通过在ajax请求中指定如下两个参数

```javascript
//发送到服务端的参数名称，默认值为callback（一般不修改）
jsonp: 'callback',
//自定义的回调函数名称，默认值为jQueryxxx格式    
jsonpCallback: 'abc',    
```

