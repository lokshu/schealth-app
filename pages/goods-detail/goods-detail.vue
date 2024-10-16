<template>
	<view class="position-re goods-detail-page bg-white">
		<!-- 标头 -->
		<view class="top-title-banner">
			<view class="flex align-center">
				<view style="width: 20%;">
					<uni-icons class="top-back-btn" type="back" style="font-size: 45rpx; color: #6d14b6;" @click="$back"></uni-icons>
				</view>
				<view class="left-part text-center" style="width: 60%;">
					<view class="name">商店詳情</view>
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
		
		<view class="page">
			
			<view class="goods-photo" >
				<image src="../../static/image2/index/product-detail1.jpg" 
				class="img1" mode="widthFix" style="margin: 30rpx;max-width: 100%;"></image>
			</view>

			<!-- 标题 -->
			<view class=" goods_name p-2">優選全面身體檢查</view>
			<!-- 价格數量 -->
			<view class="flex justify-between align-center p-2 mb-2">
				<view class="price">$ 7,800</view>
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
			</view>
			
			<view class="desc mb-4">
				<ul>
					<li>適合 18 歲或以上男士或女士</li>
					<li>第一次接受或定期接受健康檢查之男士或女士</li>
					<li>希望全面掌握身體狀況的男士或女士</li>
					<li>有家族癌病史的較高風險男士或女士</li>
					<li>以及想透過超聲波深人檢查身體狀況的男士或女士</li>
					<li>入侵性的細菌感染的尿道炎症或婦科問題</li>
				</ul>
			</view>
			
			<view class="title1 p-2">檢查項目</view>
			<view >
				<image src="../../static/image2/index/product-detail2.jpg" 
				mode="widthFix"style="margin: 30rpx;max-width: 100%;"></image>
			</view>
			
			<view class="title1 p-2">服務地點</view>
			<view class="location p-2">
				<view>九龍尖沙咀彌敦道100號The One 9樓L902-L909號舖</view>
				<view>Shops L902-L909, Level 9, The One, 100 Nathan Road, Tsim Sha Tsui, Kowloon</view>
			</view>
			
			<view class="title1 p-2">體檢及服務條款</view>
			<view class="desc tk">
				<ul>
					<li>適合 18 歲或以上男士或女士</li>
					<li>第一次接受或定期接受健康檢查之男士或女士</li>
					<li>希望全面掌握身體狀況的男士或女士</li>
					<li>有家族癌病史的較高風險男士或女士</li>
					<li>以及想透過超聲波深人檢查身體狀況的男士或女士</li>
					<li>入侵性的細菌感染的尿道炎症或婦科問題</li>
				</ul>
			</view>
			
			<view style="height: 120rpx;"></view>
		
			<!-- 底部操作 -->
			<view class="btm-position">
				<view class="goods-buy-nav oh bg-white wh-auto br-t  align-center flex" style="">
					<block v-for="(item, index) in buy_button.data" :key="index">
						<button style="border-radius:25rpx;width: 44%;"
							:class="'item fl cr-white  bg-' +((item.color || 'main') == 'main' ? 'main' : 'main-pair')"
							type="default" @tap="nav_buy_submit_event" :data-type="item.type"
							hover-class="none">
							{{ item.name }}
						</button>
					</block>
				</view>
			</view>

			
		</view>



		<!-- 未登錄跳轉登錄 -->
		<u-popup :show="loginTrue" mode="center"
			customStyle="width: 85%; border-radius: 30rpx; overflow: hidden;">
			<view class=""
				style="width: 100%; background-size: 100% 100%; box-sizing: border-box; padding: 50rpx 40rpx;">
				<view class="fc-000 text-center" style="font-size: 30rpx; width: 100%;">
					<image src="@/static/image2/status/waring.png" style="width: 23%; margin-bottom: 10rpx;"
						mode="widthFix"></image>
					<view class="" style="">你還沒有登錄，請前往發登錄</view>
				</view>
				<view class="flex align-center justify-between">
					<u-button class="" style="border-radius: 50rpx;  width: 90%; margin: 50rpx auto 0; width: 45%; border: 1px solid #6D14B3; background: none;" @click="loginTrue = false">
						<text class="fc-6D14B3" style="font-size: 24rpx;">取消</text>
					</u-button>
					<u-button class="bg-6D14B3" style="border-radius: 50rpx;  width: 90%; margin: 50rpx auto 0; width: 45%;" @click="toLogin">
						<text class="fc-fff" style="font-size: 24rpx;">登錄</text>
					</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	const app = getApp();

	import componentPopup from "../../components/popup/popup";
	import componentTrnNav from "../../components/trn-nav/trn-nav";
	import componentBottomLine from "../../components/bottom-line/bottom-line";


	var common_static_url = app.globalData.get_static_url("common");
	var system_info = app.globalData.get_system_info() || {};
	var bar_height = parseInt(system_info.statusBarHeight || 0);
	var win_width = parseInt(
		system_info.windowWidth || system_info.screenWidth || 0
	);
	export default {
		data() {
			return {
				app: app,
				goods_id:'',
				goods_photo: [],
				buy_number:1,
				is_car:1,
				buy_button: {
					data: [
						{
							color: "main",
							type: "buy",
							title: "点此按钮到下一步确认购买信息",
							name: "立即购买",
							class: "",
							icon: "",
						},
						{
							color: "second",
							type: "cart",
							title: "加入购物车",
							name: "加入购物车",
							class: "",
							icon: "am-icon-opencart",
						}
					],
				},
				// 未登錄
				loginTrue: false
			};
		},

		components: {
			componentPopup,
			componentTrnNav,
			componentBottomLine,
		},

		onLoad(id) {
			if (id.id) {
				id.id = id.id;
				this.goods_id = id.id;
			} else {
				id.id = 23;
				this.goods_id = 23;
			}
			// 数据加载
			//this.init(id.id);
		},

		onShow() {
			//this.get_info();
		},
		// 页面销毁时执行
		onUnload: function() {
			if (this.footprint) {
				this.add_foot_true();
			}
		},

		methods: {
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
						uni.stopPullDownRefresh();
						uni.hideLoading();
						if (res.data.code == 0) {
							// this.is_band = res.data.data.email ? true : false;
							if (res.data.data.email) {
								this.is_band = true
							} else {
								this.is_band = false
							}
						} else {
							app.globalData.showToast(res.data.message);

						}
					},
					fail: () => {
						uni.stopPullDownRefresh();
						uni.hideLoading();
						app.globalData.showToast('服务器请求出错');
					}
				});
			},
			// 获取数据
			init(id) {
				uni.showLoading({
					title: "加载中...",
				});
				this.$http.request({
					url: "/api/product/detail",
					method: "GET",
					data: {
						id: id,
					},
					dataType: "json",
					success: (res) => {
						uni.stopPullDownRefresh();
						uni.hideLoading();
						if (res.data.code == 0) {
							var data = res.data.data;
							var goods = res.data.data;
							this.title = goods.name;
							var upd_data = {
								goods_photo: goods.image_list.split("|"),
							};
							
						} else {
							this.setData({
								data_list_loding_msg: res.data.msg,
							});
						}
					},
					fail: () => {
						uni.stopPullDownRefresh();
						uni.hideLoading();
						this.setData({
							data_bottom_line_status: false,
							data_list_loding_status: 2,
							data_list_loding_msg: "服务器请求出错",
						});
						app.globalData.showToast("服务器请求出错");
					},
				});
			},
			
			
			// 未登錄跳轉
			toLogin() {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			},
			// 导航购买按钮事件
			nav_buy_submit_event(e) {
				// if (!uni.getStorageSync('user_token')) {
				// 	this.loginTrue = true
					
				// 	return
				// 	app.globalData.showToast(this.$t("Please_login_or_register_first", "请先登录或注册"))
				// 	return;
				// }
				var type = e.currentTarget.dataset.type || "buy";
				if (type == "cart") {
					this.is_car = 0;
					this.is_car = 1;
					app.globalData.showToast("加入成功");
				} else {
					uni.navigateTo({
						url: "/pages/goods_indent/goods_indent",
					});
					
				}
				
			},
			
			// 加入购物车事件
			goods_cart_event(spec) {
				console.log(spec)
				if (!this.stoe_sku) {
					app.globalData.showToast("请选择规格项");
					return;
				}
				var user = uni.getStorageSync("user_id");
				// 用户未绑定用户则转到登录页面
				if (!uni.getStorage("user_id")) {
					uni.navigateTo({
						url: "/pages/login/login",
					});
					return false;
				} else {
					uni.showLoading({
						title: "处理中...",
					});
					this.$http.request({
						url: "/api/cart/add",
						method: "GET",
						data: {
							product_id: this.goods_id,
							sku_id: this.stoe_sku,
							quantity: this.buy_number,
						},
						dataType: "json",
						success: (res) => {
							uni.hideLoading();
							if (res.data.code == 0) {
								// 关闭购买弹窗窗口
								this.popup_close_event();
								app.globalData.showToast("加入成功");
							} else {
								if (
									app.globalData.is_login_check(
										res.data,
										this,
										"goods_favor_event"
									)
								) {
									app.globalData.showToast(res.data.message);
								} else {
									app.globalData.showToast(res.data.message);
								}
							}
						},
						fail: () => {
							uni.hideLoading();
							app.globalData.showToast("服务器请求出错");
						},
					});
				}
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

		},
	};
</script>
<style scoped long="scss">
	@import "./goods-detail.css";
</style>
