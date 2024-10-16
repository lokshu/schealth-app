<template>
	<view class="search-page">
		<view class="flex align-center justify-between public-top" style="padding: 20rpx 30rpx; max-width: 800px;">
			<view class="flex align-center" style="width: 90%;">
				<view class="flex align-center"
					style="border-radius: 50px; padding: 10rpx 20rpx; width: 100%; background: #f1f1f1;">
					<!-- <img src="../../static/image2/index/search.png" style="width: 30rpx; margin-right: 14px;" /> -->
					<image src="@/static/image2/index/search.png" mode="" style="width: 30rpx; height: 30rpx; margin-right: 14px;"></image>
					<!-- <input type="text" class="fs-22" style="background: none; width: 85%; caret-color: red;"
						placeholder="請輸入商品名稱" placeholder-style="color: #b3b3b3" v-model="cont"> -->
					 <u--input
					    :placeholder="$t('Please enter the product name	', '請輸入商品名稱')"
					    border="surround"
					    v-model="cont"
						style=""
						fontSize="22rpx"
						maxlength="12"
					  ></u--input>
					  <text class="fc-6D14B3" style="font-size: 24rpx;" @click="search">搜索</text>
				</view>
			</view>
			<text style="font-size: 22rpx; color: #3c3c3c;" @click="$back">{{ $t('cancel_1', '取消') }}</text>
		</view>

		<view class="" style="width: 94%; margin: 0 auto;">
			<view class="" style="margin: 10rpx 0;">
				<!-- 最近搜索 -->
				<block v-if="zuijin == true">
					<block>
						<view class="font-bold flex align-center justify-between" style="font-size: 28rpx;">
							<text>最近搜索</text>
							<!-- <img src="../../static/image2/index/eliminate.png" alt="" style="width: 45rpx;"> -->
						</view>
						<u-loadmore status="loading" :loading-text="$t('loading', '加载中')" loading-icon="circle" icon-size="28" font-size="25" v-if="history_loading" />
						<view class="flex align-center flex-wrap"
							style="font-size: 22rpx; padding: 20rpx 0; max-height: 200rpx; overflow-y: auto;" v-if="!history_null">
							<block v-for="(item, index) in history" :key="index">
								<text
									style="border-radius: 50px; padding: 5rpx 20rpx; background: #e9e9e9; color: #3c3c3c; margin: 0 20rpx 20rpx 0;" @click="clickHistory(item, index)">{{ item.value }}</text>
							</block>
						</view>
						<block v-if="history_null">
							<u-loadmore status="nomore" :nomore-text="$t('No_more', '暂无更多')" :dashed="false"	loading-icon="circle" line font-size="25" color="#bdbdbd" />
						</block>
					</block>
				</block>
				<!-- 热门搜索 -->
				<view class="font-bold flex align-center justify-between" style="font-size: 28rpx; margin-top: 20rpx;">
					<text>{{ $t("Popular search", '热门搜索') }}</text>
					<!-- <view class="flex align-center">
						<img src="../../static/image2/index/switch.png" alt=""
							style="width: 33rpx; margin-right: 5rpx;">
						<text class="" style="font-size: 22rpx; color: #9d9d9d;">{{ $t("Change", '换一换') }}</text>
					</view> -->
				</view>
				<u-loadmore status="loading" :loading-text="$t('loading', '加载中')" loading-icon="circle" icon-size="28" font-size="25" v-if="hot_loading" />
				<view class="flex align-center flex-wrap" style="font-size: 22rpx; padding: 20rpx 0;">
					<block v-for="(items, indexs) in hot_list" :key="items">
						<view class="flex align-center justify-center"
							style="border-radius: 50px; padding: 5rpx 20rpx; background: #e9e9e9; color: #3c3c3c; margin: 0 20rpx 20rpx 0;" @click="hotTo(items, indexs)">
							<text :class="[{'fc-F4504E' : (true)}]">{{ items }}</text>
						</view>
					</block>
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
				cont: '',
				obj: '',
				history: [],
				history_loading: true,
				history_null: false,
				hot_list: [],
				zuijin: false,
				hot_loading: true,
			}
		},
		onLoad(res) {
			this.obj = res;
			// console.log(res)
		},
		onShow() {
			this.history = [];
			this.cont = '';
			this.history_loading = true;
			this.history_null = false;
			setTimeout(() => {
				if (uni.getStorageSync('user_token')) {
					this.zuijin = true
					this.getHistory();
					
				}
				this.hotSearch();
			})
		},
		methods: {
			// 最近搜索商品列表
			clickHistory(item, index) {
				console.log(item)
				uni.navigateTo({
					url: '../product_list/product_list' + "?type=search" + '&name=' + item.value + '&route=' + this.obj.type
				});
			},
			// 搜索跳轉商品列表
			search() {
				// uni.showLoading({
				// 	title: '加载中...'
				// });
				if (!this.cont) {
					return;
				}
				this.$http.request({
					url: "/api/product/list",
					method: 'GET',
					data: {
						name: this.cont,
						lang: uni.getStorageSync("lang"),
						// token: uni.getStorageSync('user_token'),
						// user_id: uni.getStorageSync('user_id'),
						page: 1,
						rows: 20
					},
					dataType: 'json',
					success: res => {
						if (res.statusCode === 200) {
							if (res.data.rows.length) {
								uni.navigateTo({
									url: '../product_list/product_list' + "?type=search" + '&name=' + this.cont + '&route=' + this.obj.type
								});
								// console.log(res.data.rows)
								this.zuijin = true
							} else if (!res.data.rows.length) {
								this.getHistory();
								app.globalData.showToast("暫無該商品")
							}
							// uni.hideLoading();
						} else {
							app.globalData.showToast("请求失败")
						}
					},
					fail: () => {
						app.globalData.showToast("请求失败")
					}
				});
			},
			// 熱門搜索跳轉
			hotTo(items, indexs) {
				uni.navigateTo({
					url: '../product_list/product_list' + "?type=search" + '&name=' + items + '&route=' + this.obj.type
				});
			},
			// 熱門搜索列表
			hotSearch() {
				this.$http.request({
					url: "/api/word/hot",
					method: 'GET',
					data: {
						token: uni.getStorageSync('user_token'),
						user_id: uni.getStorageSync('user_id'),
						lang: uni.getStorageSync("lang")
					},
					dataType: 'json',
					success: res => {
						if (res.statusCode === 200 && res.data.code == 0) {
							this.hot_list = res.data.data.split(',');
							// this.hot_list.splice(0, 10)
							if(this.hot_list.length >= 15) {
								this.hot_list.splice(0, 15)
							}
							this.hot_loading = false
						} else {
							app.globalData.showToast("请求失败")
						}
					},
					fail: () => {
						app.globalData.showToast("请求失败")
					}
				});
			},
			getHistory() {
				uni.showLoading({
					title: '加载中...'
				});
				this.$http.request({
					url: "/api/word/history",
					method: 'GET',
					data: {
						user_id: uni.getStorageSync('user_id'),
						token: uni.getStorageSync('user_token'),
						lang: uni.getStorageSync("lang")
					},
					dataType: 'json',
					success: res => {
						uni.hideLoading();
						if (res.statusCode === 200) {
							this.history_loading = false;
							let arr = res.data.rows;
							for(let i = 0; i < arr.length; i++) {
								for(let y = i + 1; y < arr.length; y++) {
									if (arr[i].value == arr[y].value) {
										arr.splice(y, 1);
										y--;
									}
								}
							}
							// console.log(arr)
							
							this.history = arr.splice(0, 10);
							
							
							// this.history = res.data.rows.splice(0, 10);
							if (!this.history.length) {
								this.history_null = true;
							}
						} else {
							app.globalData.showToast("服务器请求出错")
						}
					},
					fail: () => {
						// console.log((失败))
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.search-page {
		min-height: 100vh;
		background: #fff !important;
		::v-deep .u-input__content__field-wrapper__field[data-v-113bc24f] {
			height: 40rpx;
		}
		::v-deep .u-input--square {
			padding: 0 30rpx 0 0 !important;
		}
	}
</style>
