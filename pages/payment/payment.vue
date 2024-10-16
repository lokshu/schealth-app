<template>
	<view class="position-re bg-white goods-indent-page" style="min-height: 100vh;">
		<!-- 标头 -->
		<view class="top-title-banner">
			<view class="flex align-center">
				<view style="width: 20%;">
					<uni-icons class="top-back-btn" type="back" style="font-size: 45rpx; color: #6d14b6;" @click="$back"></uni-icons>
				</view>
				<view class="left-part text-center" style="width: 60%;">
					<view class="name">確認我的訂單</view>
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
		<view class="part-title">
			<view class="left-title">你的商品</view>
		</view>
		<view class="selected-goods p-2 pt-0">
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
		
		<!-- 付款方式 -->
		<view class="part-title pl-2 pt-2 flex justify-between align-center">
			<view class="left-title">付款方式</view>
			<view @click="showPayway=true"><uni-icons type="compose" class="fc-8550B9"></uni-icons></view>
		</view>
		<view class="pay-way p-2">
			<u-radio-group
			    v-model="radiovalue1"
			    placement="column"
			    @change="groupChange"
			  >
			    <u-radio activeColor="#8550B9" iconSize="18px" labelSize="18px" size="30"
			      :customStyle="{marginBottom: '8px'}"
			      v-for="(item, index) in radiolist1"
			      :key="index"
			      :label="item.name"
			      :name="item.name">
					<image style="width: 100rpx;height: 50rpx;padding-right: 10rpx;" mode="aspectFit" :src="item.image"></image> 
					{{item.label}}
			    </u-radio>
			  </u-radio-group>
			
		</view>
		
		<view class="" style="height: 400rpx;"></view>
		
		<!-- 价格 -->
		<view class="all_price">
			
			<view class="p-2">
				
				<view class="project-total flex justify-between">
					<view>項目金額</view>
					<view>$7,800</view>
				</view>
				
				<view class="jifen-youhui flex justify-between" >
					<view>積分優惠</view>
					<view @click="show=true">-$25</view>
				</view>
				
				<view class="all-total flex justify-between">
					<view>總金額:</view>
					<view>$7,775</view>
				</view>
				
				<view class="xieyi-w flex">
					<u-checkbox-group >
						<u-checkbox @change="select_file" activeColor="#8550B9" iconSize="18px" labelSize="18px" size="30"></u-checkbox>
					</u-checkbox-group>
					<view class="xieyi">
						點擊即表示您同意提供的
							<text @click="serves_go">使用者條款</text>和<text @click="privacy_go">隱私政策</text>。
					</view>
				</view>
				
				<view class="pay-btn" @click="add_order">立即付款</view>
				
			</view>
			
		</view>
		
		<!-- 添加支付方式-->
		<u-popup :show="showPayway" mode="bottom" 
		customStyle="border-top-left-radius:20rpx;border-top-right-radius:20rpx;" >
			<view class="flex justify-between align-center p-3" style="border-bottom: 1px solid #e2e2e2;">
				<view class="poptitle">添加付款方式</view>
				<view class="popclose" @click="showPayway=false">
					<uni-icons type="closeempty" style="color: #181725;"></uni-icons>
				</view>
			</view>
			
		    <view class="p-3">
		    	
				<view class="row-box">
					<u-row>
						<u-col span="12">
							<view class="input-box2">
								<view class="form-title1">持卡人姓名</view>
								<input v-model="name" type="number" />
							</view>
						</u-col>
					</u-row>
					<u-row>
						<u-col span="12">
							<view class="input-box2">
								<view class="form-title1">信用卡號碼</view>
								<input v-model="number" type="text" />
							</view>
						</u-col>
					</u-row>
					<u-row>
						<u-col span="6">
							<view class="input-box2">
								<view class="form-title1">CVV</view>
								<input v-model="cvv" type="text" />
							</view>
						</u-col>
						<u-col span="6">
							<view class="input-box2">
								<view class="form-title1">信用卡有效期</view>
								<input v-model="date" type="text" />
							</view>
						</u-col>
					</u-row>
				</view>
				
		    	<u-button class="bg-8550B9" style="border-radius: 16rpx;margin-top: 40rpx;" @click="addPayay()">
		    		<text class="fc-fff" style="font-size: 24rpx;">提交</text>
		    	</u-button>
		    </view>
		</u-popup>
		
		
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
				showPayway:false,
				backmsg: {
					backmsg1: "折扣不等人，真的放棄嗎？", //返回
					backmsg2: '', //返回
					backmsg3: "", //返回标题
					btn1: '就此放棄',
					btn2: '考慮一下',
				},
				endge: false,
				all_price: 0,
				radiolist1: [
					{ 
						name:1,
						label: '',
						image:'../../static/image2/pay/pay_wechat.jpg',
				        disabled: false
				    },
				    {
						name:2,
				        label: '',
						image:'../../static/image2/pay/pay_alipay.jpg',
				        disabled: false
				    },
					{
						name:3,
						label: '',
						image:'../../static/image2/pay/pay_apple.jpg',
					    disabled: false
					},
					{
						name:4,
						label: '**** **** **** 3456',
						image:'../../static/image2/pay/pay_master.jpg',
					    disabled: false
					},
					{
						name:5,
						label: '**** **** **** 1122',
						image:'../../static/image2/pay/pay_unionpay.jpg',
					    disabled: false
					},
					{
						name:6,
						label: '**** **** **** 2456',
						image:'../../static/image2/pay/pay_VISA.jpg',
					    disabled: false
					},
					{
						name:7,
						label: '**** **** **** 3498',
						image:'../../static/image2/pay/credit_card.png',
					    disabled: false
					}
					        
				],
				radiovalue1: '微信支付',
				name:'',
				number:'',
				cvv:'',
				date:''
			}
		},
		onLoad() {
			
		},
		onShow() {
			
		},

		methods: {
			//選擇支付方式
			groupChange(n) {
			    console.log('groupChange', n);
			},     
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
			addPayay(){
				this.showPayway=false;
			},
			// 订单
			add_order() {
				console.log(this.endge)
				if (!this.endge) {
					app.globalData.showToast('請同意協議');
					return;
				}
				uni.navigateTo({
					url:"/pages/payment_successful/payment_successful"
				})
			},
			//协议
			select_file(n){
				this.endge=n
			},
			serves_go() {
				uni.navigateTo({
					url: '/pages/terms_of_service/terms_of_service'
				})
			},
			privacy_go() {
				uni.navigateTo({
					url: '/pages/privacy_policy/privacy_policy',
				})
			},
		}
	}
