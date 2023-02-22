<template>


	<tab-control :titles="['图文科普','视频介绍','用药指南']" @tabItemClick="handleTabItemClick"></tab-control>
	<mp-html v-if="!current" :content="contentEl"></mp-html>
	<view class="video" v-if="current === 1">
		<view class="uni-padding-wrap uni-common-mt">
			<view>
				<video id="myVideo" :src="video" @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu
					danmu-btn controls></video>
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="uni-list uni-common-mt">
				<view class="uni-list-cell">
					<!-- <view>
						<view class="uni-label">弹幕内容</view>
					</view> -->
					<view class="uni-list-cell-db">
						<input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
					</view>
				</view>
			</view>
			<view class="uni-btn-v">
				<button @click="sendDanmu" class="page-body-button">发送弹幕</button>
			</view>
			<!-- #endif -->

			<view class="yongyao" v-if="current===1">





			</view>





		</view>
	</view>
</template>



<script>
	import {
		getDetails
	} from '@/service/home.js'
	import tabcontrol from '@/components/tab-control/tab-control.vue'
	export default {
		components: {
			tabcontrol
		},
		data() {
			return {
				tagId: 1,
				contentEl: '',
				test: '<div>Hello World!</div>',
				current: 0,
				src: '',
				danmuList: [{
						text: '可有科卡，战胜疾病的过程不孤单',
						color: '#B0EC64',
						time: 1
					},
					{
						text: '请保持弹幕的友善和合规',
						color: '#B0EC64',
						time: 3
					}
				],
				danmuValue: '',
				video: ''

			}
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},

		onLoad(option) {

			this.tagId = option.tagId
			console.log(this.tagId, 'tagid');
			this.getdetail(this.tagId)

		},
		mounted() {
			// console.log(111);
			// console.log(this.$refs.conEl, 'el');
			// const conEL = document.querySelector('.content')
			// console.log(conEL, 'conel');
		},
		methods: {
			async getdetail(id) {
				const res = await getDetails(id)
				// 反编译后端转移的html
				this.contentEl = this.htmlUnescape(res.data.content)
				//  视频链接
				this.video = res.data.video


			},
			htmlUnescape(html) {
				return html.replace(/&lt;|&gt;|&quot;|&amp;/g, match => {
					switch (match) {
						case '&lt;':
							return '<';
						case '&gt;':
							return '>';
						case '&quot;':
							return '"';
						case '&amp;':
							return '&';



					}
				})
			},
			// 切换tabs
			handleTabItemClick(index) {
				this.current = index
				console.log(this.current, 'current');
			},
			// 视频播放以及弹幕
			sendDanmu: function() {
				this.videoContext.sendDanmu({
					text: this.danmuValue,
					color: this.getRandomColor()
				});
				this.danmuValue = '';
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			getRandomColor: function() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			}

		}
	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		height: 100vh;
	}

	.uni-input {
		height: 100rpx;
	}

	#myVideo {
		width: 100%;
	}

	.yongyao {
		margin-top: 20rpx;
		width: 100%;
		border: 2px solid #B0EC64;
	}
</style>
