(function($,window,undefined){
	var signup = window.signup || (window.signup = {});
	$.extend(signup,{
		init: function(){
			$(".signup-box .submit").on("click",function(){
				var name = $(".signup-box input[name=name]").val(),
					password = $(".signup-box input[name=password]").val(),
					repassword = $(".signup-box input[name=repassword]").val(),
					gender = $(".signup-box select[name=gender]").val(),
					avatar = $(".signup-box input[name=avatar]").val(),
					info = $(".signup-box textarea[name=info]").val(),
					errorMsg = "";
				if (name == "") {
					errorMsg = "用户名不能为空";
				} else if (password == "") {
					errorMsg = "密码不能为空";
				} else if (password != repassword) {
					errorMsg = "两次密码输入不一致";
				}
				if (errorMsg) {
					$(".signup-box .error-msg").text(errorMsg).show();
					return;
				} else {
					$(".signup-box .error-msg").hide();
					$.ajax({
						url: '/signup',
						type: 'POST',
						dataType: 'json',
						data: {
							name: name,
							password: password,
							gender: gender,
							avatar: avatar,
							info: info
						},
						success: function(xhr){
							console.log(xhr);
						},
						error: function(err){
							console.log(err);
						}
					});
				}
			});
		}
	});
	$(function(){
		signup.init();
	});
})(jQuery,window);