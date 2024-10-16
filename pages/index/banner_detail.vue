<template>
	<view class="appointment-page chun-img-text">
		
		<view class="top-title-banner">
			<view class="flex align-center">
				<view style="width: 20%;">
					<uni-icons class="top-back-btn" type="back" style="font-size: 45rpx; color: #6d14b6;" @click="$back"></uni-icons>
				</view>
				<view class="left-part text-center" style="width: 60%;">
					<view class="name"></view>
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
		
		<view class="content" v-html="content">
			
		</view>
		
		
		<view class="" style="height: 120rpx;"></view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				content:`
				<image src="../../static/image2/index/banner.jpg" class="img1" mode="aspectFit"></image>
				<view class="content-big-box">
					<view class="title1">Lorem Ipsum</view>
					<view class="p1">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</view>
					<view class="title2">Lorem</view>
					<ul>
						<li>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
							sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</li>
						<li>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
							sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</li>
					</ul>
				</view>
				`
			}
		},
		
		mounted() {
			
		},
		onLoad(res) {
			console.log(res)
		},
		onShow() {
			
		},
		methods: {
			
		}
	}
</script>


<style lang="scss">
	
</style>
