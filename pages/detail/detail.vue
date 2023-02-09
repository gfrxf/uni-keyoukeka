<template>
	<!-- <view ref="contentEl" class="content">
		111
	</view> -->
	<!-- 	<rich-text ref="conEl" class="content">
		111111
	</rich-text> -->
	<!-- <rich-text>

	</rich-text> -->
	<!-- <div ref="conEl" class="content"></div> -->
	<!-- 	<view class="" v-html="content">

	</view> -->
	<!-- <rich-text :nodes="content"></rich-text> -->
	<mp-html :content="contentEl"></mp-html>


</template>

// <script setup>
	// 	import {
	// 		onLoad
	// 	} from '@dcloudio/uni-app'
	// 	import {
	// 		nextTick,
	// 		onMounted,
	// 		ref,
	// 		getCurrentInstance,
	// 		toRef
	// 	} from 'vue'
	// 	import {
	// 		getDetails
	// 	} from '@/service/home.js'
	// 	// 获取到页面传递过来的URL参数
	// 	const props = defineProps({
	// 		tagId: {
	// 			type: String,
	// 			default: ''
	// 		}
	// 	})
	// 	// console.log('iid=', props.iid);

	// 	// 获取this
	// 	const {
	// 		ctx
	// 	} = getCurrentInstance()
	// 	const _this = ctx
	// 	const contentEl = ref()
	// 	let content = ref('')
	// 	let test = '<div style="text-align:center;"><img src="https://web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png"/></div>'
	// 	// const tagId = ref()

	// 	// onLoad((options) => {
	// 	// 	// console.log('options=>', options);
	// 	// 	tagId.value = options.tagId
	// 	// 	console.log(tagId, 'tagid');
	// 	// })
	// 	onLoad(() => {
	// 		getdetail(props.tagId)
	// 		// console.log(content, 'content');

	// 	})
	// 	onMounted(() => {
	// 		// console.log(contentEl.value, 'contentEl');
	// 	})
	// 	async function getdetail(id) {
	// 		const res = await getDetails(id)



	// 		content.value = htmlUnescape(res.data.content)
	// 		console.log(content.value, 'con');
	// 		console.log(typeof content.value, 'type');


	// 	}

	// 	function htmlUnescape(html) {
	// 		return html.replace(/&lt;|&gt;|&quot;|&amp;/g, match => {
	// 			switch (match) {
	// 				case '&lt;':
	// 					return '<';
	// 				case '&gt;':
	// 					return '>';
	// 				case '&quot;':
	// 					return '"';
	// 				case '&amp;':
	// 					return '&';



	// 			}
	// 		})
	// 	}

	// 	function changeContent() {

	// 	}
	// 
</script>

<script>
	import {
		getDetails
	} from '@/service/home.js'
	export default {
		data() {
			return {
				tagId: 1,
				contentEl: '',
				test: '<div>Hello World!</div>'
			}
		},
		// props: {
		// 	tagId: {
		// 		type: String,
		// 		default: '',

		// 	}
		// },
		onLoad(option) {

			this.tagId = option.tagId
			console.log(this.tagId, 'tagid');
			this.getdetail(this.tagId)

		},
		mounted() {
			// console.log(111);
			// console.log(this.$refs.conEl, 'el');
			// const conEL = document.querySelector('.content')
			// console.log(conEL, 'conel');
		},
		methods: {
			async getdetail(id) {
				const res = await getDetails(id)

				this.contentEl = this.htmlUnescape(res.data.content)
				// this.$forceUpdate()

				// console.log(this.content, 'content');
				// console.log(typeof this.content, 'type ');

			},
			htmlUnescape(html) {
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

		}
	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		height: 100vh;
	}
</style>
