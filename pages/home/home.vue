<template>
	<view>
		home
	</view>
</template>

<script setup >
	import { onLoad, onReachBottom } from '@dcloudio/uni-app'
	import {storeToRefs} from 'pinia'
	import {useHomeStore} from '@/store/home.js'
	
	
	
	const homeStore = useHomeStore()
	onLoad(() => {
		// console.log('load111');
		// homeStore.fetchHomeMultidata()
		
	})
</script>

<style lang="scss">

</style>
