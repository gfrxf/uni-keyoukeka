<template>


	<tab-control :titles="['图文科普','视频介绍']" @tabItemClick="handleTabItemClick"></tab-control>
	<mp-html v-if="!current" :content="contentEl"></mp-html>
	<view class="video" v-if="current">
		<view class="uni-padding-wrap uni-common-mt">
			<view>
				<video id="myVideo"
					src="https://selfpage-gips.cdn.bcebos.com/selfvideo/9ac8aae7c57a252d2f0e821bcebce056.mp4"
					@error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>
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
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				],
				danmuValue: ''

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

				this.contentEl = this.htmlUnescape(res.data.content)
				// this.$forceUpdate()

				// console.log(this.content, 'content');
				// console.log(typeof this.content, 'type ');

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
			handleTabItemClick(index) {
				this.current = index
				console.log(this.current, 'current');
			},
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

	#myVideo {
		width: 100%;
	}
</style>
