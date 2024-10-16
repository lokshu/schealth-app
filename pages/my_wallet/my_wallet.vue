<template>
	<view>
		<contact-fab></contact-fab>
		<view class="top-content">
			<!-- 顶部内容 -->
			<view class="top-bar-head">
				<view class="flex align-center top-title-banner1">
					<view style="width: 20%;">
						<uni-icons type="back" class="top-back-btn" style="font-size: 45rpx; color: #6d14b6;" @click="$back"></uni-icons>
					</view>
					<view class="left-part text-center" style="width: 60%;">
						<view class="name">我的錢包</view>
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
				<view class=" ">
					<!-- 左侧头像 -->
					<view class=" user-message">
						<!-- 用户信息 -->
						<view class="flex align-start justify-between">
							<view class=" flex align-center">
								<!-- 头像 昵称 -->
								<image @tap="preview_event" @error="user_avatar_error"
									class=" circle bg-white va-m photo-left-true" style="margin: 15rpx 16rpx 0 15rpx;"
									:src="avatar" mode=""></image>
								<!-- 信息 -->
								<view class="va-m dis-inline-block cr-white margin-left-xs tl">
									<view data-value="/pages/personal/personal" class="inner-left">
										<view class="left-part">
											<view class="name">陈小明</view>
											<view class="number">會員編號: 00001</view>
										</view>
									</view>
								</view>
							</view>
							
						</view>
						
						<!-- 我的積分 -->
						<view class="my-jifen">
							<u-row class="text-center">
								<u-col class="pt-2 pb-2" span="6" >
									<view>我的積分</view>
									<text>25</text>
								</u-col>
								<u-col class="pt-2 pb-2" span="6" >
									<view>我的禮券</view>
									<text>3</text>
								</u-col>
								
							</u-row>
						</view>
						
					</view>
					
				</view>
			</view>
			
			<view class="content " >
				
				<view class="pt-4 nav-box padding-main  spacing-mb function-btm margin-bottom-main" style="">
					<view style="box-sizing: border-box;margin:0 auto 32rpx; ">
						
						<navigator url="/pages/my_points/my_points" 
						class="flex align-center justify-between nav-box-item" >
							<text class="font-bold">積分記錄</text>
							<view class="">
								<uni-icons type="right" style="font-size: 35rpx;" color="#181725"></uni-icons>
							</view>
						</navigator>
						
						<navigator url="/pages/my_order/my_order" 
						class="flex align-center justify-between nav-box-item">
							<text class="font-bold">
								我的訂單
							</text>
							<view class="">
								<uni-icons type="right" style="font-size: 35rpx;" color="#181725"></uni-icons>
							</view>
						</navigator>
						
						<navigator url="/pages/my_coupons/my_coupons" 
						class="flex align-center justify-between nav-box-item">
							<text class="font-bold" >
								我的禮券
							</text>
							<view class="">
								<uni-icons type="right" style="font-size: 35rpx;" color="#181725"></uni-icons>
							</view>
						</navigator>
						
					</view>
				</view>
				
				<view class="" style="height: 140rpx;"></view>
			</view>
		</view>
		<tab-bar></tab-bar>
	</view>
</template>


