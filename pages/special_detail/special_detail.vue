<template>
	<view class="special-detail-page chun-img-text">
		
		<view class="top-title-banner">
			<view class="flex align-center">
				<view style="width: 20%;">
					<uni-icons class="top-back-btn" type="back" style="font-size: 45rpx; color: #6d14b6;" @click="$back"></uni-icons>
				</view>
				<view class="left-part" style="width: 60%;">
					<view class="name position-re"><image style="width: 50rpx;height: 50rpx;"  :src="specialImage"></image> {{specialName}}</view>
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
		
		<!-- <view class="content" v-html="content"></view> -->
		<view class="content">
			<view class="jianjie">專科簡介</view>
			<view class="jianjie-tu-text">
				<image src="../../static/image2/index/banner.jpg" class="img1" mode="aspectFit"></image>
				<view class="jianjie-text">
					内科專注於内部器官的診斷和治療，通常不涉及手術。内科醫生處理各種慢性和急性疾病，
					如高血壓、糖尿病和肺炎。他們通常進行體檢、診斷測試和藥物治療。
				</view>
			</view>
			
			<view class="jianjie">醫生團隊</view>
			<view class="tuandui-box">
				<view class="doctor-name">伍子聰醫生</view>
				<view class="keshi">內外全科</view>
				<view class="zhicheng">
					<view>香港中文大學內外全科醫學士</view>
					<view>英國倫敦瑪麗女王大學臨床皮膚學深造文憑</view>
					<view>英國皇家外科醫學院院員</view>
					<view>香港家庭醫學學院院士</view>
					<view>澳洲皇家全科醫學院院士</view>
				</view>
			</view>
			
			<view class="content-big-box">
				<view class="title1">提供診症及治療範疇</view>
				<ul>
					<li>
						處理多種常見疾病和健康問題，供初步的診斷、治療和健康管理服務
					</li>
					<li>
						皮膚感染敏感、痛症等。
					</li>
				</ul>
			</view>
		</view>
		
		
		<view class="" style="height: 160rpx;"></view>
		
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	const app = getApp();
	import tabBar from '../../components/tab-bar/tab-bar.vue';
	 
	export default {
	  components: {
	    tabBar,
	  },
		data() {
			return {
				specialName:'',
				specialImage:'',
				content:`
				<image src="../../static/image2/index/banner.jpg" class="img1" mode="aspectFit"></image>
				<view class="content-big-box">
					<view class="title1">Lorem Ipsum</view>
					<view class="p1">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</view>
					<view class="title2">Lorem</view>
					<ul>
						<li>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
							sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</li>
						<li>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
							sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</li>
					</ul>
				</view>
				`
			}
		},
		
		mounted() {
			
		},
		onLoad(res) {
			this.specialName=res.title
			this.specialImage=res.image
		},
		onShow() {
			
		},
		methods: {
			
		}
	}
</script>


<style lang="scss">
	.top-title-banner .left-part .name{
		background-color: #fff;
		border-radius: 60rpx;
		padding: 10rpx 10rpx 10rpx 80rpx;
		uni-image{
			position: absolute;
			top: 14rpx;
			left: 10rpx;
		}
	}
	.jianjie{
		padding: 20rpx 30rpx;
		color: #7110D2;
		background-color:#F8F4FF ;
		font-weight: bold;
		font-size: 38rpx;
		margin-bottom: 20rpx;
	}
	.jianjie-tu-text{
		padding: 30rpx;
		.jianjie-text{
			color: #475266;
			font-size: 30rpx;
		}
		uni-image{
			border-radius: 30rpx;
			margin-bottom: 20rpx;
		}
	}
	.tuandui-box{
		margin: 30rpx;
		padding: 30rpx;
		background-color: #F2F1FF;
		border-radius:30rpx;
		.doctor-name{
			color: #2692D1;
			font-size: 35rpx;
			font-weight: bold;
			margin-bottom: 5rpx;
		}
		.keshi{
			color: #7110D2;
			margin-bottom: 20rpx;
		}
	}
	
</style>
