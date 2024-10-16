<template>
	<view>
		<!-- 顶部内容 -->
		<view class="top-content public-top">
			<!-- 内容 -->
			<view class="content position-re" style="">
				<!-- 头像 -->
				<view class="" style="padding-top: 50%;">
					<image class="photos" src="@/static/image2/register/logo.png" mode="widthFix"></image>
				</view>
				<!-- 按钮 -->
				<view class="login-register-btn">
					<navigator url='/pages/login/login'>登入</navigator>
					<navigator url='/pages/register/register'>註冊</navigator>
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
		onLoad(item) {
			
		},
		onShow() {
			
		},

		methods: {
			
		}
	}
</script>

<style>
	.top-content {
		width: 100%;
		min-height: 100vh;
		background: url("@/static/image2/register/background.png") no-repeat;
		background-size: 100% 100%;
	}
	/* 头像 */
	.photos {
		width: 204rpx;
		margin: 0 auto 64rpx;
		display: block;
		border-radius: 30rpx;
	}
	.login-register-btn{margin: 32rpx;}
	.login-register-btn navigator{
		display: block;
		padding: 20rpx;
		text-align: center;
		font-size: 30rpx;
		border-radius: 10rpx;
		margin-bottom: 32rpx;background-color: #6D14B3;color: #FFFFFF;border: 1px solid #6D14B3;
		}
	.login-register-btn navigator:last-child{
		background-color: #FFFFFF;color: #6D14B3;border-color: #6D14B3;
	}
</style>
