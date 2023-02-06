<template>
	<view class="tab-cntrol">
		<!-- {{titles}} -->
		<!-- <view class="item" v-for="item in titles" key="item">
			<span class="title">{{item}}</span>
		</view> -->
		<template v-for="(item,index) in titles" :key="index">
			<view :class="['item', currentIndex === index ? 'active': '']" @click="handleItemClick(index)">
				<span class="title">{{item}}</span>
			</view>
		</template>

	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	const props = defineProps({
		titles: {
			type: Array,
			default: () => []
		}
	})
	const emit = defineEmits(['tabItemClick'])
	const currentIndex = ref(0)

	function handleItemClick(index) {
		currentIndex.value = index
		emit('tabItemClick', index)
	}
</script>

<style lang="scss">
	.tab-cntrol {
		padding: 10rpx;
		margin-top: 10rpx;
		text-align: center;
		display: flex;
		justify-content: space-between;

		.item {
			flex: 1;
			text-align: center;
			border: 1px solid #B0EC64;

			.title {
				display: inline-block;
				padding: 16rpx;
				border-bottom: 6rpx solid #fff;

			}

			&.active {
				.title {
					color: $gPrimaryColor;
					border-bottom: 6rpx solid #B0EC64;
				}
			}
		}

	}
</style>
