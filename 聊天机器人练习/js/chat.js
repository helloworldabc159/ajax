$(function () {
  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中
  resetui();
  // 为发送按钮添加点击事件;
  $("#send").on("click", function () {
    // 判断发送框是否为空
    var content = $("#input_content").val().trim();
    if (content.length <= 0) {
      return $("inout_content").val("");
    }
    //发送信息
    $("#talk_content").append(
      '<li class="right_word"><img src="img/person02.png" /> <span>' +
        content +
        "</span></li>"
    );
    $("#input_content").val("");
    resetui();
    getMsg(content);
  });
  //接受信息的函数
  function getMsg(text) {
    $.ajax({
      type: "GET",
      url: "http://www.liulongbin.top:3006/api/robot",
      data: {
        spoken: text,
      },
      success: function (res) {
        //判断是否有信息返回
        if (res.message === "success") {
          var msg = res.data.info.text;
          $("#talk_content").append(
            '<li class="left_word"><img src="img/person03.png" style="width: 40px; height: 40px"/> <span>' +
              msg +
              "</span></li>"
          );
          getVoice(msg);
          resetui();
        }
      },
    });
  }
  //将信息转化为语音信息并播出
  function getVoice(text) {
    $.ajax({
      type: "get",
      url: "http://www.liulongbin.top:3006/api/synthesize",
      data: {
        text: text,
      },
      success: function (res) {
        if (res.status === 200) {
          $("#video").attr("src", res.voiceUrl);
        }
      },
    });
  }
  //实现按下回车键发送信息
  $("#input_content").on("keyup", function (e) {
    if (e.keyCode === 13) {
      $("#send").click();
    }
  });
});
