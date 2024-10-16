<template>
	<view>
		<!-- 顶部内容 -->
		<view class="top-content ">
			<!-- 内容 -->
			<view class="content position-re" style="">
				<image class="back position-ab" @click="$back" src="/static/images/back.png" mode="widthFix"></image>
				
				<view class=" reg-tit">找回密碼</view>
				<view class="code-tip-one" v-if="phone">
					<view class="code-tip">請輸入<text>+{{phone.length==11?86:852}}
							{{phone.substring(0, 3)}}****{{phone.substr(phone.length-4)}}</text>
						收到的驗證碼</view>
				</view>
				<!-- 输入框 -->
				<view class=" inputs position-re">
					<input v-if="!phone" class="" style="margin-bottom: 100rpx;" type="text" placeholder="請輸入手機號"
						v-model="phone" placeholder-style="color:#D1D1D1;">
					<input class="" style="margin-bottom: 100rpx;" type="text" placeholder="請輸入驗證碼" v-model="code"
						placeholder-style="color:#D1D1D1;">
					<input class="" style="margin-bottom: 64rpx;" type="password" placeholder="请设置6～18位的字母数字組合"
						v-model="password" placeholder-style="color:#D1D1D1;" autocomplete="off">
					<input class="" style="margin-bottom: 64rpx;" type="password" placeholder="請再次確認密碼"
						v-model="again_pass" placeholder-style="color:#D1D1D1;" autocomplete="off">
					<button class="position-ab forget" :class="!phone?'mt':''" @click="getcode()" hover-class="none"
						type="default" :disabled="verifyShow"><text
							v-if="sec!=60">({{sec}}s)</text>{{$t('Resend_login')}}</button>
				</view>
				<!-- 按钮 -->
				<button class="getyzm" @click="submet">完成</button>

			</view>

		</view>

	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				// 手機號
				phone: "13111234234",
				// 語言
				lang: 'chs',
				// 國家
				country: 'HK',
				// 驗證碼
				code: '',
				// 密碼
				password: '',
				// 再次輸入密碼
				again_pass: '',
				sec: '60', //倒计时
				code: '', //这是用户输入的验证码
				verifyShow: false, //是否禁用按钮

			}

		},
		onLoad(data) {
			if (uni.getStorageSync('lang')) {
				let locale = uni.getStorageSync('lang');
				this.lang = locale;

			}
			if (data) {
				this.phone = data.phone;
				this.country = data.country;
				this.getcode();
			} else {
				app.globalData.showToast('修改成功');
			}
		},
		methods: {
			// 提交表單
			submet() {
				let phone = this.phone;
				if (this.phone.length == 8) {
					phone = 852 + this.phone;
				}
				console.log(phone);
				console.log(this.code);
				console.log(this.password);
				console.log(this.again_pass);
				if (!this.code) {
					app.globalData.showToast("請輸入驗證碼");
					return;
				}

				if (!this.password) {
					app.globalData.showToast("請輸入新密碼");
					return;
				}
				if (!this.again_pass) {
					app.globalData.showToast("請再一次輸入密碼");
					return;
				}
				if (this.password != this.again_pass) {
					app.globalData.showToast('兩次密碼不一致');
				}
				// 正則校驗密碼必須包含數字和字母
				let reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
				if (reg.test(this.password)) {
					var rst = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g;
					if (rst.test(this.password)) {
						app.globalData.showToast("新密碼不能包含中文");
						return
					}
					if (/\s/g.test(this.password)) {
						app.globalData.showToast("新密碼不能包含空格");
						return
					}
				} else {
					app.globalData.showToast("新密碼必須包含至少一位數字和一位字母");
					return
				}
				uni.showLoading({
					title: '加载中...'
				});
				let token = uni.getStorageSync('user_token');
				let user_id = uni.getStorageSync('user_id');
				this.$http.request({
					url: "/api/user/reset_pass",
					method: 'GET',
					data: {
						token: token,
						user_id: user_id,
						lang: uni.getStorageSync('lang'),
						verify: this.code,
						pass: this.$md5(this.password),
						phone: phone

					},
					dataType: 'json',
					success: res => {
						if (res.statusCode === 200 && res.data.code == 0) {
							uni.hideLoading();
							app.globalData.showToast("修改成功")
							setTimeout(() => {
								uni.navigateBack();
							}, 2000)
						} else {
							app.globalData.showToast(res.data.message);
						}
					},
					fail: () => {
						uni.hideLoading();
						app.globalData.showToast("服務器請求失敗")
					}
				});
			},
			// 获取验证码
			getcode() {
				let phone = this.phone;
				if (this.phone.length == 8) {
					phone = 852 + this.phone;
				}
				console.log(phone);
				this.timedown(this.sec) // 倒计时
				this.$http.request({
					url: "/api/mobile/sendcode3",
					method: 'GET',
					data: {
						action: 'reset_pass',
						phone: phone,
						lang: this.lang,
					},
					dataType: 'json',
					success: res => {
						console.log(res.data);
						if (res.data.code != 0) {
							app.globalData.showToast(res.data.message);
						}
					},
					fail: err => {
						app.globalData.showToast("发送失败，请重新获取");
					}
				})
			},
			//倒计时
			timedown: function(num) {
				let that = this;
				if (num == 0) {
					that.verifyShow = false; // 不禁用获取验证码按钮
					that.sec = 60
					return clearTimeout();
				} else {
					that.verifyShow = true; // 禁用获取验证码按钮
					setTimeout(function() {
						that.sec = num - 1
						that.timedown(num - 1);
					}, 1000); //定时每秒减一  
				}
			},
		},


	}
</script>

<style>
	@import "./forget-password.css"
</style>
