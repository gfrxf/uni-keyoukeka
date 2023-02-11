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
