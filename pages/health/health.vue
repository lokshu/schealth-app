<template>
	<view class="health-page">
		
		<view class="top-title-banner">
			<view class="flex align-center">
				<view style="width: 20%;">
					<!-- <uni-icons type="back" class="top-back-btn" style="font-size: 45rpx; color: #6d14b6;" @click="$back"></uni-icons> -->
				</view>
				<view class="left-part text-center" style="width: 60%;">
					<view class="name">我的健康</view>
				</view>
				<view class="right-part text-right" style="width: 20%;">
					<navigator url="/pages/message_center/message_center" class="notifi-icon">
						<u-badge value="1"></u-badge>
						<image src="../../static/images/message.png" alt="" style="width: 40rpx; height: 40rpx; margin: 0;"></image>
					</navigator>
					<navigator url="/pages/cart/cart" class="cart-icon" >
						<image src="../../static/images/cart.png" alt="" style="width: 40rpx; height: 40rpx;margin: 0;"></image>
					</navigator>
				</view>
			</view>
		</view>
		<!-- top end -->
		<view class="" style="height: 120rpx;"></view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				
			}
		},
		
		mounted() {
			
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods: {
			
		}
	}
</script>


<style lang="scss">
	@import url("health.css");

</style>