<script>
	const app = getApp();

	var common_static_url = app.globalData.get_static_url('common');
	var static_url = app.globalData.get_static_url('user');
	import contactFab from "../../components/contact-fab/contact-fab.vue"
	import tabBar from '../../components/tab-bar/tab-bar.vue';
	export default {
		components: {
			contactFab,tabBar
		},
		data() {
			return {
				avatar: "/static/image2/user/photo.png",
				user_id: '',
				loading: false,
				num: '',
			};
		},

		onShow() {
			//this.init();
		},

		methods: {
			// 个人信息
			init() {
				uni.showLoading({
					title: '加载中...'
				});
				this.$http.request({
					url: "/api/user/info",
					method: 'GET',
					data: {
						token: uni.getStorageSync('user_token'),
						user_id: uni.getStorageSync('user_id'),
					},
					dataType: 'json',
					success: res => {
						uni.stopPullDownRefresh();
						uni.hideLoading();
						if (res.data.code == 0) {
						
						} else {
							if (app.globalData.is_login_check(res.data, this, "goods_favor_event")) {
								app.globalData.showToast(res.data.message)
							} else {
								app.globalData.showToast(res.data.message)
							}
						}
					},
					fail: () => {
						uni.stopPullDownRefresh();
						uni.hideLoading();
						app.globalData.showToast('服务器请求出错');
					}
				});

			},
			// 头像查看
			preview_event() {
				if (app.globalData.data.default_user_head_src != this.avatar) {
					uni.previewImage({
						current: this.avatar,
						urls: [this.avatar]
					});
				}
			},
			// 头像加载错误
			user_avatar_error(e) {
				this.setData({
					avatar: "@/static/image2/user/photo.png",
				});
			},


		},

		// 清除缓存
		remove_user_cache_event(e) {},

		// url事件
		url_event(e) {
			app.globalData.url_event(e);
		}
	}
</script>

<style >
	/**
	 * 顶部内容
	 */
	.top-bar-head {
		background-repeat: no-repeat;
		background-size: 100% auto;
		background-position: top;
		width: 100%;
		background-image: url("@/static/image2/user/account-bg.jpg");
		padding-bottom: 30rpx;
	}
	.top-title-banner1{
		position: relative;
		padding: 40rpx 30rpx 30rpx;
	}
	.top-title-banner1 .left-part{
		color: #6D14B3;
		font-size: 30rpx;
	}
	.top-title-banner1 .left-part .name{
		font-weight: 600;
		font-size: 40rpx;
		margin-bottom: 10rpx;
	}
	.top-title-banner1 .right-part navigator{
		display: inline-block;
		position: relative;
		margin: 10rpx 0 10rpx 25rpx;	
	}
	.top-title-banner1 .right-part navigator uni-text{
		position: absolute;
		background-color: #ffffff;
		color: #6D14B3;
		font-weight: bold;
		right: -14rpx;
		top: -14rpx;
	}
		.my-jifen{
			padding: 20rpx;
			background-color: #ffffff;
			margin: 20rpx 30rpx;
			border-radius: 20rpx;	
		}
	.my-jifen .u-col{
			text-align: center;
			justify-content: center;
			margin: 0 auto;	
		}
	.my-jifen .u-col uni-text{text-align: center;display: block;font-weight: 600;font-size: 40rpx}
	.my-jifen .u-col uni-view{text-align: center;color: #000;}
	
		
		@keyframes shadow {
			50% {
				transform: scale(1.2, 1);
			}
		}
	
	/* 左侧头像 */
	.user-message {
		width: auto;
		box-sizing: border-box;
		padding: 10rpx 30rpx 0;
		/* height: 322rpx; */
		/* box-shadow: 0rpx 6rpx 12rpx 2rpx #FFFAE6; */
		/* margin-top: 50rpx; */
	
	}
	.user-message .name{color: #000000;font-size: 34rpx;font-weight: 600;}
	.user-message .number{color: #000000;}
	
	.photo-left-true {
		width: 132rpx;
		height: 132rpx;
	}
	
	.user-nick {
		font-size: 26rpx;
		color: white;
		font-weight: 600;
		margin-right: 46rpx;
	}
	
	.fcye {
		background: linear-gradient(90deg, #5A4B34 0%, #D0B573 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	
	/**
	 * 头部
	 */
	.head-base {
		width: calc(100% - 60rpx);
		background: #E9F3FC;
		border-radius: 18rpx 18rpx 18rpx 18rpx;
		opacity: 0.95;
		margin: 20rpx auto 90rpx;
		padding-bottom: 50rpx;
	}
	
	
	.head-avatar {
		width: 120rpx;
		height: 120rpx;
	}
	
	.nav-box-item{
		background: white;border-radius: 20rpx; margin-bottom: 30rpx;padding:40rpx 30rpx;
		color: #181725;
	}
</style>
