<template>
	<view class="card">

		<uni-card>
			<text class="uni-h6">请您慎重选择您所感兴趣的疾病</text>
			<uni-section title="多选" subTitle="您可以选择您感兴趣的多种疾病" type="line">
				<view class="uni-px-5 uni-pb-5">
					<view class="text">多选选中：{{JSON.stringify(checkbox1)}}</view>
					<uni-data-checkbox multiple v-model="checkbox1" :localdata="hobby"></uni-data-checkbox>
				</view>
			</uni-section>
			<view class="submit">
				<button class="subbtn" @click="submitHandle">我已经选择好了</button>
			</view>
		</uni-card>

	</view>
</template>

<script>
	import {
		addDisease
	} from '@/service/home.js'
	export default {

		data() {
			return {
				hobby: [{
						text: '感染性心内膜炎',
						value: 1
					}, {
						text: '高血压',
						value: 2
					}, {
						text: '高脂血症',
						value: 3
					},
					{
						text: '冠心病',
						value: 4
					},
					{
						text: '慢性心包炎',
						value: 5
					},
					{
						text: '慢性心力衰竭',
						value: 6
					},
					{
						text: '心肌疾病',
						value: 7
					},
					{
						text: '心律失常',
						value: 8
					},
				],
				checkbox1: [],
			};
		},
		methods: {
			async submitHandle() {
				console.log(this.checkbox1, 'checkbox1');
				const arg = this.checkbox1.join(',')
				const argumet = JSON.stringify({
					tagId: arg
				})
				console.log(argumet, 'argumet');

				const res = await addDisease(argumet)
				console.log(res, 'res');
				if (res.success === true) {
					uni.showToast({
						title: "添加成功",
						duration: 2000
					})
					uni.switchTab({
						url: '/pages/home/home'
					})
					uni.$emit('update', {
						msg: '页面更新'
					})

				} else {

					uni.showToast({
						title: "失败请重试",
						duration: 2000
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.card {
		width: 100vw;
		height: 100vh;
	}

	.text {
		font-size: 12px;
		color: #666;
		margin-top: 5px;
	}

	.uni-px-5 {
		padding-left: 10px;
		padding-right: 10px;

	}

	.uni-pb-5 {
		padding-bottom: 10px;
	}

	.submit {
		margin: 0 auto;
		background-color: #B0EC64;
		width: 400rpx;
		height: 100rpx;
		margin-top: 200rpx;

		.subbtn {
			background-color: #B0EC64;
		}

	}
</style>
