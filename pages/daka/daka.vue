<template>
	<view>
		<view>
			<uni-calendar ref="calendar" :insert="false" @confirm="confirm" :lunar="true" :start-date="'2023-2-10'"
				:end-date="'2025-2-10'" />
			<button @click="open">打开日历</button>
		</view>


	</view>
</template>

<script>
	import {
		getDakaData
	} from '@/service/daka.js'

	export default {
		components: {
			zqsSelect
		},
		data() {
			return {
				importUserId: [{
						value: '0',
						label: "今日不抽烟"
					},

				],
				clockFlag: '',
				rank: []


			}
		},
		methods: {
			open() {
				this.$refs.calendar.open();
			},
			confirm(e) {
				console.log(e);
			},
			async getdakaImfo() {
				const res = await getDakaData()
				// console.log(res, 'res');
				// this.importUserId = res.data.clockType || []
				// this.rank = res.data.rank || []
				// console.log(this.importUserId, this.rank,
				// 	'test');
			}
		},
		onLoad() {
			// 获取打卡列表数据
			this.getdakaImfo()
		}
	}
</script>

<style lang="scss">
	.main-box {
		display: flex;
		// margin: 20rpx;
		justify-content: space-between;
		background: #f7f7f7;
		padding: 30rpx;
	}
</style>
