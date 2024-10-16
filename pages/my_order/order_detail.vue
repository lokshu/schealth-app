<template>
	<view>
		<contact-fab></contact-fab>
		<!-- 顶部内容 -->
		<view class="top-content">
			<view class="flex align-center top-title-banner">
				<view style="width: 20%;">
					<uni-icons type="back" class="top-back-btn" style="font-size: 45rpx; color: #6d14b6;" @click="$back"></uni-icons>
				</view>
				<view class="left-part text-center" style="width: 60%;">
					<view class="name">訂單详情</view>
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
			
			<view class="content " >
				
				<view class="pt-4 nav-box padding-main  spacing-mb function-btm margin-bottom-main">
					<view style="box-sizing: border-box;margin:0 auto 32rpx;">
						<view class="nav-box-item p-2">
							<view class="flex align-center justify-between">
								<view class="title">訂單編號 150924-01</view>
								<view class="date">15/09/2024</view>
							</view>
							<view class="flex align-center justify-between">
								<view class="title">訂單狀態</view>
								<view class="status1">已付款</view>
								<!-- <view class="status0">已取消</view> -->
							</view>
						</view>
					</view>
					
					<view class="p-2">
						<view class="title">客戶資料</view>
						<view class="detail-text">
							<view>姓名：陳小明</view>
							<view>會員號碼： 00001</view>
							<view>電話：+852 1234 5678</view>
						</view>
					</view>
					
					<view class="p-2">
						<view class="title">購買項目</view>
						<view class="detail-text flex justify-between">
							<view>優選全面身體檢查 x1</view>
							<view>$7800</view>
						</view>
					</view>
					
					<view class="p-2">
						<view class="title">付款方式</view>
						<view class="detail-text">
							<view><image style="width: 60rpx;height: 60rpx;" 
							mode="aspectFit" src="../../static/image2/user/card.png"></image> 
							 **** **** **** 3456</view>
							<view style="font-size: 26rpx;">付款日期：15-9-2024 17:17</view>
						</view>
					</view>
					
					<view class="p-2">
						<view class="project-total flex justify-between">
							<view>項目金額</view>
							<view>$7,800</view>
						</view>
						<view class="jifen-youhui flex justify-between">
							<view>積分優惠</view>
							<view>-$25</view>
						</view>
						<view class="all-total flex justify-between">
							<view>總金額:</view>
							<view>$7,775</view>
						</view>
					</view>
					
					<view class="p-2">
						<u-button class="bg-8550B9"
							@click="linkWallet()"
							style="border-radius: 16rpx; margin-top: 30rpx; font-size: 30rpx;">
							<text class="fc-fff font-bold">查看我的錢包</text>
						</u-button>
						<u-button class="" style="border-radius: 16rpx; margin-top: 20rpx;font-size: 30rpx;"
							@click="downloadBill()">
							<text class="fc-8550B9 font-bold">下載單據</text>
						</u-button>
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
				
			};
		},

		onShow() {

		},

		methods: {
			linkWallet(){
				uni.navigateTo({
					url:"/pages/my_wallet/my_wallet"
				})
			},
			downloadBill(){
				
			},
			
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
			
		},

	}
</script>

<style >
	.top-content{background-color: white;min-height: 100vh;}
	.nav-box-item{
		background: #F6F1FF;border-radius: 20rpx; margin-bottom: 30rpx;padding: 30rpx;
		color: #181725;
	}
	.title{display: block;font-weight: 700;font-size: 30rpx;margin-bottom: 10rpx;}
	.price{color: #8550B9;font-weight: bold;font-size: 30rpx}
	.all-price-text{color: #8550B9;}
	.know-more{
		color: #8550B9;
		text-decoration: underline;
	}
	.status1{color: #1FAA57;font-weight: bold;}
	.status0{color: #F97B6E;font-weight: bold;}
	.detail-text uni-view{margin-bottom: 6rpx;}
	.project-total{font-weight: bold;font-size: 30rpx}
	.jifen-youhui{font-weight: bold;font-size: 30rpx;color: #2296D6;margin: 10rpx 0;}
	.all-total{font-weight: bold;font-size: 32rpx;color: #6D14B3;}
</style>
