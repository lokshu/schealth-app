<template>
	<view>
		<view class="top-content public-top">
			<view class="content position-re" style="">
				<image class="back position-ab" @click="back" src="@/static/images/back.png" mode="widthFix"></image>
				<!-- <image class="language position-ab" @click="lang" src="@/static/image2/register/language.png" mode="widthFix"></image> -->
				
				<view class="content-big-box">
				<view>
					<view class="pt-5">
						<image class="photos" src="@/static/image2/register/login-icon1.png" mode="widthFix"></image>
					</view>
					<view class="inputs position-re">
						<input class="inputs-true" style="margin-bottom: 100rpx;" type="number"
								placeholder="手機號碼" placeholder-style="color:#D1D1D1;" v-model="phone">
						<image class="ico1 position-ab" src="@/static/image2/register/phone.png" mode="widthFix">
							</image>

						<input class="inputs-true" style="margin-bottom: 64rpx;" v-model="passwords" type="password"
								placeholder="密码" placeholder-style="color:#D1D1D1;" autocomplete="off">
						<image class="ico2 position-ab" @click="eyes" :src="eye_src" mode="widthFix"></image>
						<view class="position-ab forget" @click="forget_pass">忘记密码</view>
						</view>
						
						<view class="text-right goRegister"><navigator url='/pages/register/register'>立即註冊</navigator></view>
						<button class="getyzm" @click="pass_reg_true">登录</button>
					
						<view class="flex xieyi-w align-center" style="margin-top: 100rpx;">
							<u-checkbox-group >
								<u-checkbox @change="select_file" activeColor="#8550B9" iconSize="18px" labelSize="18px" size="30"></u-checkbox>
							</u-checkbox-group>
							<view class="xieyi">
								點擊即表示您同意提供的
									<text @click="serves_go">使用者條款</text>和<text @click="privacy_go">隱私政策</text>。
							</view>
						</view>
					</view>
				</view>
				</view>
			</view>
		<service-agreement @senddata="getnum" :data_num="backmsg" v-if="file_serve"></service-agreement>

	</view>
</template>

