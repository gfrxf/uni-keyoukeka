<template>
	<view>
		home
	</view>
</template>

<script setup >
	import { onLoad, onReachBottom } from '@dcloudio/uni-app'
	import {storeToRefs} from 'pinia'
	
	
	
	const homeStore = useHomeStore()
	onLoad(() => {
		// console.log('load111');
		// homeStore.fetchHomeMultidata()
		
	})
</script>

<style lang="scss">

</style>
