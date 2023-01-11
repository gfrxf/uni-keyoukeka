<template>
	<view class="grid-view">
		<template v-for="(item, index)  in listItems" :key="index">
			<view class="item">
				<view class="number">
					<text class="price">{{formatPrice(item)}}</text>
					<text>{{item.unit}}</text>
				</view>
				<view class="name">
					{{item.name}}
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import { computed } from 'vue'
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
			
			const formatPrice = computed(()=>{
				return (item)=>{
					return item.decimal ? item.price.toFixed(item.decimal) : item.price
				}
			})
			return {
				formatPrice
			}
		}
	}
</script>

<style lang="scss">
	.grid-view{
		@include  normalFlex(row, space-between);
		.item{
			padding: 36rpx;
			flex: 1;
			.number{
				text-align: center;
				color: $gNormalColor;
				font-size: 26rpx;
			}
			.price{
				font-size: 48rpx;
				font-weight: 700;
				color: $gPriceColor;
			}
			.name{
				text-align: center;
				color: $gNormalColor;
			}
		}
		
		.item + .item{
			border-left: 1rpx solid $gBgColor;
		}
	}
</style>
