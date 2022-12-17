$(function () {
  //补零
  function zero(n) {
    if (n < 10) {
      return "0" + n;
    } else {
      return n;
    }
  }
  function getnews() {
    $.get("http://www.liulongbin.top:3006/api/news", function (res) {
      if (res.status !== 200) return alert("无法查询新闻");
      console.log(res);
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].tags = res.data[i].tags.split(",");
      }
      template.defaults.imports.dataFormat = function (dtstr) {
        var dt = new Date(dtstr);
        var y = dt.getFullYear();
        var m = dt.getMonth() + 1;
        var d = dt.getDate();
        var h = zero(dt.getHours());
        var min = zero(dt.getMinutes());
        var s = zero(dt.getSeconds());
        return y + "-" + m + "-" + d + " " + h + ":" + min + ":" + s;
      };
      var htmlstr = template("ipt-news", res);
      $("#news-list").html(htmlstr);
    });
  }
  getnews();
});
