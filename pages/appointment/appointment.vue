<template>
	<view class="appointment-page">
		
		<view class="top-title-banner">
			<view class="flex align-center">
				<view style="width: 20%;">
					<!-- <uni-icons type="back" class="top-back-btn" style="font-size: 45rpx; color: #6d14b6;" @click="$back"></uni-icons> -->
				</view>
				<view class="left-part text-center" style="width: 60%;">
					<view class="name">我的預約</view>
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
		<view>
			<view class="p-3 calendar-content">
			    
				<uni-calendar class="uni-calendar--hook" :showMonth="false" @change="change"
			    :insert="true" 
				:date='info.date'
			    :selected="info.selected"
			     />
				 
				 <view class="appointment-text" v-for="item in checkProject" v-if="checkProject">
					 <view class="name">{{item.project}}</view>
					 <view class="time">{{item.datetime}}</view>
				 </view>
				 
			</view>
		</view>
		
		
		<view class="" style="height: 120rpx;"></view>
	</view>
</template>

<script>
	const app = getApp();
	import uniCalendar from '../../components/uni-calendar/uni-calendar.vue';
	export default {
		components: {
		    uniCalendar
		  },
		data() {
			return {
				info:{
					date:'2024-10-17',
					selected:[
						{
							date: '2024-10-17',
							dateInfo:[
								{project:'腸胃鏡檢查',datetime:'17/9/24 (10:00-11:00)'},
								{project:'視力檢查',datetime:'17/9/24 (11:00-12:00)'}
							]
						},
						{
							date: '2024-10-27',
							dateInfo:[
								{project:'腸胃鏡複查',datetime:'27/9/24 (10:00-12:00)'}
							]
						},
						
						
					]
				},
				checkProject:[],
			}
		},
		
		mounted() {
			
		},
		onLoad() {
			
		},
		onShow() {
			if(this.info.selected[0].dateInfo){
				this.checkProject = this.info.selected[0].dateInfo
			}else{
				this.checkProject=[]
			}
		},
		methods: {
			change(e) {
				if(e.extraInfo.dateInfo){
					this.checkProject = e.extraInfo.dateInfo
				}else{
					this.checkProject = []
				}
			},
		}
	}
</script>


<style>
	::v-deep .uni-calendar__content{border-radius: 25rpx;}
	::v-deep .uni-calendar-item--checked{
		background-color: #6D14B3 !important;
		color: #ffffff;
		border-radius: 100%;
	}
	.appointment-text{
		padding: 25rpx;
		background-color: #ffffff;
		color: #000;
		margin:25rpx 0 ;
		border-radius: 20rpx;
	}
	.appointment-text .name{
		font-weight: bold;
		font-size: 35rpx;
		margin-bottom: 15rpx;
	}
	.appointment-text .time::before{
		content: "";
		display: block;
		width: 10rpx;
		height: 10rpx;
		border-radius: 100%;
		background-color: #000;
		position: absolute;
		left: 15rpx;
		top: 50%;
		transform: translateY(-50%);
	}
	.appointment-text .time{
		position: relative;
		padding-left: 40rpx;
		font-size: 30rpx
	}
</style>
