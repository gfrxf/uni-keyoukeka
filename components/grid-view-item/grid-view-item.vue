<template>
	<view class="goods-item" @click="handleItemClick">
		<image class="image" :lazy-load="true" :src="itemInfo.img" mode=""></image>
		<view class="desc-info">
			<view class="title">
				{{itemInfo.title}}
			</view>
			<view class="info">
				<image class="icon" :lazy-load="true" src="@/static/images/home/favor.png" mode=""></image>
				<span>收藏数：{{itemInfo.collectTimes}}</span>
			</view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		itemInfo: {
			type: Object,
			default: () => {}
		}
	})
	const emit = defineEmits(['itemClick'])

	function handleItemClick() {
		emit('itemClick', props.itemInfo)
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.image {
			width: 180rpx;
			height: 180rpx;
		}

		.info {
			display: flex;
			justify-content: center;
			margin-top: 15rpx;

			.icon {
				width: 50rpx;
				height: 50rpx;
				// margin-left: -6rpx;
			}
		}
	}
</style>
