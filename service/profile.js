import DxRequest from './index.js'

// 微信小程序换取token
export function getCode(){
	return new Promise ((resolve,reject) => {
		uni.login({ 
			"provider": "weixin",
			"onlyAuthorize": true, // 微信登录仅请求授权认证
			success: (res) =>{
				console.log(res,'code');
				resolve(res.code)
			},
			fail: function (err) {
		        // 登录授权失败  
		        // err.code是错误码
				// reject(err)
		    }
		})
	})
}

// 获取后台opoenid
export const getMytoken =  (code,avatarUrl,nickName,rawData,signature) => {
	return DxRequest.post('/login/login', {
		code:code,
		avatarUrl:avatarUrl,
		nickName:nickName,
		rawData:rawData,
		signature:signature
	})
}

// 获取用户微信信息
 export function getUserInfo(){
	 return new  Promise ((reslove,reject) =>{
		 uni.getUserProfile({
			 desc:"获取你的昵称、头像",
			 success:(res)=>{
				 reslove(res)
			 },
			 fail: function (err) {
			     // 登录授权失败  
			     // err.code是错误码
			 	// reject(err)
			 }
		 })
	 }) 
 }

