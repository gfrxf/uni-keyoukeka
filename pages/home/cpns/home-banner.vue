<template>
	<view class="banner">

		<swiper class="swiper" :indicator-dots="true" indicator-active-color="#B0EC64" :autoplay="true" :interval="3000"
			:duration="500">
			<swiper-item>
				<image class="swiper-item"
					src="https://yun.duiba.com.cn/polaris/1.40bd58dc54c4ea301165f3f9303fd0b8794b67ed.png"
					mode="widthFix"></image>
			</swiper-item>
			<swiper-item>
				<image class="swiper-item"
					src="https://yun.duiba.com.cn/polaris/2.d6f33e1d31f13f3e031637d84c364c172fc7bb73.png"
					mode="widthFix"></image>
			</swiper-item>
			<swiper-item>
				<image class="swiper-item"
					src="https://yun.duiba.com.cn/polaris/3.90aee5697991bde43cc6bf9d1b60fa8dc931a717.png"
					mode="widthFix"></image>
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
		margin-top: -1.5årpx;


	}

	.swiper-item {
		width: 100%;
		display: block;
		height: 100%;
	}
</style>
