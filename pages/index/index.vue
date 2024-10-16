<template>
	<view class="index-page">
		<contact-fab></contact-fab>
		
		<!-- top -->
		<view class="top-title-banner">
			<view class="flex justify-between">
				<view class="left-part">
					<view class="name">您好，小明</view>
					<view class="number">會員編號: 00001</view>
				</view>
				<view class="right-part">
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
		
		<!-- 轮播图 -->
		<view class="">
			<swiper class="swiper" circular :indicator-dots="false" :autoplay="true" 
			:interval="4000" :duration="300" indicator-color="#b3b3b3" 
			previous-margin="40rpx" next-margin="40rpx"
			indicator-active-color="#8550B9" style="padding: 20rpx 0">
				<swiper-item v-for="(item, index) in banners" :key="index" @click="bannerToLink(item, index)">
					<view style="overflow: hidden;border-radius: 20rpx;padding: 0 10rpx;">
						<block v-if="item.image_list">
							<image class="swiper_image" :src="item.image_list" mode="" 
							style="width: 100%; height: 450rpx; margin: 0;border-radius: 20rpx;"></image>
						</block>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view style="margin: 20rpx;">
			<!-- 首页产品分类 -->
				<view class="category1">
					<view class="flex align-center flex-wrap">
						<block v-for="(items, indexs) in index_product_class2" :key="indexs">
							<block>
								<view
									class="text-center" 
									style="width: 33.33%; margin-bottom: 20rpx;" 
									@click="shopTo(items, indexs)"
								>
									<view class="flex align-center justify-between"
										style="width: 70rpx; height: 110rpx;  padding: 10rpx 10rpx 0; margin: 0 auto 4rpx;">
										<image :src="items.image_url" mode="aspectFit" style="margin: 0;height: 100rpx;"></image>
									</view>
									<text style="font-size: 26rpx; color: #000;font-weight: bold;">{{ items.title }}</text>
								</view>
							</block>
						</block>
					</view>
					<view class="text-right pt-2" v-if="showMore">
						<view @click="moreList"
						style="display: inline-block;color: #8550B9;text-decoration: underline;">更多</view>
						<!-- <navigator style="color: #8550B9;text-decoration: underline;"
						url="/pages/product_list/product_list?title='All&id=0">更多</navigator> -->
					</view>
				</view>
		
				<!-- 專題輪播 -->
				<view class="category2">
					<swiper circular :indicator-dots="true" :autoplay="false" :interval="2100"
						:duration="300" indicator-color="#EDEDFC" indicator-active-color="#8550B9"
						display-multiple-items="1">
						<swiper-item class="swiper_cont" v-for="(items, indexs) in specia_banners2" :key="indexs">
							<view class="flex justify-between">
								<block v-for="(item, index2) in items" :key="index2">
									<view style="width: 24%"  @click="specialBannerTo(item, index2)">
										<view class="img-box">
											<block v-if="item.image_list">
												<image :src="item.image_list" mode="aspectFit" style="max-width: 100%;  margin: auto;"></image>
											</block>
										</view>
										<text style="font-size: 26rpx; color: #000;">{{ item.title }}</text>
									</view>
								</block>
							</view>
						</swiper-item>
					</swiper>
				</view>
			
		</view>

		<view style="height: 130rpx;"></view>
	</view>
</template>

