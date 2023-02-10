<template>
	<view>
		<view>
			<uni-calendar ref="calendar" :insert="false" @confirm="confirm" :lunar="true" :start-date="'2023-2-10'"
				:end-date="'2025-2-10'" />
			<button @click="open">打开日历</button>
		</view>
		<fui-radio-group>
			<fui-label v-for="(item,index) in radioItems" :key="index">
				<fui-list-cell>
					<view class="fui-list__cell">
						<text>{{item.name}}</text>
						<fui-radio :checked="item.checked" :value="item.value">
						</fui-radio>
					</view>
				</fui-list-cell>
			</fui-label>
		</fui-radio-group>

	</view>
</template>

<script>
	import {
		getDakaData
	} from '@/service/daka.js'
	import fuiRadioGroup from "@/components/firstui/fui-radio-group/fui-radio-group.vue"
	import fuiRadio from "@/components/firstui/fui-radio/fui-radio.vue"
	export default {
		components: {
			fuiRadioGroup,
			fuiRadio
		},
		data() {
			return {
				val: '1',
				radioItems: [{
						name: '小于18岁',
						value: '1',
						checked: true
					},
					{
						name: '18~28岁',
						value: '2',
						checked: false
					},
					{
						name: '29~40岁',
						value: '3',
						checked: false
					}
				]


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
	page {
		font-weight: normal;
	}

	.fui-section__title {
		margin-left: 32rpx;
	}

	.fui-list__item {
		width: 100%;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		padding: 28rpx 32rpx;
		box-sizing: border-box;
	}

	.fui-text {
		font-size: 30rpx;
		padding-left: 16rpx;
	}

	.fui-list__cell {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