<script>
	const app = getApp();
	import serviceAgreement from "../../components/service-agreement/service-agreement.vue"
	import code from "../../uni_modules/uview-ui/libs/config/props/code";
	export default {
		data() {
			return {
				codeSrc:`https://egogo.hk/api/mobile/code2?${Date.now()}`,
				code:'',
				invitation: '',
				// 邀請碼
				passwords: '',
				// 密码
				// 协议点击
				endge: false,
				// 弹框显示
				file_serve: false,
				// 节流
				jlFlag: true,
				// 密码登录
				ispass: true,
				// 密码小眼睛
				eye: true,
				// 眼睛图片
				eye_src: "/static/image2/register/pass.png",
				// 输入框type
				type: "password",
				// 禁用
				disabled: "disabled",
				phone: "",
				/* 用户输入的手机号*/
				select_option: "+852",
				/*选中的区号 样式*/
				country: 'HK',
				// 國家碼
				isoption: "true",
				/*区号选项显示  */
				area_name: '中国香港',
				/* 区号列表 */
				area_code: [{
					num: "+86",
					name: '中国大陆',
					country: 'CN',

				}, {
					num: "+852",
					name: "中国香港",
					country: 'HK',
				}],
				backmsg: {
					backmsg1: "親愛的用戶，爲保障您的權益，在注册流程中請閱讀幷理解：", //返回
					backmsg2: '"服務條款" "隱私權相關政策"', //返回
					backmsg3: "點擊同意即表示您已充分閱讀幷接受以上協議的內容。閱讀過程中，若對相關協議或其中的條款有任何疑問，可諮詢我們的平臺客服，我們將嚴格按照協議內容執行，盡力爲您提供更好地服務。", //返回
					title: "SC-Health 平台 [隱私協議 與 服務條款]", //返回标题
					btn1: '不同意',
					btn2: '同意',
				},
			}
		},
		onLoad(item) {
			if (item.id) {
				this.invitation = item.id;
			}
		},
		onShow() {
			// window.history.replaceState(null,null,'/')
			setTimeout(() => {
				this.backmsg.title = this.$t('protocol_title');
				this.backmsg.btn1 = this.$t('disagree');
				this.backmsg.btn2 = this.$t('agree');
			}, 500)
			
			
			
			
		},
		components: {
			serviceAgreement
		},

		methods: {
			back() {
				history.back();
			},
			lang() {
				uni.navigateTo({
					url: '/pages/language/language'
				})
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
			// 弹框取消
			getnum(num) {
				this.file_serve = false;
				if (!num) {
					this.endge = false;
					uni.navigateTo({
						url: "/pages/verification-code/verification-code?phone=" + this.phone +
							"&refer=" + this.invitation + "&country=" + this.country,

					})
				}
			},

			// 协议确定
			select_file(n) {
				this.endge = n
			},
			// 获取验证码
			getcode() {
				if (this.disabled == "disabled") {
					return
				};
				if(this.code.length!=6){
					app.globalData.showToast("請完整輸入驗證碼");
					return
				}
				if (this.endge) {
					this.file_serve = true;

				} else {
					this.$http.request({
						url: "/api/mobile/verify2",
						method: 'GET',
						data: {
							code: this.code
						},
						dataType: 'json',
						success: res => {
							if (res.data.code == 0) {
								uni.navigateTo({
									url: "/pages/verification-code/verification-code?phone=" + this.phone +
										"&refer=" + this.invitation + "&country=" + this.country,
								})
							} else {
								app.globalData.showToast("驗證碼錯誤");
							}
						},
						fail: () => {
							console.log('服务器请求出错');
						}
					});
				}
			},
			// 眼睛
			eyes() {
				return
				if (!this.jlFlag) {
					return
				};
				this.jlFlag = false;
				this.eye = !this.eye;
				if (this.eye) {
					this.eye_src = "/static/image2/register/pass.png";
					this.type = "password";
				} else {
					this.eye_src = "/static/image2/register/text.png";
					this.type = "text";
				};
				setTimeout(() => {
					this.jlFlag = true;
				}, 800)
			},
			// 号码登录/验证码登录
			pass_reg(edg) {
				this.ispass = edg;
			},
			// 密码登录接口
			pass_reg_true() {
				uni.switchTab({
					url: '/pages/index/index',
				});
				return false
				if (this.phone.length < 8 || this.phone.length > 11) {
					app.globalData.showToast('請輸入正確的手機號');
					return
				}
				if (!this.endge) {
					app.globalData.showToast('請同意協議');
					return;
				}
				if (!this.phone) {
					app.globalData.showToast('請輸入手機號');
					return
				} else if (!this.passwords) {
					app.globalData.showToast('請輸入密碼');
					return
				} else {
					uni.switchTab({
						url: '/pages/index/index',
					});
					return false
					
					uni.showLoading({
						title: "处理中...",
					});
					this.$http.request({
						url: '/api/user/login',
						method: "GET",
						data: {
							name: this.phone,
							pass: this.$md5(this.passwords),
						},
						dataType: "json",
						success: (res) => {
							uni.hideLoading();
							if (res.data.code == 0) {
								console.log(res);
								uni.setStorageSync('type', 'true');
								uni.setStorageSync('user_id', '' + res.data.data.user_id);
								uni.setStorageSync('user_token', '' + res.data.data.user_token);
								app.globalData.data.user_token = res.data.data.user_token;
								app.globalData.data.user_id = res.data.data.user_id;
								uni.switchTab({
									url: '/pages/index/index',
								});
							} else {
								if (res.data.message == "invalid_password") {
									app.globalData.showToast("密碼錯誤");
								} else if (res.data.message == "invalid_user_name") {
									app.globalData.showToast("手機號碼不存在");
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

			// 号码规格
			phones(e) {
				if (this.select_option == "+852") {
					if (e.target.value.length == 8) {
						this.disabled = "undisabled";
					} else {
						this.disabled = "disabled";
					}
				} else {
					if (e.target.value.length == 11) {
						this.disabled = "undisabled";
					} else {
						this.disabled = "disabled";
					}
				}
			},
			// 忘记密码
			forget_pass() {
				if (!this.phone) {
					app.globalData.showToast('請輸入手機號');
					return
				}
				uni.navigateTo({
					url: "/pages/forget-password/forget-password?phone=" + this.phone + "&country=" + this.country,
				})
			},
			// 区号选择
			show_option() {
				this.isoption = !this.isoption;
			},
			// 区号切换
			area_switch(data) {
				this.area_name = data.name;
				this.select_option = data.num;
				// 區碼
				this.country = data.country;
				// 國家碼
				this.lang = data.lang;
				// 語言碼
				this.isoption = !this.isoption;
				this.phone = '';
			},
			wxlogin() {
				return
				console.log("WX登录");
				var appid = "wx39fc9046eb1a3640";
				console.log(appid);
				var url = encodeURIComponent("");
				open("http://open.weixin.qq.com/connect/qrconnect?appid=" + appid + "&redirect_uri=" + url +
					"&response_type=" + "code" + "&scope=" + "snsapi_login" + "&state=STATE#wechat_redirect");
				this.getwxcode();

			},
			getwxcode() {
				let local = location.href;
				console.log(local);
				let code = this.getParam(local, "code");
				uni.setStorageSync('aaa', code)
				if (code != "") {
					this.$http.request({
						url: "/api/wechat/login",
						method: 'GET',
						data: {
							code: code
						},
						dataType: 'json',
						success: res => {

							if (res.data.code == 0) {
								console.log(res.data);
								var openid = res.data.data.openid;
								var session_key = res.data.data.session_key;
							} else {
								console.log(res.data.message);
								console.log(res.data);
							}
						},
						fail: () => {
							console.log('服务器请求出错');
						}
					});
				}
			},
			getParam(path, name) {
				var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
				if (reg.test(path)) {
					return unescape(RegExp.$2.replace(/\+/g, " "));
				}
				return "";
			},
			changeCode(){
				this.codeSrc=`https://egogo.hk/api/mobile/code2?${Date.now()}`;
			}
		}
	}
</script>

<style>
	@import "./login.css"
</style>