<script>
	const app = getApp();
	import contactFab from "../../components/contact-fab/contact-fab.vue"
	export default {
		components: {
			contactFab
		},
		data() {
			return {
				app_img: app.globalData.img_host,
				type: 'index',
				banners: [
					{image_list:'../../static/image2/index/banner.jpg',id:1,url:'/pages/index/banner_detail'},
					{image_list:'../../static/image2/index/banner1.jpg',id:2,url:'/pages/index/banner_detail'},
					{image_list:'../../static/image2/index/banner.jpg',id:3,url:'/pages/index/banner_detail'},
				],
				showMore:true,
				index_product_class2: [], 
				index_product_class: [
					{image_url:'../../static/image2/index/category1.png',title:'無創身體檢測',id:1},
					{image_url:'../../static/image2/index/category2.png',title:'腸胃內視鏡',id:2},
					{image_url:'../../static/image2/index/category3.png',title:'基因測試',id:3},
					{image_url:'../../static/image2/index/category4.png',title:'體檢服務',id:4},
					{image_url:'../../static/image2/index/category5.png',title:'病毒疣處理',id:5},
					{image_url:'../../static/image2/index/category6.png',title:'靜脈曲張篩查',id:6},
					{image_url:'../../static/image2/index/category7.png',title:'影像掃描',id:7},
					{image_url:'../../static/image2/index/category8.png',title:'疫苗接種',id:8},
					{image_url:'../../static/image2/index/category9.png',title:'日間手術',id:9},
				],
				specia_banners: [
					{image_list:'../../static/image2/index/iconSpec1.png',title:'內科'},
					{image_list:'../../static/image2/index/iconSpec2.png',title:'外科'},
					{image_list:'../../static/image2/index/iconSpec3.png',title:'腸胃肝臟科'},
					{image_list:'../../static/image2/index/iconSpec4.png',title:'婦科'},
					{image_list:'../../static/image2/index/iconSpec5.png',title:'血管外科'},
					{image_list:'../../static/image2/index/iconSpec6.png',title:'骨科'},
					{image_list:'../../static/image2/index/iconSpec7.png',title:'整形外科'},
					{image_list:'../../static/image2/index/iconSpec8.png',title:'心臟科'},
					{image_list:'../../static/image2/index/iconSpec9.png',title:'泌尿科'},
					{image_list:'../../static/image2/index/iconSpec10.png',title:'耳鼻喉科'},
					{image_list:'../../static/image2/index/iconSpec11.png',title:'腫瘤科'},
					{image_list:'../../static/image2/index/iconSpec12.png',title:'眼科'},
				],
				specia_banners2:[],
			}
		},
		onLoad() {
			
		},
		onShow() {
			if (uni.getStorageSync('index_active')) {
				uni.removeStorageSync('index_active');
			}
			if (uni.getStorageSync('type')) {
				setTimeout(() => {
					app.globalData.showToast('登錄成功');
					uni.removeStorageSync('type')
				})
			} else {
				
			}
			this.index_product_class2=this.index_product_class.slice(0,6)
			for(let i = 0;i<this.specia_banners.length;i+=4){
				this.specia_banners2.push(this.specia_banners.slice(i,i + 4))
			}
		},

		onBackPress(options) {
		  // 触发返回就会调用此方法，这里实现的是禁用物理返回，顶部导航栏的自定义返回 uni.navigateBack 仍可使用
		  if (options.from == 'backbutton') {
		    return true;
		  } else if (options.from == 'navigateBack') {
		    return false;
		  }
		},
		methods: {
			moreList(){
				this.index_product_class2=this.index_product_class.slice(0,9)
				this.showMore=false
			},
			bannerToLink(item, index) {
				if (item.url) {
					uni.navigateTo({
						url: item.url+"?id=" + item.id
					})
				}
			},
			shopTo(item, index) {
				uni.navigateTo({
					url: '../product_list/product_list' + "?type=" + this.type + '&name=' + item.title+ '&id=' + item.id
				});
			},
			specialBannerTo(items, indexs) {
				uni.navigateTo({
					url: '/pages/special_detail/special_detail?title=' + items.title+'&image=' + items.image_list
				})
			},
			// 購物車數量
			getCart() {
				let token = uni.getStorageSync('user_token');
				let user_id = uni.getStorageSync('user_id')
				this.$http.request({
					url: "/api/cart/my?token=" + token + "&user_id=" + user_id,
					method: 'GET',
					data: {
						
					},
					dataType: 'json',
					success: (res) => {
						// console.log(res)
						if (res.statusCode === 200 && res.data.code == 0) {
							if (res.data.data.length) {
								uni.setStorageSync('cart_length', res.data.data.length)
							} else {
								uni.removeStorageSync('cart_length');
							}
							var cart_total = parseInt(res.data.data.length || 0);
							if (cart_total <= 0) {
							    app.globalData.set_tab_bar_badge(2, 0);
							} else {
							    app.globalData.set_tab_bar_badge(2, 1, cart_total);
							}
							
							
							// uni.hideLoading();
						} else if (res.statusCode == 200 && res.data.code == 201) {
							uni.removeStorageSync('user_token');
							uni.removeStorageSync('user_id');
							app.globalData.showToast(this.$t('please_log_in_to_the_account_first', '请先登录账号'))
						} else {
							app.globalData.showToast(this.$t('request_was_aborted', '请求失败'))
							// uni.hideLoading();
						}
					},
					fail: () => {
						// console.log((失败))
					}
				})
			},
			// 搜索跳转
			routeSearch() {
				uni.navigateTo({
					url: '../search/search?type=index'
				})
			},
		}
	}
</script>


