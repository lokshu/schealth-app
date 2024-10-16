<template>
	<view class="cart-page">
		<!-- 标头 -->
		<view class="top-title-banner">
			<view class="flex align-center">
				<view style="width: 20%;">
					<uni-icons class="top-back-btn" type="back" style="font-size: 45rpx; color: #6d14b6;" @click="$back"></uni-icons>
				</view>
				<view class="left-part text-center" style="width: 60%;">
					<view class="name">
						我的購物車
						<text v-if="cart_list.length">
							<text class="fc-fff font-bold" style="font-size: 24rpx; margin-left: 10rpx;"
								v-if="!cartTrue">({{ cart_list.length }})</text>
							<text class="fc-F4504E font-bold" style="font-size: 24rpx; margin-left: 10rpx;"
								v-else>({{ cart_list.length }})</text>
						</text>
					</view>
				</view>
				<view class="right-part text-right" style="width: 20%;">
					<navigator url="/pages/message_center/message_center" class="notifi-icon">
						<u-badge value="1"></u-badge>
						<image src="../../static/images/message.png" alt="" style="width: 40rpx; height: 40rpx; margin: 0;"></image>
					</navigator>
					<!-- <navigator url="/pages/cart/cart" class="cart-icon" >
						<image src="../../static/images/cart.png" alt="" style="width: 40rpx; height: 40rpx;margin: 0;"></image>
					</navigator> -->
				</view>
			</view>
		</view>
		<!-- top end -->
		
		<view class="p-2">
			<block v-if="cart_list.length">
				<checkbox-group @change="changeCheck">
					<label class="bg-view" v-for="(item, index) in cart_list" :key="index" 
					style="margin-bottom: 30rpx; border-radius: 30rpx; display: block;">
						
						<uni-swipe-action>
							<uni-swipe-action-item>
								<view class="flex align-center justify-between" style="">
									<view style="padding-left: 20rpx;">
										<checkbox :value="item.sku_id.toString()" :checked="item.checked" color="#ffffff" />
									</view>
									<view style="width: 82%; padding: 30rpx 10rpx;">
										<view class="flex align-start justify-between">
											<view class="" style="width:35%;" @click.stop="clickTo(item, index)">
												<image :src="item.image_url" mode="" style="max-width: 100%; max-height: 200rpx;"></image>
											</view>
											<view style="width: 61%;">
												<view class="fc-130F26 text-over font-bold" style="font-size: 32rpx;">{{ item.name }}</view>
												<view class="fc-6D14B3 pt-1 pb-1" style="font-size: 30rpx;">$ {{ item.price }}</view>
												<view style="width: auto;display: inline-block;">
													<u-number-box integer :min="1" :value="item.quantity" disabledInput
													 @change="onChange" :name="item.sku_id">
													</u-number-box>
												</view>
											</view>
										</view>
									</view>
									
									<view style="width:18%; padding: 30rpx 0;text-align: right;">
										<image src="../../static/image2/cart/delete-icon.png"
										style="width: 100%;max-width: 100%;height: 80rpx;" mode="aspectFit"></image>
									</view>
									
								</view>
								
							</uni-swipe-action-item>
						</uni-swipe-action>
					</label>
				</checkbox-group>
			</block>
			
			<!-- 购物车没有数据 -->
			<block v-else>
				<view class="text-center" style="width: 94%; margin: 0 auto;" v-if="!cart_list.length || !seeToken">
					<view class="" style="height: 70rpx;"></view>
					<view style="padding: 50rpx; border-radius: 20rpx;">
						<view class="fc-000" style="margin: 10rpx 0; font-size: 30rpx;">
							{{ $t("the_shopping_cart_is_empty", "購物車空空如也") }}……
						</view>
						<view class="" style="font-size: 30rpx; border-radius: 50rpx; border: 1px solid #6D14B3; color: #6D14B3; padding: 13rpx 10rpx; width: 40%; margin: 50rpx auto;" @click="goShoppinged">去选购</view>
					</view>
				</view>
			</block>
		</view>
		
		<view class="" style="width: 100%; height: 120rpx;"></view>
		
		<!-- 結算 -->
		<view class="bg-view cart_bottom" v-if="cart_list.length">
			<view class="flex align-center justify-between" style="width: 94%; margin: 0 auto; height: 110rpx;">
				<view class="flex align-center" style=" margin-top: 10rpx;">
					<checkbox-group name="allCheck" @change="changeAll" style="width: 100%;">
						<label class="flex align-center" style="width: 100%;">
							<checkbox :value="allCheck.value" :checked="allCheck.checked" color="#FFFFFF"
								style="transform:scale(0.8)" />
							<text>全選</text>
						</label>
					</checkbox-group>
				</view>
				<view class="flex align-center" style="" >
					<view class="fc-6D14B3" style="font-size: 24rpx;">
						<text>合計:</text>
						<text class="number_fonts" style="font-size: 45rpx; margin-left: 10rpx;">{{ amount }}</text>
					</view>
					<text class="fc-fff"
						style="font-size: 28rpx; border-radius: 50px; padding: 10rpx 40rpx; background: #8550B9; margin-left: 25rpx;" @click="settleAccounts">結算</text>
				</view>
				<!-- <view class="flex align-center" style="font-size: 24rpx; height: 110rpx;" >
					<text class="fc-fff" style="border-radius: 50px; padding: 8rpx 25rpx; margin-right: 20rpx; background: #F4504E;" @click="allRemove">删除</text>
				</view> -->
			</view>
		</view>			
		
		<tab-bar></tab-bar>
		
	</view>
