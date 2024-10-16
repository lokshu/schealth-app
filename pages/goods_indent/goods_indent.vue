<template>
	<view class="position-re bg-white goods-indent-page" style="min-height: 100vh;">
		<!-- 标头 -->
		<view class="top-title-banner">
			<view class="flex align-center">
				<view style="width: 20%;">
					<uni-icons class="top-back-btn" type="back" style="font-size: 45rpx; color: #6d14b6;" @click="$back"></uni-icons>
				</view>
				<view class="left-part text-center" style="width: 60%;">
					<view class="name">訂單結算</view>
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
		
		<!-- 商品 -->
		<view class="selected-goods p-2">
			<u-row>
				<u-col span="4" class="img-box pr-2">
					<image src="../../static/image2/index/product1.jpg"
					style="width: 100%;max-width: 100%;height: 200rpx;" mode="aspectFit"></image>
				</u-col>
				<u-col span="7">
					<view class="goods-name">優選全面身體檢查</view>
					<view class="goods-price">$ 7,800</view>
					<view class="goods-buy-number oh">
						<view class="number-content">
						<view @tap="goods_buy_number_event" class="number-submit tc  fl" data-type="0">-
						</view>
						<input @blur="goods_buy_number_blur" v-model="buy_number" class="tc  fl"
							type="number" />
						<view @tap="goods_buy_number_event" class="number-submit tc fl" data-type="1">+
						</view>
						</view>
					</view>
				</u-col>
				<u-col span="1" class="pl-1">
					<image src="../../static/image2/cart/delete-icon.png"
					style="width: 70%;max-width: 100%;height: 80rpx;" mode="aspectFit"></image>
				</u-col>
			</u-row>
		</view>
		
		<view class="" style="height: 150rpx;"></view>
		
		<!-- 价格 -->
		<view class="all_price">
			
			<view class="p-2">
				<view class="coupon-part">
					<view class="title2 pb-1">優惠碼</view>
					<view class="input-btn pb-2">
						<input type="text" placeholder="請輸入優惠碼">
						<u-button><uni-icons type="right" style="color: #fff;;"></uni-icons></u-button>
					</view>
				</view>
				<view class="project-total flex justify-between">
					<view>項目金額</view>
					<view>$7,800</view>
				</view>
				<view class="jifen-youhui flex justify-between" v-if="!showPoints">
					<view class="fc-6D14B3">積分：25</view>
					<view class="fc-2296D6" @click="show=true">使用积分</view>
				</view>
				<view class="jifen-youhui flex justify-between" v-if="showPoints">
					<view>積分優惠</view>
					<view @click="show=true">-$25</view>
				</view>
				
				<view class="all-total flex justify-between">
					<view>總金額:</view>
					<view>$7,775</view>
				</view>
				
				<view class="pay-btn" @click="add_order">立即付款</view>
				
			</view>
			
		</view>
		
		<u-modal :show="show" :showConfirmButton="false">
			<view class="point-pop" style="width: 100%;">
				<view class="text-right"><uni-icons @click="show=false" type="closeempty" style="color: #181725;"></uni-icons></view>
				<view class="modal-box">
					
					<view class="text-center">
						<view class="title">我的積分</view>
						<view class="title">25</view>
						<view class="valid fc-6D14B3 pt-2 pb-2" >
							Valid until 01 February 2026
						</view>
						<view>
							<view class="input-label text-left">使用積分</view>
							<input type="text">
						</view>
						<u-button class="bg-8550B9" @click="usePoint"><text class="fc-fff">使用積分</text></u-button>
						
					</view>
				</view>
			</view>
		</u-modal>
		
		
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				buy_number:1,
				show: false,
				showPoints:false,
				endge: true,
				all_price: 0,
				
				
			}
		},
		onLoad() {
			
		},
		onShow() {
			
		},

		methods: {
			// 数量输入事件
			goods_buy_number_blur(e) {
				var number = parseInt(e.detail.value) || 1;
				if (isNaN(number)) {
					number = this.goods.buy_min_number || 1;
				}
				this.goods_buy_number_func(number);
			},
			
			// 数量操作事件
			goods_buy_number_event(e) {
				var type = parseInt(e.currentTarget.dataset.type) || 0;
				var temp_number = parseInt(this.buy_number);
				var number = type == 0 ? temp_number - 1 : temp_number + 1;
				this.goods_buy_number_func(number);
			},
			
			// 数量处理方法
			goods_buy_number_func(number) {
				var buy_min_number = 1;
				var inventory = parseInt(this.goods_spec_base_inventory);
				// 最小起购数量
				if (number < buy_min_number) {
					number = buy_min_number;
					app.globalData.showToast("起购" + buy_min_number + "件");
				}
				// 是否超过库存数量
				if (number > inventory) {
					number = inventory;
					app.globalData.showToast("库存数量" + inventory + "件");
				}
				this.setData({
					buy_number: number,
				});
			},
			usePoint(){
				this.showPoints=true;
				this.show=false
			},
			// 订单
			add_order() {
				uni.navigateTo({
					url:"/pages/payment/payment"
				})
			},
		}
	}
</script>

<style>
	@import "./goods_indent.css";
</style>