<style lang="scss">
	@import url("index.scss");

	.index-page {
		max-width: 100%;
		min-height: 100vh;
		position: relative;
		
		background: #fff;
		::v-deep .u-fade-enter-active {
			bottom: 200rpx !important;
		}
		.popup_lang {
			::v-deep .u-fade-enter-active {
				bottom: 0rpx !important;
			}
		}
		.index-top {
			width: 100%;
			height: 300rpx;
			//background: url(../../static/image2/index/banner_blue.png) no-repeat;
			background-size: 100%;
			background-position: 0 -60rpx;
			transition: .3s;
		}
		.index-top_none {
			// background: none !important;
			opacity: 0;
		}
		
		.index_top_active {
			background: #fff;
			transition: .3s;
		}

		.swiper {
			height: 450rpx;
			overflow: hidden;
			// border-radius: 19rpx;
			.swiper_cont {
				img {
					height: 450rpx;
				}
			}
		}
		
		.swipers {
			border-radius: 20rpx !important;
			overflow: hidden;
			height: 300rpx;
			overflow: hidden;
			// border-radius: 19rpx;
			.swiper_cont {
				img {
					height: 300rpx;
				}
			}
			::v-deep .uni-swiper-dot-active {
				border-radius: 50%;
			}
			::v-deep .uni-swiper-slides {
				border-radius: 20rpx !important;
			}
			::v-deep .uni-swiper-wrapper {
				height: 300rpx;
				border-radius: 20rpx !important;
			}
		}
		::v-deep .uni-swiper-dot {
			width: 16rpx;
			height: 16rpx;
		}

		::v-deep .uni-swiper-slides {
			// border-radius: 19rpx;
		}

		::v-deep .uni-swiper-dot-active {
			width: 17rpx !important;
			height: 17rpx !important;
			// border-radius: 8px !important;
		}

		

		.new_top {
			background: linear-gradient(to bottom, #FFF8FB, #FED7E7);
			width: 49%;
			border-radius: 15px;
		}

		.new_bottom {
			background: linear-gradient(to bottom, #FED7E7, #FFF8FB);
			width: 49%;
			border-radius: 15px;
			margin-top: 5px;
		}

		@media (min-width: 500px) {
			.new-cont {
				padding-bottom: 50px !important;
			}

			.new-view {
				height: 120px !important;
			}
		}



		.tan-main-wrap {
			display: flex;
			flex-flow: column wrap;
			max-height: 100Vh;
		}

		.tan-list-box {
			margin: 10rpx;
			width: calc(100% / 2 - 20rpx);
			overflow: hidden;
		}

		.tan-img-pic {
			width: 100%;
		}

		image {
			display: inline-block;
			margin: 16px;
			height: 80px;
			width: 80px;
		}

		.scroll-wrap {
			white-space: nowrap;
		}

		.scroll-wrap2 {
			display: flex;
			align-items: flex-start;
			// flex-direction: column;
			// flex-wrap: wrap;
		}

		.text-over {
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
		.text-over_s {
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
	}
	.item_cop{
	display: -webkit-box;
	overflow-x: scroll;
	overflow-y: hidden;
	-webkit-overflow-scrolling: touch;
	}
	.red_box {
		font-size: 20rpx;
		animation: mymove 3s infinite;
		// animation-direction: alternate;/*轮流反向播放动画。*/
		animation-timing-function: ease-in-out; /*动画的速度曲线*/
		background: url(@/static/image2/message/red_box.png) no-repeat;
		background-size: 100% 100%;
		width: 80rpx;
		height: 60rpx;
		top: -20rpx; 
		left: -20rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		display: none;
	}
	.red_box_1 {
		// animation: jitter 3s infinite
	}
	// 放大縮小
	@keyframes mymove {
	    0% {
	        transform: scale(.7);  /*开始为原始大小*/
	    }
	    25% {
	        transform: scale(1);
	    }
	    50% {
	        transform: scale(.7);
	    }
	    75% {
	        transform: scale(1);
	    }
		100% {
			transform: scale(.7);
		}
	}
	// 左右晃動
	@keyframes jitter {
	    0% {
	      transform: rotate(0deg);
	    }
	    5% {
	      transform: rotate(10deg);
	    }
	    10% {
	      transform: rotate(0deg);
	    }
	    15% {
	      transform: rotate(-10deg);
	    }
	    20% {
	      transform: rotate(0deg);
	    }
	    25% {
	      transform: rotate(10deg);
	    }
	    30% {
	      transform: rotate(0deg);
	    }
	    35% {
	      transform: rotate(-10deg);
	    }
	    40% {
	      transform: rotate(0deg);
	    }
	    100% {
	      transform: rotate(0deg);
	    }
	}
</style>
