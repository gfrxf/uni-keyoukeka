<template>
	<!-- <view ref="contentEl" class="content">
		111
	</view> -->
	<rich-text class="content" :nodes="content.value">

	</rich-text>
	<!-- <rich-text>

	</rich-text> -->

</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		nextTick,
		onMounted,
		ref,
		getCurrentInstance,
		toRef
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

	// 获取this
	const {
		ctx
	} = getCurrentInstance()
	const _this = ctx
	const contentEl = ref()
	let content = ref('')
	let test = '<div style="text-align:center;"><img src="https://web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png"/></div>'
	// const tagId = ref()

	// onLoad((options) => {
	// 	// console.log('options=>', options);
	// 	tagId.value = options.tagId
	// 	console.log(tagId, 'tagid');
	// })
	onLoad(() => {
		getdetail(props.tagId)
		// console.log(content, 'content');

	})
	onMounted(() => {
		// console.log(contentEl.value, 'contentEl');
	})
	async function getdetail(id) {
		const res = await getDetails(id)



		content.value = htmlUnescape(res.data.content)
		console.log(content.value, 'con');
		console.log(typeof content.value, 'type');


	}

	function htmlUnescape(html) {
		return html.replace(/&lt;|&gt;|&quot;|&amp;/g, match => {
			switch (match) {
				case '&lt;':
					return '<';
				case '&gt;':
					return '>';
				case '&quot;':
					return '"';
				case '&amp;':
					return '&';



			}
		})
	}

	function changeContent() {

	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		height: 100vh;
	}
</style>
