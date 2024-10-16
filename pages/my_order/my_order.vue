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
					<view class="name">我的訂單</view>
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
						<block v-for="(item,index) in orders" :key="index">
							<view class="nav-box-item p-0">
								<view class="flex align-center justify-between p-2" style="border-bottom: 1px solid #ccc;">
									<view class="title">訂單編號{{item.orderNo}}</view>
									<view class="date">{{item.date}}</view>
								</view>
								<view class="flex align-center justify-between p-2">
									<view class="title">購買項目</view>
									<view class="all-price-text">總金額</view>
								</view>
								<view class="flex align-center justify-between pl-2 pr-2">
									<view class="desc">{{item.name}} x{{item.num}}</view>
									<view class="price">${{item.price}}</view>
								</view>
								<view class="flex align-center justify-between p-2">
									<view @click="orderDetail(item.orderNo)" class="know-more">了解更多</view>
									<view :class="'status'+item.status">{{item.statusName}}</view>
								</view>
							</view>
						</block>
						
						
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
				orders:[
					{orderNo:'150924-01',date:'15/09/2024',id:1,name:'優選全面身體檢查',price:'7775',status:'1',num:1,statusName:'已付款'},
					{orderNo:'150924-01',date:'15/09/2024',id:1,name:'優選全面身體檢查',price:'518',status:'0',num:2,statusName:'已取消'},
				],
			};
		},

		onShow() {

		},

		methods: {
			orderDetail(){
				uni.navigateTo({
					url:"/pages/my_order/order_detail"
				})
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
	.title{display: block;font-weight: 700;font-size: 30rpx}
	.price{color: #8550B9;font-weight: bold;font-size: 30rpx}
	.all-price-text{color: #8550B9;}
	.know-more{
		color: #8550B9;
		text-decoration: underline;
	}
	.status1{color: #1FAA57;font-weight: bold;}
	.status0{color: #F97B6E;font-weight: bold;}
	.available{
		padding: 20rpx;
		font-weight: bold;
		color: #6D14B3;
		font-size: 35rpx
	}
</style>
