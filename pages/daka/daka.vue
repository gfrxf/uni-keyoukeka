<template>
	<view>
		<head-item :rank="rank"></head-item>
		<view>
			<uni-calendar ref="calendar" :insert="false" @confirm="confirm" :lunar="true" :start-date="'2023-2-10'"
				:end-date="'2025-2-10'" />
			<button @click="open">打开日历</button>
		</view>

		<fui-checkbox-group>
			<fui-label v-for="(item,index) in checkboxItems" :key="index">
				<fui-list-cell>
					<view class="fui-list__cell">
						<text>{{item.clockTypeDetail}}</text>
						<fui-checkbox :checked="item.checked" color="#B0EC64" :value="item.clockTypeId">
						</fui-checkbox>
					</view>
				</fui-list-cell>
			</fui-label>
		</fui-checkbox-group>
		<!-- <button class="dakabtn" @click="handleClick">选好了打卡</button> -->
		<view class="dakabtn">
			<fui-button :disabled="clockFlag" type="success" :text="msg" @click="handleClick"></fui-button>
		</view>

	</view>
</template>

<script>
	import {
		getDakaData,
		daka
	} from '@/service/daka.js'
	import fuiCheckboxGroup from "@/components/firstui/fui-checkbox-group/fui-checkbox-group.vue"
	import fuiCheckbox from "@/components/firstui/fui-checkbox/fui-checkbox.vue"
	import fuiButton from "@/components/firstui/fui-button/fui-button.vue"
	import headItem from './cpns/headItem.vue'
	export default {
		components: {
			fuiCheckboxGroup,
			fuiCheckbox,
			fuiButton,
			headItem
		},
		data() {
			return {
				val: '1',
				checkboxItems: [],
				clockFlag: false,
				msg: '选好了打卡',
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
				this.checkboxItems = res.data.clockType
				this.clockFlag = res.data.clockFlag
				this.rank = res.data.rank?.slice(0, 5)
				console.log(this.rank, 'rank');
				if (res.data.clockFlag === true) {
					this.msg = '今日已打卡'
				}



			},
			async handleClick() {
				const res = await daka()
				if (res.success === true) {

					uni.showToast({
						title: "成功获得5积分",
						duration: 2000
					})
					this.getdakaImfo()
				} else {
					uni.showToast({
						title: res.msg,
						duration: 2000
					})
				}
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

	.dakabtn {
		margin-top: 80rpx;
		// background-color: #B0EC64;

	}
</style>