</template>

<script>
	import tabBar from '../../components/tab-bar/tab-bar.vue';
	var app = getApp();
	export default {
		components: {
			tabBar
		},
		data() {
			return {
				seeToken: false,
				value: 0,
				manage: false,
				cart_list: [],
				app_img: app.globalData.img_host,
				checkboxValue: [],
				checkboxValueAll: [],
				cartTrue: false,
				scrollTop: 0,
				allCheck: {
					name: '',
					value: 'all',
					checked: false
				},
				add_cont: '',
				reduce_cont: '',
				loading: false,
				sku_id: '',
				number: '',
				select_list: [],
				amount: 0,
				sc: 0,
				order_cart: [],
				
				cart_number: false,
				
			};
		},
		
		onShow() {
			this.cart_list=[
				{
					"quantity": 1,
					"image_url": "../../static/image2/index/product1.jpg",
					"sku_id": 658,
					"user_id": 100737,
					"price": 7800,
					"product_id": 396,
					"name": "優選全面身體檢查",
					"id": "100737.396.658",
				},
				{
					"quantity": 2,
					"image_url": "../../static/image2/index/product3.jpg",
					"sku_id": 659,
					"user_id": 100737,
					"price": 800,
					"product_id": 397,
					"name": "孕前檢查",
					"id": "100735.398.657",
				},
				
			];
			let list = this.cart_list;
			for (let i = 0; i < list.length; i++) {
				list[i].checked = false
			}
			this.setData({
				cart_list: list
			});
			this.allCheck.checked = false;
		},
		
		methods: {
			clickTo(item, index) {
				// console.log(item)
				uni.navigateTo({
					url: '../goods-detail/goods-detail' + "?id=" + item.product_id
				})
			},
			// 我的購物車列表
			getCart() {
				this.aa();
				this.allCheck.checked = false;
			},
			// 增加减少
			onChange(e){
				this.sku_id = e.name;
				this.number = e.value;
				this.getAdd(e.name, e.value);
				this.allCheck.checked = false;
			},
			// 购物车商品数量增加
			getAdd(id, value) {
				
			},
			// 删除
			setRemove(item, index) {
				// this.$http.request({
				// 	url: "/api/cart/del?sku_id=" + item.sku_id + "&product_id=" + item.product_id,
				// 	method: 'GET',
				// 	data: {
						
				// 	},
				// 	dataType: 'json',
				// 	success: res => {
				// 		if (res.statusCode === 200 && res.data.code == 0) {
				// 			this.getCart();
				// 			this.manage = false;
				// 			app.globalData.showToast(this.$t('It_has_been_deleted.', '已刪除'))
				// 		} else {
				// 			app.globalData.showToast(res.data.message)
				// 		}
				// 	},
				// 	fail: () => {
						
				// 	}
				// })
			},
			
			// 管理購物車切換
			clickManage() {
				if (this.cart_list.length) {
					this.manage = !this.manage;
				}
			},
			// 請求萬之後操作
			aa() {
				this.cart_list.map(item => this.$set(item, 'whether', true));
				this.$set(this.allCheck, 'whether', true);
			},
			// 全選
			changeAll(e) {
				this.amount = 0;
				if (e.detail.value.length == 0) {
					this.cart_list.map(item => this.$set(item, 'checked', false));
					this.$set(this.allCheck, 'checked', false);
				} else {
					this.cart_list.map(item => this.$set(item, 'checked', true));
					this.$set(this.allCheck, 'checked', true);
				}
				for (let i = 0; i < this.cart_list.length; i++) {
					this.amount += (this.cart_list[i].price * this.cart_list[i].quantity)
				}
				if (!e.detail.value.length) {
					this.amount = 0;
					this.order_cart = [];
				} else {
					this.order_cart = this.cart_list;
				}
				// console.log(this.amount)
				// 下单全选
			},
			// 多選
			changeCheck(e) {
				var items = this.cart_list;
				var len = this.cart_list.length;
				var values = e.detail.value;
				//console.log(values)
				for (var i = 0; i < len; i++) {
					var item = items[i];
					if (values.includes(item.sku_id.toString())) {
						this.$set(item, 'checked', true);
					} else {
						this.$set(item, 'checked', false);
					}
				}
				// 判断选中状态
				var arr = [];
				this.cart_list.forEach(item => item.whether == true ? arr.push(item) : '');
				var isAll = arr.every(item => item.checked == true);
				//console.log(isAll)
				isAll ? this.$set(this.allCheck, 'checked', true) : this.$set(this.allCheck, 'checked', false)

				this.select_list = e.detail.value;
				let amountArr = [];
				for (let y = 0; y < items.length; y++) {
					for (let n = 0; n < this.select_list.length; n++) {
						if (items[y].sku_id == this.select_list[n]) {
							amountArr.push(items[y])
						}
					}
				}
				this.amount = 0
				for (let l = 0; l < amountArr.length; l++) {
					this.amount += (amountArr[l].price * amountArr[l].quantity)
				}
				
				// 多下单
				// order
				// console.log(this.select_list)
				// console.log(amountArr, '11')
				this.order_cart = amountArr;
			},
			// 結算
			settleAccounts() {
				if (!this.order_cart.length) {
					app.globalData.showToast(this.$t('you_have_not_selected_a_commodity.', '您未選擇商品'));
				} else {
					uni.setStorageSync('order', JSON.stringify(this.order_cart))
					uni.setStorageSync("order_address", '/pages/cart/cart')
					uni.navigateTo({
						url: "/pages/goods_indent/goods_indent"
					})
				}
			},
			// 多選刪除
			allRemove() {
				let newtArray = [];
				//console.log(this.allCheck.checked)
				if (this.allCheck.checked) {
					for (let n = 0; n < this.cart_list.length; n++) {
						newtArray.push(this.cart_list[n].sku_id)
					}
				} else {
					if (!this.select_list.length) {
						app.globalData.showToast(this.$t('you_have_not_selected_a_commodity.', '您未選擇商品'));
						return
					}
					for (let i = 0; i < this.cart_list.length; i++) {
						for (let y = 0; y < this.select_list.length; y++) {
							if (this.cart_list[i].sku_id == this.select_list[y]) {
								newtArray.push(this.cart_list[i].sku_id)
							}
						}
					}
				}
				// for (let n = 0; n < newtArray.length; n++) {
				// 	newObject[n] = newtArray[n]
				// }
				
				uni.showLoading({
					title: this.$t('loading', '加载中'),
					mask: true,
				});
				this.$http.request({
					url: "/api/cart/del_batch",
					method: 'GET',
					data: {
						sku_id: newtArray
					},
					dataType: 'json',
					success: res => {
						if (res.statusCode === 200 && res.data.code == 0) {
							this.getCart();
							this.manage = false;
							app.globalData.showToast(this.$t('It_has_been_deleted.', '已刪除'))
						} else {
							app.globalData.showToast(res.data.message)
						}
					},
				})
			},
			checkboxChange(e) {
				//console.log(e)
			},
			goShopping(kk, ii) {
				if (this.seeToken) {
					uni.navigateTo({
						url: '../goods-detail/goods-detail' + "?id=" + kk.id
					})
				} else {
					this.routerLogin();
				}
			},
			goShoppinged() {
				if (this.seeToken) {
					uni.switchTab({
						url: "/pages/index/index"
					})
				} else {
					this.routerLogin()
				}
			},
			// 未登錄跳轉登錄
			routerLogin() {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			},
			// 获取用户信息
			get_info() {
				if (!uni.getStorageSync('user_id')) {
					return;
				}
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
						if (res.data.code == 0) {
							if (res.data.data.email) {
								this.is_band = true
							} else {
								this.is_band = false
							}
							// this.is_band = res.data.data.email ? true : false;
						} else {
							app.globalData.showToast(res.data.message);
							return;
						}
						uni.hideLoading();
					},
					fail: () => {
						app.globalData.showToast(this.$t("Server_request_error", '服务器请求出错'));
					}
				});
			},
			// 邮箱弹窗
			clickBtn() {
				uni.navigateTo({
					url: '/pages/bind_mailbox/bind_mailbox'
				})
			},
			close() {
				this.mail_false = false
			},
		}
	}
