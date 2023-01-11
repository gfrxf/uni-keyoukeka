<template>
	<view class="home">

		<!-- 轮播图组件 -->
		<HomeBanner></HomeBanner>

		<!-- 四个图片展示 -->
		<uni-grid :column="2">
			<uni-grid-item>
				<image src="../../static/images/home/img1.png" mode="heightFix"></image>
			</uni-grid-item>
			<uni-grid-item>
				<image src="../../static/images/home/img10.png" mode="heightFix"></image>
			</uni-grid-item>
			<uni-grid-item>
				<image src="../../static/images/home/img7.png" mode="heightFix"></image>
			</uni-grid-item>
			<uni-grid-item>
				<image class="img4" src="../../static/images/home/img4.png" mode="heightFix"></image>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script setup>
	import
	HomeBanner
	from './cpns/home-banner.vue'
	import {
		onLoad,
		onReachBottom
	} from '@dcloudio/uni-app'
	import {
		storeToRefs
	} from 'pinia'
	import {
		useHomeStore
	} from '@/store/home.js'



	const homeStore = useHomeStore()
	onLoad(() => {
		// console.log('load111');
		// homeStore.fetchHomeMultidata()

	})
</script>

<style lang="scss">
	.img4 {
		margin-left: 120rpx;
	}
</style>
