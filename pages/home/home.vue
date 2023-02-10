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

		<!-- 选项卡组件 -->
		<tab-control :titles="['我的','全部']" @tabItemClick="handleTabItemClick"></tab-control>
		<!-- 还未添加 -->
		<view class="addcontent" v-if=" !isAdd && !current">
			<button class="btnEl" @click="addDisease">您还未登记您所患疾病，请先添加</button>
		</view>
		<!-- 我的 -->
		<uni-grid v-if=!current :column="2" :square="false" borderColor="#B0EC64">
			<template v-for="(itemInfo,index) in mydata" :key="index">
				<uni-grid-item>
					<grid-view-item :itemInfo="itemInfo" @itemClick="handleGridItemClick"></grid-view-item>
				</uni-grid-item>
			</template>
		</uni-grid>
		<!-- 全部 -->
		<uni-grid v-if=current :column="2" :square="false" borderColor="#B0EC64">
			<template v-for="(itemInfo,index) in alldata" :key="index">
				<uni-grid-item>
					<grid-view-item :itemInfo="itemInfo" @itemClick="handleGridItemClick"></grid-view-item>
				</uni-grid-item>
			</template>
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
		useHomeStore,

	} from '@/store/home.js'
	import {
		ref,
		toRaw
	} from 'vue'
	import {
		createLogger
	} from 'vuex'

	const current = ref(0)

	const homeStore = useHomeStore()
	const {
		mydata,
		alldata,
		isAdd
	} = storeToRefs(homeStore)


	onLoad(() => {
		const openId = uni.getStorageSync("openid")
		// console.log(openId, 'openid');
		homeStore.fetchMyData(openId) //获取首页疾病列表数据
		homeStore.fetchAllData() //获取首页全部数据


	})

	// tab-control的点击事件,0代表我的。1代表全部
	function handleTabItemClick(index) {
		current.value = index
		// console.log(current.value, 'current');
	}
	// 用户初始登录添加疾病
	function addDiseaseFn() {
		console.log(current.value, 'value');
	}

	//  grid-view-item 的点击事件（会跳转到详情页面）
	function handleGridItemClick(itemInfo) {

		uni.navigateTo({
			url: '/pages/detail/detail?tagId=' + itemInfo.tagId

		})

	}

	function addDisease() {
		uni.navigateTo({
			url: '/pages/add/add?openId'

		})
	}
</script>

<style lang="scss">
	.img4 {
		margin-left: 120rpx;
	}

	// .test {
	// 	display: flex;
	// 	justify-content: center;
	// 	flex-direction: column;
	// }
	.addcontent {
		width: 100%;
		height: 200rpx;

		display: flex;
		justify-content: center;
		align-items: center;

		.btnEl {
			background-color: #B0EC64;
		}
	}
</style>
