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
					<view class="name">我的禮券</view>
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
						
						<view class="nav-box-item"
						 v-for="(item,index) in coupons" :key="index" >
							<u-row @click="couponModal=true">
								<u-col span="3">
									<view class="ima-box">
										<image :src="item.image" mode="aspectFit" style="width: 80rpx;height: 80rpx;max-width: 100%;"></image>
									</view>
								</u-col>
								<u-col span="9">
									<text class="title">{{item.title}}</text>
									<text class="desc">{{item.desc}}</text>
									<text class="valid">Valid until {{item.valid}}</text>
								</u-col>
								
							</u-row>
							
							
						</view>
						
					</view>
				</view>
				
				<view class="" style="height: 140rpx;"></view>
			</view>
		</view>
		<u-modal :show="couponModal" :showConfirmButton="false">
			<view class="" style="width: 100%;">
				<view class="text-right"><uni-icons @click="couponModal=false" type="closeempty" style="color: #181725;"></uni-icons></view>
				<view class="modal-box">
					
					<view>
						<text class="title">Lorem ipsum</text>
						<text class="desc">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sut labore et dolore magna aliqua.
						</text>
						<text class="valid" style="color: #6d14b6;">
							Valid until 01 February 2026
						</text>
						
						<ul>
							<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
							<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
							<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
							<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
						</ul>
						
						<u-button class="use-coupon-btn" @click="useCoupon">使用禮券</u-button>
						
					</view>
				</view>
			</view>
		</u-modal>
		
		<u-modal :show="qrCodeModal" :showConfirmButton="false">
			<view class="" style="width: 100%;">
				<view class="text-right"><uni-icons @click="qrCodeModal=false" type="closeempty" style="color: #181725;"></uni-icons></view>
				<view class="modal-box">
					
					<view style="border-bottom: 1px solid #DADADA;">
						<text class="title">陳小明</text>
						<text class="desc">
							會員編號：00001
						</text>
					</view>
					<view class="qr-code-box">
						<image src="../../static/image2/user/QR_Code.png"
						style="max-width: 100%;" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</u-modal>
		
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
				coupons:[
					{
						title:'Lorem ipsum',
						desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sut labore et dolore magna aliqua.',
						valid:'01 February 2026',
						image:'../../static/image2/index/category2.png',
						id:1
					},
					{
						title:'Lorem ipsum 2',
						desc:'Lorem ipsum dolor, consectetur adipiscing elit, sut labore et dolore magna aliqua.',
						valid:'01 February 2026',
						image:'../../static/image2/index/category3.png',
						id:2
					},
					{
						title:'Lorem ipsum',
						desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sut labore et dolore magna aliqua.',
						valid:'01 February 2026',
						image:'../../static/image2/index/category2.png',
						id:3
					},
					{
						title:'Lorem ipsum 2',
						desc:'Lorem ipsum dolor, consectetur adipiscing elit, sut labore et dolore magna aliqua.',
						valid:'01 February 2026',
						image:'../../static/image2/index/category3.png',
						id:4
					},
					{
						title:'Lorem ipsum',
						desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sut labore et dolore magna aliqua.',
						valid:'01 February 2026',
						image:'../../static/image2/index/category2.png',
						id:5
					},
					{
						title:'Lorem ipsum 2',
						desc:'Lorem ipsum dolor, consectetur adipiscing elit, sut labore et dolore magna aliqua.',
						valid:'01 February 2026',
						image:'../../static/image2/index/category3.png',
						id:6
					},
					
					
				],
				couponModal:false,
				qrCodeModal:false,
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
			useCoupon(){
				this.couponModal=false
				this.qrCodeModal=true
			}
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
	.desc{margin: 15rpx 0;display: block;}
	.valid{color: #ccc;}
	.use-coupon-btn{
		border:0;
		border-radius: 16rpx;
		background-color: #8550B9;
		color: #fff;
		margin-top: 20rpx;
	}
	ul{
		margin-top: 20rpx;
		padding-left: 30rpx;
		font-size: 25rpx
	}
	ul li{padding-bottom: 10rpx;}
	.qr-code-box{
		width: 80%;
		margin: 20rpx auto;
	}
</style>
