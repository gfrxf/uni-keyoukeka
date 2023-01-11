<template>
	<view class="banner">

		<swiper class="swiper" :indicator-dots="true" indicator-active-color="#B0EC64" :autoplay="true" :interval="3000"
			:duration="500">
			<swiper-item>
				<image class="swiper-item" src="@/static/images/home/1.png" mode="widthFix"></image>
			</swiper-item>
			<swiper-item>
				<image class="swiper-item" src="@/static/images/home/2.png" mode="widthFix"></image>
			</swiper-item>
			<swiper-item>
				<image class="swiper-item" src="@/static/images/home/3.png" mode="widthFix"></image>
			</swiper-item>

		</swiper>
	</view>

</template>

<script>
</script>

<style lang="scss">
	.banner {
		width: 100vw;
	}

	.swiper {
		height: 346rpx;
		margin-top: -1.5rpx;


	}

	.swiper-item {
		width: 100%;
		display: block;
		height: 100%;
	}
</style>
