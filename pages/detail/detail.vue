<template>


	<tab-control :titles="['图文科普','视频介绍']" @tabItemClick="handleTabItemClick"></tab-control>
	<mp-html v-if="!current" :content="contentEl"></mp-html>
	<view class="video" v-if="current">

	</view>
</template>



<script>
	import {
		getDetails
	} from '@/service/home.js'
	import tabcontrol from '@/components/tab-control/tab-control.vue'
	export default {
		components: {
			tabcontrol
		},
		data() {
			return {
				tagId: 1,
				contentEl: '',
				test: '<div>Hello World!</div>',
				current: 0
			}
		},

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
			},
			handleTabItemClick(index) {
				this.current = index
				console.log(this.current, 'current');
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
