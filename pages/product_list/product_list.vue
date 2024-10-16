<template>
	<view class="product-list-page">
		<!-- 标头 -->
		<view class="top-title-banner">
			<view class="flex align-center">
				<view style="width: 20%;">
					<uni-icons class="top-back-btn" type="back" style="font-size: 45rpx; color: #6d14b6;" @click="$back"></uni-icons>
				</view>
				<view class="left-part text-center" style="width: 60%;">
					<view class="name">商店</view>
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
		<view class="product-lists" style="width: 96%; margin: 30rpx auto;">
			<u-tabs class="item_cop mb-2" :list="product_tab" :scrollable="true" 
			
			:activeStyle="{background:'#6D14B3',color:'#ffffff'}" 
			:inactiveStyle="{background:'#F8F4FF',color:'#7110D2',fontSize:'28rpx'}" 
			@click="clickTabs" 
			itemStyle="padding: 0 20rpx;"
			:current="tabNumber">
			</u-tabs>
			
			<view class="flex align-center flex-wrap">
				
				<block v-for="(item, index) in list" :key="index">
					<view style="width: 50%;">
						<view class="bg-view pr" :class="[{'width_100 flex align-start' : !screen}]"
							style="border-radius: 15rpx; overflow: hidden; margin: 20rpx;" @click="clickTo(item, index)">
							
							<view>
								<image :src="item.image_url" mode="widthFix" style=" max-width: 100%;" ></image>
							</view>
							
							<view style="margin-top: 20rpx;">
								<view class="name">{{ item.name }}</view>
								<view class="price">$ {{ item.price }}</view>
							</view>
							
						</view>
					</view>
				</block>
				
			</view>
			
			<block v-if="list_length">
				<u-loadmore status="nomore" :nomore-text="$t('No_more', '暂无更多')" :dashed="false"
					loading-icon="circle" line font-size="25" color="#bdbdbd" />
			</block>
			
		</view>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
		<view class="" style="height: 50rpx;"></view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				tabNumber:0,
				product_tab: [
					{name:'無創身體檢測',id:1},
					{name:'腸胃內視鏡',id:2},
					{name:'基因測試',id:3},
					{name:'體檢服務',id:4},
					{name:'病毒疣處理',id:5},
					{name:'靜脈曲張篩查',id:6},
					{name:'影像掃描',id:7},
					{name:'疫苗接種',id:8},
					{name:'日間手術',id:9},
				],
				index: 0,
				price_i: true,
				price: false,
				screen: true,
				show: false,
				type: 'center',
				scrollTop: 0,
				mode: 'circle',
				iconStyle: {
					fontSize: '32rpx',
					color: '#F4504E'
				},
				customStyles: {
					// background: '#eaf7ff'
				},
				datas: {
					lang: uni.getStorageSync('lang')
				},
				class_id: '',
				list: [],
				app_img: app.globalData.img_host,
				list_length: false,
				
				sexIndex: -1,
				sexIndexTwo: '',
				brandIndex: -1,
				brandName: '',
				brandIndexTwo: '',
				brand_list: [],
				min_amount: '',
				max_amount: '',
				page: 0,
				hot_list_length: false,
				routeObj: {},
				page: 0,
				
				to_router: '',
			}
		},
		onLoad(res) {
			if (res) {
				console.log(res)
				this.tabNumber=res.id-1
				if (res.type == "search") {
					this.to_router = res.type
				}
			}
		},
		onShow() {
			this.getProduct();
		},
		onPageScroll(res) {
			this.scrollTop = res.scrollTop;
		},
		onReachBottom(e) {
			if (!this.hot_list_length) {
				this.getProduct();
			}
		},
		methods: {
			clickTabs(type){
				
			},
			//圖片處理
			set_img_src() {
			    let imgs = this.list;
			    for (let i = 0; i < imgs.length; i++) {
					if (imgs[i].image_url) {
						if (imgs[i].image_url.indexOf('http') < 0) {
							imgs[i].image_url = this.app_img + imgs[i].image_url;
						}
					}
			    }
			    this.setData({
			     list: imgs
			    });
			},
			getProduct() {
				this.hot_list_length = false;
				this.datas.page = ++this.page;
				this.datas.rows = 20;
				uni.showLoading({
					title: this.$t('loading', '加载中...'),
					mask: true
				});
				
				let res = {
					page:1,
					records:855,
					total:43,
					rows:[
						{
						  "brief": "",
						  "original_price": 268,
						  "price": 192,
						  "image_url": "../../static/image2/index/product1.jpg",
						  "class_id": 45,
						  "name": "女士尊尚健康檢查",
						  "brand_name": "资生堂",
						  "id": 51,
						  "class_path": "美妝藥妝/美顏護膚/防曬/BB霜",
						  "total_stock": 5,
						  "brand_id": 4
						},
						{
						  "brief": "",
						  "original_price": 885,
						  "price": 570,
						  "image_url": "../../static/image2/index/product2.jpg",
						  "class_id": 44,
						  "name": "婚前檢查",
						  "brand_name": "La Mer",
						  "id": 53,
						  "class_path": "美妝藥妝/美顏護膚/潔面",
						  "total_stock": 10,
						  "brand_id": 60
						},
						{
						  "brief": "",
						  "original_price": 3010,
						  "price": 1920,
						  "image_url": "../../static/image2/index/product3.jpg",
						  "class_id": 42,
						  "name": "孕前檢查",
						  "brand_name": "La Mer",
						  "id": 54,
						  "class_path": "美妝藥妝/美顏護膚/面霜/乳液",
						  "total_stock": 10,
						  "brand_id": 60
						}	
					]
					}
				
				this.list = res.rows;
				if (!this.list.length) {
					setTimeout(() => {
						this.list_length = true;
					},200)
				}
				if (!res.rows.length && this.list.length) {
					this.hot_list_length = true
				}
				//this.set_img_src();
				//this.$refs.popup.close();
				setTimeout(() => {
					uni.hideLoading();
				}, 1000)
				
				// this.$http.request({
				// 	url: "/api/product/list",
				// 	method: 'GET',
				// 	data: this.datas,
				// 	dataType: 'json',
				// 	success: res => {
				// 		if (res.statusCode === 200) {
				// 			this.list = this.list.concat(res.data.rows);
				// 			if (!this.list.length) {
				// 				setTimeout(() => {
				// 					this.list_length = true;
				// 				},200)
				// 			}
				// 			if (!res.data.rows.length && this.list.length) {
				// 				this.hot_list_length = true
				// 			}
				// 			this.set_img_src();
				// 			this.$refs.popup.close();
				// 			setTimeout(() => {
				// 				uni.hideLoading();
				// 			}, 1000)
				// 		} else {
				// 			app.globalData.showToast(this.$t('request_was_aborted', '请求失败'))
				// 		}
				// 	},
				// 	fail: () => {
				// 	}
				// });
			},
			change(e) {
				// console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			clickTo(item, index) {
				uni.navigateTo({
					url: '../goods-detail/goods-detail' + "?id=" + this.list[index].id
				});
			},
		}
	}
</script>

<style lang="scss">
	.product-list-page {
		min-height: 100vh;
		background-color: #fff;
		.text-over {
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		.width_100 {
			width: 100% !important;
		}
		.width_40 {
			width: 30%;
			height: 300rpx;
		}
		.width_70 {
			width: 70% !important;
		}
		.first_view {
			// column-count: 2; 
			// column-gap: 20rpx; 
			// counter-reset: count;
		}
		.image_width {
			max-width: 75% !important;
		}
		.image_width_first {
			max-width: 75% !important;
		}
		::v-deep .uni-popup__wrapper.right {
			padding-top: 0;
		}
		
		.sex_style {
			border: 1px solid #6D14B3 !important;
			background: #f2faff !important;
		}
		.width_49 {
			width: 49.3%;
		}
		.product-lists .price{margin: 10rpx 0;font-size: 40rpx;color: #303030;}
		.product-lists .name{font-size: 28rpx; word-wrap: break-word; word-break: break-all;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}	
	}
	/*  #ifdef APP-PLUS  */
	.product_list_top {
		// padding-top: 80rpx !important;
	}
	/*  #endif  */
	 
</style>
