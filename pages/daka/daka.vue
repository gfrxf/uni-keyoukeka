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
		data() {
			return {};
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
				console.log(res, 'res');
			}
		},
		onLoad() {
			// 获取打卡列表数据
			this.getdakaImfo()
		}
	}
</script>

<style lang="scss">

</style>
