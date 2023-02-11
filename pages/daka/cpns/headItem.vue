<template>
	<view class="headItem">
		<view class="title">
			积分排行榜
		</view>
		<view class="head">
			<template v-for="(item,index) in rank" :key="index">
				<view class="item"
					:class="[index == 0 ? 'item1' : '',index == 1 ? 'item1' : '', index === 2 ? 'item3' : '']">
					<img class="img" :src="item.avatar" alt="">
					<view class="info">
						<view class="text1">用户:{{item.nickName}}</view>
						<view class="text2">积分:{{item.score}}</view>
					</view>

				</view>

			</template>
		</view>
		<!-- <img :src="require(`@/static/images/daka/${1}.png`)" alt=""> -->
		<img class="main img1" src="@/static/images/daka/1.png" alt="">
		<img class="main img2" src="@/static/images/daka/2.png" alt="">
		<img class="main img3" src="@/static/images/daka/3.png" alt="">

	</view>
</template>

<script>
	export default {
		props: {
			// 检测类型 + 其他验证
			rank: {
				type: Array,
				default: [],
				required: true,

			}

		},
		data() {
			return {
				// arr: rank.slice(0, 3)
			}
		}
	}
</script>

<style lang="scss">
	.headItem {
		display: flex;
		flex-direction: column;

		// align-items: center;
		.title {
			margin: 0 auto;
		}

		.head {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			position: relative;
			margin-top: 20rpx;

			.item {
				box-sizing: border-box;
				border-radius: 5rpx;
				display: flex;
				align-items: center;
				width: 100%;
				margin-bottom: 15rpx;
				border: 1px solid #B0EC64;
				padding: 10rpx;


				.img {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
				}

				.info {
					margin-left: 60rpx;
					font-size: 30rpx;

					.text1 {}

					.text2 {}
				}
			}

		}

		.main {
			position: absolute;
			width: 80rpx;
			height: 80rpx;

		}

		.img1 {
			left: 86%;
			top: 10%;
		}

		.img2 {
			left: 86%;
			top: 27%;
		}

		.img3 {
			left: 86%;
			top: 44%;
		}
	}
</style>