</script>

<style>
	.part-title{
		padding: 20rpx 20rpx 0;
	}
	.part-title .left-title{font-size: 30rpx;font-weight: 700;color: #8550B9;}
	.part-title .uni-icons{font-size: 40rpx !important;font-weight: 700;}
	.selected-goods{
		background-color: #F3EAFF;
		margin: 20rpx;
		border-radius: 16rpx;
	}
	.goods-name{
		font-size: 35rpx;
		color: #130F26;
		font-weight: bold;
	}
	.goods-price{
		color: #6D14B3;
		font-size: 40rpx
	}
	.goods-buy-number .number-content{
		width: auto;
		background-color: #D5AAF8;
		color: #6D14B3;
		margin:10rpx 0;
	}
	.goods-buy-number .number-content .number-submit{
		border-radius: 10rpx;
		background-color: #D5AAF8;
		font-size: 40rpx;
	}
	.goods-buy-number .number-content .number-submit,
	.goods-buy-number .number-content uni-input {
	    padding: 0;
	    vertical-align: middle;
	    height: 30px;
	    line-height: 30px;
		color: #6D14B3;
	}
	.goods-buy-number .number-content .number-submit{
	    width: 30px;
	    font-weight: 700;
	}
	.goods-buy-number .number-content uni-input{
	    width: 50px;
	    background: transparent;
	    border-radius: 0;
		color: #000;
	}
	.coupon-part .input-btn{position: relative;}
	.coupon-part .input-btn input{
		font-size: 32rpx;
		background-color: #ECE2FF;
		border-radius: 10rpx;
		padding:0 70rpx 0 20rpx;
		height: 70rpx;
		line-height: 70rpx;
	}
	.coupon-part .input-btn uni-button{
		position: absolute;
		right: 0;
		width: 70rpx;
		height: 70rpx;
		top: 0;
		border-radius: 10rpx;
		background-color: #8550B9;
		color: #fff;
	}
	.coupon-part .title2,
	.project-total{font-weight: bold;font-size: 30rpx;color: #6D14B3;}
	.jifen-youhui{font-weight: bold;font-size: 30rpx;color: #2296D6;margin: 10rpx 0;}
	.all-total{font-weight: bold;font-size: 32rpx;color: #6D14B3;}
	.all_price {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 0);
		background: #FFFFFF;
		box-shadow: 0rpx -6rpx 12rpx 2rpx rgba(0, 0, 0, 0.03);
		/* border-radius: 32rpx 32rpx 0rpx 0rpx; */
	}
	/* 协议 */
	.xieyi-w {
		
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}
	.xieyi {
		
		font-size: 24rpx;
		font-family: 蘋方-繁-標準體, 蘋方-繁;
		color: #9A9A9A;
		line-height: 32rpx;
	
	}
	.xieyi text{color: #6D14B3;}
	.select {
		width: 36rpx;
	}
	.pay-btn {
		height: 80rpx;
		background: #8550B9;
		border-radius: 15rpx;
		font-weight: 600;
		color: #fff;
		text-align: center;
		line-height: 80rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
	.point-pop .title{font-weight: bold;font-size: 32rpx;}
	.point-pop input{
		font-size: 32rpx;
		background-color: #ECE2FF;
		border-radius: 10rpx;
		padding:0 20rpx 0 20rpx;
		height: 70rpx;
		line-height: 70rpx;
		margin-bottom: 20rpx;
		color: #8550B9;
		text-align: left;
	}
	.point-pop uni-button{
		height: 70rpx;
		border-radius: 10rpx;
		background-color: #8550B9;
		color: #fff;
	}
	.poptitle{
		color: #000000;
		font-weight: bold;
		font-size: 35rpx;
	}
	.inputs .input-label{
		font-size: 30rpx;
		margin-bottom: 20rpx;
		font-weight: bold;
		color: #1E232C;
	}
	.inputs input {
		font-size: 32rpx;
		height: 75rpx;
		background-color: #ECE2FF;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
	}
	.row-box{
		margin: -10rpx;
	}
	.row-box .input-box2{
		padding: 10rpx 10rpx 20rpx;
	}
	.row-box .form-title1{
		font-size: 30rpx;
		margin-bottom: 20rpx;
		font-weight: bold;
		color: #1E232C;
	}
	.row-box input{
		width: 100%;
		font-size: 32rpx;
		height: 75rpx;
		background-color: #ECE2FF;
		border-radius: 10rpx;
		padding-left: 10rpx;
	}
	
</style>