</script>

<style lang="scss">
	.cart_bottom {
		position: fixed; 
		bottom: 120rpx; 
		right: 0; 
		left: 0; 
		margin: auto;
		height: 110rpx; 
		max-width: 800px;
	}
	/* #ifdef APP-PLUS */
	.cart_bottom {
		bottom: 0 !important;
	}
	.cart_top {
		padding-top: 80rpx;
	}
	/* #endif */
	
	
	.cart-page {
		min-height: 100vh;

		.cart_top {
			background: url(/static/image2/index/top-bg1.png) no-repeat;
			background-size: cover;
			height: 140rpx;
		}

		.cart_top_active {
			background: #fff;
			transition: .5s;
		}

		::v-deep uni-checkbox .uni-checkbox-input {
			border-radius: 50% !important;
		}

		::v-deep uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
			background: #6D14B3;
			border: none;
			border: 1px solid #6D14B3;
		}

		::v-deep .u-number-box {
			border-radius: 10rpx;
			border: 1px solid #B7B7B7;
		}

		::v-deep .u-number-box__plus {
			background: none !important;
			border-left: 1px solid #B7B7B7;
		}

		::v-deep .u-number-box__minus {
			background: none !important;
			border-right: 1px solid #B7B7B7;

		}

		::v-deep .u-number-box__input {
			background: none !important;
			width: 40rpx !important;
			font-size: 22rpx !important;
			padding: 5rpx 0;
		}

		::v-deep .uni-swipe_text--center {
			width: 98% !important;
		}

		::v-deep .uni-swipe_button-text {
			font-size: 22rpx !important;
		}
		
		::v-deep .u-loading-icon__spinner--circle {
			width: 40rpx !important;
			height: 40rpx !important;
			border-color: #9b9b9b #d9d9d9 #d9d9d9 !important;
		}
		::v-deep uni-checkbox .uni-checkbox-input {
			width: 40rpx;
			height: 40rpx;
		}

		.text-over {
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
	}
</style>
