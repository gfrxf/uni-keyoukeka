<template>

	<view class="social">
		<button class="chat" @click="handelclick">进入聊天室</button>
		<view v-if="!chatName" class="chatname">
			<fui-input :padding="['20rpx','32rpx']" v-model="text" label="聊天昵称" :bottomLeft="0" placeholder="请输入聊天昵称">
				<fui-button type="gray" color="#B0EC64" bold width="200rpx" height="64rpx" :size="28" @click="xiugai"
					text="提交">
				</fui-button>
			</fui-input>
		</view>

		<!-- <TUIConversation></TUIConversation> -->
		<view class="border">
			<view class="title">
				注意事项
			</view>
			<view class="content">
				<view class="item">1.进入聊天室之前请您填写聊天昵称，才可进入聊天室。如已填写点击进入即可</view>
				<view class="item">
					2.请勿轻信他人，涉及财产问题时请提高警惕
				</view>
				<view class="item">
					3.请友好交流
				</view>
				<view class="item">
					4.注意保护个人隐私
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	import
	genTestUserSig, {
		SDKAPPID
	}
	from '@/debug/GenerateTestUserSig.js'
	import TUIConversation from '@/pages/TUIKit/TUIPages/TUIConversation/index.vue'
	import fuiInput from "@/components/firstui/fui-input/fui-input.vue"
	import {
		changenickname
	} from '@/service/social.js'

	export default {
		components: {
			TUIConversation,
			fuiInput
		},
		data() {
			return {
				SDKAPPID: SDKAPPID,
				text: '',
				chatName: ''


			};
		},
		methods: {
			handelclick() {
				if (!this.chatName) {
					uni.showToast({
						title: "请添加昵称",
						duration: 2000
					})
					return
				}

				let userID = this.chatName
				let userSig = genTestUserSig(userID).userSig
				uni.$TUIKit.tim.login({
						userID: userID,
						userSig: userSig,
					})
					.then((res) => {
						uni.$aegis.reportEvent({
							name: 'login',
							ext1: 'login-success',
							ext2: 'uniTuikitExternalVue3',
							ext3: `${tis.SDKAppID}`,
						})
						if (res.code === 0) {
							uni.showToast({
								title: "login success",
								icon: "loading",
							});
							uni.hideLoading();
							uni.setStorageSync("isLogin", true);
							store.commit("timStore/setLoginStatus", true);
							store.commit("timStore/setUserInfo", {
								userID
							});
							uni.navigateTo({
								url: "/pages/TUIKit/TUIPages/TUIConversation/index",
							});
						} else {
							uni.setStorageSync("isLogin", false);
						}
					})
					.catch((error) => {
						uni.$aegis.reportEvent({
							name: 'login',
							ext1: `login-failed#error:${error}`,
							ext2: 'uniTuikitExternalVue3',
							ext3: `${this.SDKAppID}`,
						})
						uni.setStorageSync("isLogin", false);
						console.warn("login exception = ", error);
					});

				// uni.navigateTo({
				// 	url: '/pages/TUI-Login/login'
				// })
				uni.navigateTo({
					url: '/pages/TUIKit/TUIPages/TUIConversation/index'
				})
			},
			async xiugai() {
				let chatName = JSON.stringify({
					chatName: this.text
				})
				console.log(chatName);
				const res = await changenickname(chatName)
				if (res.success === true) {
					this.chatName = this.text
					uni.setStorageSync('chatName', res.data)
					uni.showToast({
						title: "修改成功",
						duration: 2000
					})
					this.handelclick()
				} else {
					uni.showToast({
						title: res.msg,
						duration: 2000
					})
				}
				console.log(res, 'res');
			}

		},
		onLoad() {
			this.chatName = uni.getStorageSync('chatName')
			console.log(this.chatName, 'chatName789');
		}

	}
</script>
<style lang="scss">
	.chat {
		// height: 30rpx;
		// background-color: #B0EC64;
	}

	.nickname {
		display: flex;
	}

	.border {
		width: 100%;
		// height: 400rpx;
		border: 1px solid #B0EC64;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: 50rpx;

		.content {
			.item {
				margin: 60rpx;
			}
		}



		.title {
			color: red;
			margin: 0 auto;
		}
	}
</style>
