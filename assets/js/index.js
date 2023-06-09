$(function () {

    getUserInfo();
    let layer = layui.layer;
    $('#btnLogout').on('click', function () {
        // console.log('ok');
        //提示用户是否退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.清空本地存储的tooken
            localStorage.removeItem('token');
            //2.重新跳转到登陆页面
            location.href = './login.html';
            // 关闭提示框
            layer.close(index);
        });
    })
})
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers:{
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status != 0) {
                return layui.layer.msg('获取用户失败');
            }
            //渲染用户头像
            renderAvater(res.data);
        }
        // complete: function(res){
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
        //         //1.强制清空token
        //         localStorage.removeItem('token');
        //         //2.强制跳转到登陆页面
        //         location.href = '/login.html'
        //     }
        //     console.log(res);
        // }
    })
}

function renderAvater(user) {
    //获取用户名称
    let name = user.nickname || user.username;
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //按需渲染用户的头像
    if (user.user_pic != null) {
        //3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //渲染文本图像
        $('.layui-nav-img').hide();
        let first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}