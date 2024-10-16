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
					<view class="name">消息中心</view>
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
				
				<view class="pt-4 nav-box padding-main  spacing-mb function-btm margin-bottom-main" style="">
					<view style="box-sizing: border-box;margin:0 auto 32rpx; ">
						
						<view class="flex align-center justify-between nav-box-item"
						 v-for="(item,index) in records" :key="index" >
							<view>
								<text class="date">{{item.desc}}</text>
								<text class="desc">{{item.date}}</text>
							</view>
							
						</view>
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
				records:[
					{date:'2024-08-02',desc:'Lorewfhwfgh',num:'+100',as:'increase'},
					{date:'2024-08-02',desc:'Lorewfhwf',num:'-25',as:'decrease'},
				],
			};
		},

		onShow() {

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
		},

	}
</script>

<style >
	.top-content{background-color: white;min-height: 100vh;}
	.nav-box-item{
		background: #F6F1FF;border-radius: 20rpx; margin-bottom: 30rpx;padding: 30rpx;
		color: #181725;
	}
	.date{display: block;font-weight: 700;font-size: 30rpx}
	.num{font-size: 30rpx;font-weight: 600;}
	.num.increase{color: #1FAA57;}
	.num.decrease{color: #F97B6E;}
	.available{
		padding: 20rpx;
		font-weight: bold;
		color: #6D14B3;
		font-size: 35rpx
	}
</style>
