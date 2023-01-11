<template>
	<view class="home">

		<!-- 轮播图组件 -->
		<HomeBanner></HomeBanner>
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

</style>
