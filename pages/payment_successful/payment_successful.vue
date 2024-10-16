<template>
	<view style="height: 100vh;background-color: #fff;width: 100%;" class="flex align-center justify-center">
		<view class="content position-re p-4" style="width: 100%;text-align: center;">
			<view class="content-big-box">
				<view class="input-label1 text-center">付款成功</view>
				<image style="width: 200rpx;" src="@/static/image2/register/Successmark.png" mode="widthFix"></image>
				<view class="btns">
					<u-button class="bg-8550B9" @click="linkTo(1)"><text class="fc-fff">查看我的訂單</text></u-button>
					<u-button class="bg-white" @click="linkTo(2)"><text class="fc-8550B9">返回主頁</text></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			linkTo(type){
				if(type==1){
					uni.navigateTo({
						url:'/pages/my_order/my_order'
					})
				}else{
					uni.switchTab({
						url:'/pages/index/index'
					})
				}
			}
		}
	}
</script>

<style>
	.input-label1{
		font-weight: bold;
		font-size: 40rpx;
		color: #000;
		margin-bottom: 30rpx;
	}
	.btns uni-button{
		width: 100%;
		margin-top: 20rpx;
		height: 80rpx;
		font-weight: bold;
		border-radius: 15rpx;
	}
</style>