<template>
	<view>
		<contact-fab></contact-fab>
		<view class="top-content">
			<!-- 顶部内容 -->
			<view class="top-bar-head">
				<view class="flex align-center top-title-banner1">
					<view style="width: 20%;">
						<!-- <uni-icons type="back" class="top-back-btn" style="font-size: 45rpx; color: #6d14b6;" @click="$back"></uni-icons> -->
					</view>
					<view class="left-part text-center" style="width: 60%;">
						<view class="name">我的賬戶</view>
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
				<view class=" ">
					<!-- 左侧头像 -->
					<view class=" user-message">
						<!-- 用户信息 -->
						<view class="flex align-start justify-between">
							<view class=" flex align-center">
								<!-- 头像 昵称 -->
								<image @tap="preview_event" @error="user_avatar_error"
									class=" circle bg-white va-m photo-left-true" style="margin: 15rpx 16rpx 0 15rpx;"
									:src="avatar" mode=""></image>
								<!-- 信息 -->
								<view class="va-m dis-inline-block cr-white margin-left-xs tl">
									<view data-value="/pages/personal/personal" class="inner-left">
										<view class="left-part">
											<view class="name">{{nickname}}</view>
											<view class="number">會員編號: 00001</view>
										</view>
									</view>
								</view>
							</view>
							
						</view>
						
						<!-- 我的積分 -->
						<view class="my-jifen">
							<u-row class="text-center">
								<u-col class="pt-2 pb-2" span="4" @click="toMyRights(1)">
									<view>我的積分</view>
									<text>25</text>
								</u-col>
								<u-col class="pt-2 pb-2" span="4" @click="toMyRights(2)">
									<view>我的禮券</view>
									<text>3</text>
								</u-col>
								<u-col span="4">
									<button @click="toMyRights(0)" class="wallet">我的錢包</button>
									<button @click="toMyRights(1)" class="record">積分記錄</button>
								</u-col>
							</u-row>
						</view>
						
					</view>
				
				</view>
				
			</view>
			
			<view class="content">
				<view class="pt-4 nav-box padding-main  spacing-mb function-btm margin-bottom-main">
					<view style="box-sizing: border-box;margin:0 auto 32rpx; ">
						
						<view class="flex align-center justify-between nav-box-item">
							<text class="font-bold" >
								<image class="text-left-img" mode="aspectFit" src="../../static/image2/user/icon1.png"></image>
								 通知設定
							</text>
							<view class="">
								<u-switch v-model="notificationSetting" activeColor="#8550B9" ></u-switch>
							</view>
						</view>
						
						<view class="flex align-center justify-between nav-box-item" @click="changePwdPop=true">
							<text class="font-bold" >
								<image class="text-left-img" mode="aspectFit" src="../../static/image2/user/icon2.png"></image>
								修改密码
							</text>
							<view class="">
								<uni-icons type="right" style="font-size: 35rpx;" color="#181725"></uni-icons>
							</view>
						</view>
						
						<view class="flex align-center justify-between nav-box-item" @click="changeMessagePop=true">
							<text class="font-bold" >
								<image class="text-left-img" mode="aspectFit" src="../../static/image2/user/icon3.png"></image>
								我的資料
							</text>
							<view class="">
								<uni-icons type="right" style="font-size: 35rpx; margin-left: 10rpx;" color="#181725">
								</uni-icons>
							</view>
						</view>
						
						<navigator url="/pages/terms_of_service/terms_of_service" 
						class="flex align-center justify-between nav-box-item">
							<text class="font-bold" >
								<image class="text-left-img" mode="aspectFit" src="../../static/image2/user/icon4.png"></image>
								使用者條款
							</text>
							<view class="">
								<uni-icons type="right" style="font-size: 35rpx;" color="#181725"></uni-icons>
							</view>
						</navigator>
						
						<navigator url="/pages/privacy_policy/privacy_policy" 
						class="flex align-center justify-between nav-box-item">
							<text class="font-bold" >
								<image class="text-left-img" mode="aspectFit" src="../../static/image2/user/icon5.png"></image>
								私隱權政策
							</text>
							<view class="">
								<uni-icons type="right" style="font-size: 35rpx;" color="#181725"></uni-icons>
							</view>
						</navigator>
						
						<navigator @click="success = true" class="flex align-center justify-between nav-box-item">
							<text class="font-bold" style="color: #6D14B3">
								<image class="text-left-img" mode="aspectFit" src="../../static/image2/user/icon6.png"></image>
								登出
							</text>
							<view class="">
								<!-- <uni-icons type="right" size="" style="font-size: 35rpx;" color="#BFBFBF"></uni-icons> -->
							</view>
						</navigator>
						
					</view>
				</view>
				<!-- 退出登录 -->
				<u-modal :show="success" :showConfirmButton="false">
					<view class="" style="width: 90%;">
						<view class="fc-000 font-bold text-center" style="font-size: 30rpx;">
							<!-- <img src="@/static/image2/status/success.png" alt="" style="width: 22%;" /> -->
							<image src="@/static/image2/status/success.png" mode="widthFix" style="width: 22%;"></image>
							<view class="" style="margin: 30rpx 0 10rpx;">{{ $t("are_you_sure_you_want_to_quit?", '确定要退出吗') }}
							</view>
						</view>
						<view class="flex align-center justify-between" style="margin-top: 30rpx;">
							<u-button class="bg-6D14B3"
								style="border-radius: 30rpx; margin-top: 30rpx; width: 45%; height: 75rpx;" @click="login_out">
								<text class="fc-fff" style="font-size: 24rpx;">{{ $t('sure', '确定') }}</text>
							</u-button>
							<u-button class="" style="border-radius: 30rpx; margin-top: 30rpx; width: 45%; height: 75rpx;"
								@click="success = false">
								<text class="fc-000" style="font-size: 24rpx;">{{ $t('cancel_1', '取消') }}</text>
							</u-button>
						</view>
					</view>
				</u-modal>
				<!-- 修改密码 -->
				<u-popup :show="changePwdPop" mode="bottom" 
				customStyle="border-top-left-radius:20rpx;border-top-right-radius:20rpx;" >
					<view class="flex justify-between align-center p-3" style="border-bottom: 1px solid #e2e2e2;">
						<view class="poptitle">修改密碼</view>
						<view class="popclose" @click="changePwdPop=false">
							<uni-icons type="closeempty" style="color: #181725;"></uni-icons>
						</view>
					</view>
					
				    <view class="p-3">
				    	
						<view class=" inputs position-re">
							<view class="input-label">舊密碼</view>
							<input class="inputs-true" type="password" placeholder-style="color:#D1D1D1;" v-model="oldPassword">
						</view>
						<view class=" inputs position-re">
							<view class="input-label">新密碼</view>
							<input class="inputs-true" type="password" placeholder-style="color:#D1D1D1;" v-model="newPassword">
						</view>
						<view class=" inputs position-re">
							<view class="input-label">確認新密碼</view>
							<input class="inputs-true" type="password" placeholder-style="color:#D1D1D1;" v-model="confirmPassword">
						</view>
						
						
				    	<u-button class="bg-8550B9" style="border-radius: 16rpx;margin-top: 40rpx;" @click="pwdSubmit">
				    		<text class="fc-fff" style="font-size: 24rpx;">確認修改</text>
				    	</u-button>
				    </view>
				</u-popup>
				<!-- 我的资料 -->
				<u-popup :show="changeMessagePop" mode="bottom" 
				customStyle="border-top-left-radius:20rpx;border-top-right-radius:20rpx;" >
					<view class="flex justify-between align-center p-3" style="border-bottom: 1px solid #e2e2e2;">
						<view class="poptitle">我的資料</view>
						<view class="popclose" @click="changeMessagePop=false">
							<uni-icons type="closeempty" style="color: #181725;"></uni-icons>
						</view>
					</view>
					
				    <view class="p-3">
				    	
						<view class="row-box">
							<u-row>
								<u-col span="12">
									<view class="input-box2">
										<view class="form-title1">登記電話</view>
										<input v-model="phone" type="number" />
									</view>
								</u-col>
							</u-row>
							<u-row>
								<u-col span="4">
									<view class="input-box2">
										<view class="form-title1">姓(中)</view>
										<input v-model="lastName" />
									</view>
								</u-col>
								<u-col span="8">
									<view class="input-box2">
										<view class="form-title1">名字(中)</view>
										<input v-model="firstName" />
									</view>
								</u-col>
							</u-row>
							<u-row>
								<u-col span="4">
									<view class="input-box2">
										<view class="form-title1">姓(英)</view>
										<input v-model="lastNameEn" />
									</view>
								</u-col>
								<u-col span="8">
									<view class="input-box2">
										<view class="form-title1">名字(英)</view>
										<input v-model="firstNameEn" />
									</view>
								</u-col>
							</u-row>
							<u-row>
								<u-col span="4">
									<view class="input-box2">
										<view class="form-title1">性別</view>
										<view class="sexSelect" @click="showSex=true">{{sex}} <u-icon label="" size="30" name="arrow-down"></u-icon></view>
										<u-picker :show="showSex" :columns="columnsSex" keyName="labelSex" @cancel='cancelSex' @confirm='confirmSex'></u-picker>
									</view>
								</u-col>
								<u-col span="8">
									<view class="input-box2">
										<view class="form-title1">出生日期</view>
										<view>
										    <uni-datetime-picker type="date" :border="false" class="birthSelect"
											:clear-icon="false"  @change="changeBirth" v-model="birth" />
										</view>
									</view>
								</u-col>
							</u-row>
							<u-row>
								<u-col span="12">
									<view class="input-box2">
										<view class="form-title1">電子郵件</view>
										<input v-model="email" type="email" />
									</view>
								</u-col>
							</u-row>
							<u-row>
								<u-col span="6">
									<view class="input-box2">
										<view class="form-title1">居住地區</view>
										<view class="sexSelect" @click="showAddress1=true">{{address1}} <u-icon label="" size="30" name="arrow-down"></u-icon></view>
										<u-picker :show="showAddress1" :columns="columnsAddress1" keyName="label" @cancel='showAddress1=false' @confirm='confirmAddress1'></u-picker>
									</view>
								</u-col>
								<u-col span="6">
									<view class="input-box2">
										<view class="form-title1">工作地區</view>
										<view class="sexSelect" @click="showAddress2=true">{{address2}} <u-icon label="" size="30" name="arrow-down"></u-icon></view>
										<u-picker :show="showAddress2" :columns="columnsAddress2" keyName="label" @cancel='showAddress2=false' @confirm='confirmAddress2'></u-picker>
									</view>
								</u-col>
							</u-row>
						</view>
						
				    	<u-button class="bg-8550B9" style="border-radius: 16rpx;margin-top: 40rpx;" @click="changeMessage">
				    		<text class="fc-fff" style="font-size: 24rpx;">確認修改</text>
				    	</u-button>
				    </view>
				</u-popup>
				<!-- 修改成功 -->
				<u-modal :show="changeSuccess" :showConfirmButton="false">
					<view class="" style="width:100%;">
						<view class="text-right" @click="changeSuccess=false">
							<uni-icons type="closeempty" style="color: #181725;font-weight: bold;"></uni-icons>
						</view>
						<view class="fc-000 font-bold text-center" style="font-size: 30rpx;">
							<image src="@/static/image2/register/Successmark.png" mode="widthFix" style="width: 25%;"></image>
							<view class="" style="margin: 30rpx 0 10rpx;">
								修改成功
							</view>
						</view>
					</view>
				</u-modal>
				
				<view class="" style="height: 140rpx;"></view>
			</view>
		</view>
		
	</view>
