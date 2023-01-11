<template>
	<view class="user-info" @click='itemClick'>
		<view class="user-icon">
			<image class="avatar" :src="avatarUrl"></image>
			<!-- <image :src="touxiang"></image> -->
		</view>

		<view class="login-info">
			<view v-if="!isLogin" class="name">
				<button type="primary" @click="handleClick" class="login"			>登录</button>
			</view>
			<view v-if="isLogin" class="userinfo">
				<text class="nickname">{{nickName}}</text>
			</view>
			<!-- 	<view class="phone">
				<image class="phone-icon" src="../../../static/images/profile/phone.png"></image>
				<text>暂无绑定手机号</text>
			</view> -->
		</view>

		<!-- <image class="arrow" src="../../../static/images/profile/arrow.png" ></image> -->
	</view>
</template>

<script setup>
	import {
		getCode,
		getUserInfo,
		getMytoken
	} from '@/service/profile.js'
	import {
		ref,onBeforeMount, onMounted
	} from 'vue'
	import {
		useProfileStore
	} from '@/store/profile.js'

	import touxiang from "../../../static/images/profile/avatar-default.png"
	// import {} from 
	
	const profileStore = useProfileStore()

	// 定义响应式数据
	const isLogin = ref(false)
	const nickName = ref("")
	const avatarUrl = ref("")
	const openid = ref("")
	avatarUrl.value = touxiang
	
	// 页面加载时判断用户是否之前登陆过
	 onMounted(() =>{
		 // console.log('onmountes');
		openid.value = uni.getStorageSync("openid") || ""
		console.log(openid.value,'openid');
		if(openid.value){
			nickName.value = uni.getStorageSync("nickName")
			avatarUrl.value = uni.getStorageSync("avatarUrl")
			isLogin.value = true
		}else{
			 handleClick()
		}
	})
	// 登录
	async function handleClick() {
		// console.log('点击登录');
		// 获取用户信息
		const res = await getUserInfo()
		// console.log(res);
		const userInfo = res.userInfo
		const rawData = res.rawData
		const signature = res.signature
		// console.log(userInfo,'userinfo');
		

		

		// 获取code
		const code = await getCode()
		// console.log(code);

		// 获取openid
		const resm = await getMytoken(code, avatarUrl.value, nickName.value, rawData, signature)
		console.log(resm,'resm');
		if(resm.success === true){
			// 设置当前页面头像和昵称
			avatarUrl.value = userInfo.avatarUrl
			nickName.value = userInfo.nickName
			openid.value = resm.data
			// 存储个人信息
			profileStore.setnickName(nickName.value)
			profileStore.setavatarUrl(avatarUrl.value)
			profileStore.setopenid(openid.value)
			
			uni.setStorageSync("openid",openid.value)
			uni.setStorageSync("avatarUrl",avatarUrl.value)
			uni.setStorageSync("nickName",nickName.value)
			// console.log(openid, 'openid');
			
			// 展示个人信息组件
			isLogin.value = true
			// 存储用户名和头像信息
			uni.showToast({
				title:"登录成功",
				duration:2000
			})
			
		}else{
			uni.showToast({
				title:"请再次登录",
				duration:2000
			})
		}
		
	}
</script>

<style lang="scss">
	.user-info {
		padding: 30rpx;
		height: 120rpx;
		background-color: $gTintColor;
		margin-top: -2rpx;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		.user-icon {
			width: 120rpx;
			height: 120rpx;
			background-color: white;
			border-radius: 100%;

			.avatar {
				width: 100%;
				height: 100%;
			}
		}

		.login-info {
			flex: 1;
			padding: 20rpx;
			display: flex;
			flex-direction: column;
			color: white;

			.phone {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-top: 10rpx;
				color: white;
				opacity: .8;
				font-size: 26rpx;

				.phone-icon {
					width: 36rpx;
					height: 36rpx;
					margin-right: 5rpx;
				}
			}

			.login {
				font-size: 30rpx;
				width: 129rpx;
				height: 90rpx;
				margin-right: 50rpx;
				line-height: 90rpx;
			}
			.nickname{
				margin-left:350rpx ;
			}
		}

		.arrow {
			width: 32rpx;
			height: 40rpx;
		}
	}
</style>
