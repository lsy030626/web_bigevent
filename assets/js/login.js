$(function () {
  // 去注册的点击事件
  $('#link_reg').on('click', () => {
    $('.login-box').hide();
    $('.reg-box').show();
  })

  //去登录的点击事件
  $('#link_login').on('click', () => {
    $('.reg-box').hide();
    $('.login-box').show();
  })
})

// 通过layui.verify()设置自定义校验规则
let form = layui.form;
let layer = layui.layer;
form.verify({
  //校验用户名的规则
  custom: [/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/, "用户以字母开头，5-16位"],
  //校验密码的规则
  pwd: [/^[\S]{6,12}$/, "密码必须为6-12位，且不能出现空格"],
  //校验密码是否一致
  repwd: function (value) {
    let pwd = $('.reg-box [name=password]').val();
    if (pwd != value) {
      return '两次密码不一致';
    }
  }
})


// 监听注册表单的提交时间
$('#form_reg').on('submit', function (e) {
  e.preventDefault();
  let data =  { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
  // console.log($('#form_reg [name=username]').val());
  // console.log($('#form_reg [name=password]').val());
  $.post('/api/reguser',data,function (res) {
        if(res.status != 0 ){
          return layer.msg(res.message);
        }
        layer.msg("注册成功，请登录！");
        // 模拟人点击去登录的点击事件
        $('#link_login').click();
    })
})

//监听登录的事件
$('#form_login').submit(function(e){
  e.preventDefault();
  $.ajax({
    url:"/api/login",
    method:'POST',
    //快速获取表单的数据
    data:$(this).serialize(),
    success: function(res){
      if(res.status !=0){
        return layer.msg("登陆失败！");
      }
      layer.msg("登陆成功！");
      console.log(res.token);
      // 将登陆成功后保存到的token字符串保存到localstorage中
      localStorage.setItem('token',res.token);
      location.href = './index.html';
    }
  })
})