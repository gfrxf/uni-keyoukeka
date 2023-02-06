<template>
	<!-- 	<view v-html="content">

	</view> -->
	<rich-text>

	</rich-text>

</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		nextTick,
		onMounted,
		ref
	} from 'vue'
	import {
		getDetails
	} from '@/service/home.js'
	// 获取到页面传递过来的URL参数
	const props = defineProps({
		tagId: {
			type: String,
			default: ''
		}
	})
	// console.log('iid=', props.iid);
	let content = ''



	// const tagId = ref()

	// onLoad((options) => {
	// 	// console.log('options=>', options);
	// 	tagId.value = options.tagId
	// 	console.log(tagId, 'tagid');
	// })
	// 	onLoad(() => {
	// 		getdetail(props.tagId)
	// 	})
	// async function getdetail(id) {
	// 	const res = await getDetails(id)
	// 	content = res.data.content || ''
	// 	console.log(content, 'content');
	// }
</script>

<style lang="scss">
	.text {
		width: 100vw;
		height: 100vh;
	}
</style>
