<template>
	<view class="list-view">
	  	<template v-for="(item, index) in listItems" :key="index">
			<view class="item">
				<image class="item-img" :src="item.icon" ></image>
				<view class="info">
					{{item.info}}
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		props:{
			listItems: {
				type: Array,
				default:function() {
					return []
				}
			}
		},
		setup(){
			return {
				url: 'http://localhost:8080/img/home.7210ddcb.svg'
			}
		}
	}
</script>

<style lang="scss">
	.list-view{
		background-color: white;
		.item{
			height: 88rpx;
			// border: 1px solid red;
			@include normalFlex(row, flex-start);
			align-items: center;
			font-size: 15px;
			color: #333;
			.item-img{
				width: 40rpx;
				height: 40rpx;
				margin-left: 30rpx;
				margin-right: 20rpx;
			}
			.info{
				flex: 1;
				display: flex;
				flex-direction: row;
				align-items: center;
				height: 100%;
				border-bottom: 1rpx solid $gBgColor;
			}
		}
	}
</style>
