$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()
    // 将用户聊天内容追加到页面
    $('#btnSend').on('click', function () {
        personchat();
    })

    $('#ipt').on("keydown", function (event) {
        if (event.keyCode === 13) {
        personchat();
        }
    });

    // 获取聊天机器人发送回来的消息
    function getMsg(text) {
        $.ajax({
            method:'GET',
            url:'http://ajax.frontend.itheima.net:3006/api/robot',
            data:{
                spoken:text
            },
            success:function(json){
                if(json.message === 'success'){
                    // 接受聊天消息
                    var msg = json.data.info.text;
                    $('.talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>')
                    resetui()
                    getVoice(msg)
                }
            }
        })
    }

    function personchat() {
        var text = $('#ipt').val().trim();
        if (text.length <= 0) {
            return $('#ipt').val('')
        }
        $('.talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
        $('#ipt').val('');
        resetui();
        getMsg(text);
    }

    // 将机器人的聊天内容转为语音
    function getVoice(text) {
        $.ajax({
            method:'GET',
            url:'http://ajax.frontend.itheima.net:3006/api/synthesize',
            data:{
                text:text
            },
            success:function(json){
                if(json.status == 200){
                    $('#voice').attr('src',json.voiceUrl)
                }
            }
        })
    }
})