</template>

<script>
	const app = getApp();

	var common_static_url = app.globalData.get_static_url('common');
	var static_url = app.globalData.get_static_url('user');
	import contactFab from "../../components/contact-fab/contact-fab.vue"
	export default {
		components: {
			contactFab
		},
		data() {
			return {
				//通知設定
				notificationSetting:true,
				//modal
				success:false,
				is_reg: false,
				/* 是否登录 */
				common_static_url: common_static_url,
				static_url: static_url,
				avatar: "/static/image2/user/photo.png",
				user_id: '',
				nickname: "陈小明",
				loading: false,
				num: '',
				changePwdPop:false,
				oldPassword:'',
				newPassword:'',
				confirmPassword:'',
				changeMessagePop:false,
				phone:'',
				lastName:'',
				firstName:'',
				lastNameEn:'',
				firstNameEn:'',
				sex:'',
				showSex:false,
				showAddress1:false,
				showAddress2:false,
				columnsSex: [[
					{labelSex: '男',id:'male'},
					{labelSex: '女',id:'female'},
				]],
				columnsAddress1: [[
					{label: '九龍',id:1},
					{label: '荃灣',id:2},
				]],
				columnsAddress2: [[
					{label: '九龍',id:1},
					{label: '荃灣',id:2},
				]],
				birth:'',
				email:'',
				address1:'',
				address2:'',
				changeSuccess:false,
			};
		},

		onShow() {
			//this.init();
			
		},

		// 下拉刷新
		onPullDownRefresh(e) {
			//this.init();
		},

		methods: {
			login_out() {
				let locale = uni.getStorageSync('lang');
				let lang_list = uni.getStorageSync('lang_list');
				this.$http.request({
					url: '/api/user/logout',
					method: 'GET',
					data: {
						token: uni.getStorageSync('user_token'),
						user_id: uni.getStorageSync('user_id'),
					},
					dataType: 'json',
					success: res => {
						uni.hideLoading();
					},
					fail: () => {
						uni.hideLoading();
					}
				})
				uni.clearStorageSync();
				uni.setStorageSync('lang', locale)
				uni.setStorageSync('lang_list', lang_list)
				uni.navigateTo({
					url: '/pages/welcome/welcome',
				});
			},
		
			// 我的权益跳转
			toMyRights(type) {
				if(type==0){
					uni.navigateTo({
						url: "/pages/my_wallet/my_wallet"
					})
				}if(type==1){
					uni.navigateTo({
						url: "/pages/my_points/my_points"
					})
				}if(type==2){
					uni.navigateTo({
						url: "/pages/my_coupons/my_coupons"
					})
				}
			},
			//修改密碼
			pwdSubmit(){
				this.changePwdPop=false
				this.changeSuccess=true
			},
			//我的資料
			changeBirth(e) {
				this.birth = e
			},
			cancelSex() {
				this.showSex = false;
			},
			confirmSex(e) {
				const {value} = e;
				this.sex = value[0].labelSex;
				this.showSex = false;
			},
			confirmAddress1(e) {
				const {value} = e;
				this.address1 = value[0].label;
				this.showAddress1 = false;
			},
			confirmAddress2(e) {
				const {value} = e;
				this.address2 = value[0].label;
				this.showAddress2 = false;
			},
			changeMessage(){
				this.changeMessagePop=false
				this.changeSuccess=true
			},
			// 判断是否登录
			reg() {
				if (!uni.getStorageSync('user_id')) {
					if (app.globalData.is_login_check({
								code: 201
							}, this,
							'goods_favor_event')) {} else {}
				}
			},
			
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
			// 头像查看
			preview_event() {
				if (app.globalData.data.default_user_head_src != this.avatar) {
					uni.previewImage({
						current: this.avatar,
						urls: [this.avatar]
					});
				}
			},
			// 头像加载错误
			user_avatar_error(e) {
				this.setData({
					avatar: "@/static/image2/user/photo.png",
				});
			},


		},

		// 清除缓存
		remove_user_cache_event(e) {},

		// url事件
		url_event(e) {
			app.globalData.url_event(e);
		}
	}
</script>
<style>
	@import './user.css';
</style>