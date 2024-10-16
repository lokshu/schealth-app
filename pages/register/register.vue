<template>
	<view>
		<view class="top-content public-top">
			<!-- 内容 -->
			<view v-if="ispass" class="content position-re">
				<image class="back position-ab" @click="back" src="@/static/images/back.png" mode="widthFix"></image>
				
				<view class="content-big-box">
					<!-- step1 -->
					<block v-if="step1">
						<view>
							<image class="photos" src="@/static/image2/register/login-icon1.png" mode="widthFix"></image>
						</view>
						<view class="inputs position-re">
							<view class="input-label">請輸入你的手機號碼</view>
							<input type="number" v-model="phone" placeholder-style="color:#D1D1D1;" @input="phones"
								maxlength="11">
						</view>
						<view class="inputs position-re">
							<view class="input-label">推薦碼 <text style="color:#E66254;"> (如有)</text></view>
							<input type="text" v-model="invitation" placeholder-style="color:#D1D1D1;" @input="phones">
						</view>
						<view  class=" inputs position-re vercode-input" id="codeGroupContact">
							<view class="input-label">驗證碼</view>
							<input style="margin-bottom: 100rpx;width: 60%;" type="text" placeholder-style="color:#D1D1D1;" v-model="code">
							<image class="verCode1" :src="codeSrc" id="codeContact" @click="changeCode()">
							</image>
						</view>
						
					
						
						<button class="getyzm" :class="disabled" @click="getcode()">獲取驗證碼</button>
						
						<view class="buttom-btn text-center">
							<view>已有賬戶？<navigator url="/pages/login/login" style="color: #8550B9;display: inline-block;">立即登入</navigator></view>
						</view>
					</block>
					<!-- step2 -->
					<block v-if="step2">
						<view>
							<view class="input-label1">請輸入你的驗證碼</view>
							<image class="photos" src="@/static/image2/register/login-icon1.png" mode="widthFix"></image>
						</view>
						
						<view class="text-center pb-3">請於1分鐘內輸入驗證碼</view>
						<input class="cinput" adjust-position="false" auto-blur="true" @blur="blur" @input="codenum"
							:focus="focus" value="code" v-model="code" type="number" maxlength="6" />
						<view class="code-input">
							<view v-for="(item,index) in 6" :key="index" @click="codefocus(index)"
								:style='(index == code.length? "border: 5rpx solid #6D14B3;width: 80rpx;height: 80rpx;line-height: 80rpx;":"color: " + codeclolor + ";" )'>
								{{code[index] && code[index] || ''}}
							</view>
						</view>
						
						<view class="text-center pt-3">沒有收到嗎 ?</view>
						
						<button class="getyzm" @click="reSendNext()" hover-class="none" type="default" :disabled="verifyShow">
								<text v-if="sec!=60">({{sec}}s)</text>重新发送
						</button>
					</block>
					<!-- step3 -->
					<block v-if="step3">
						<view class="input-label1">請輸入密碼</view>
						<view class=" inputs position-re">
							<input class="inputs-true" v-model="passwords" type="password"
								 placeholder-style="color:#D1D1D1;" autocomplete="off">
							<image class="ico2 position-ab" @click="eyes" :src="eye_src" mode="widthFix">
							</image>
						</view>
						<view class=" inputs position-re">
							<view class="input-label">確認密碼</view>
							<input class="inputs-true" type="password" placeholder-style="color:#D1D1D1;" v-model="passwords2">
							<image class="ico2 position-ab" @click="eyes" :src="eye_src" mode="widthFix">
							</image>
						</view>
						<button class="getyzm" @click="pass_reg_true">下一步</button>
					</block>
					<!-- step4 -->
					<block v-if="step4">
						<view class="input-label1">請填寫基本信息</view>
						<view class="row-box">
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
						
						<view class="flex xieyi-w">
							<u-checkbox-group >
								<u-checkbox @change="select_file" activeColor="#8550B9" iconSize="18px" labelSize="18px" size="30"></u-checkbox>
							</u-checkbox-group>
							<view class="xieyi">
								點擊即表示您同意提供的
									<text @click="serves_go">使用者條款</text>和<text @click="privacy_go">隱私政策</text>。
							</view>
						</view>
						<button class="getyzm" @click="submit()">提交</button>
					</block>
					<!-- step end -->
				</view>
					
			</view>
			
			<view v-else class="content position-re">
				<view class="content-big-box">
					<image class="photos" src="@/static/image2/register/Successmark.png" mode="widthFix"></image>
					<view class="input-label1 text-center">註冊成功</view>
					<navigator url="/pages/login/login">
						<button class="getyzm" @click="submit()">馬上登入</button>
					</navigator>
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
				codeSrc:`http://localhost:6791/server/app/user/captcha?${Date.now()}`,
				code:'',
				// 验证码输入聚焦
				focus: true, //input焦点，用于键盘隐藏后重新唤起
				// 验证码框颜色
				codeclolor: "#ECE2FF", //自定义光标的颜色
				// 验证码获取秒数
				sec: '60', //倒计时
				code: '', //这是用户输入的验证码
				verifyShow: false, //是否禁用按钮
				codeMessage: "验证码已发送", //验证信息
				// 弹框显示
				file_serve: false,
				backmsg: {
					backmsg1: "点击返回将中断", //返回
					backmsg2: '“登录”', //返回
					backmsg3: "是否继续", //返回
					title: "", //返回标题
					btn1: '返回',
					btn2: '繼續',
				},
				invitation: '',
				// 邀請碼
				passwords: '',
				passwords2: '',
				// 密码
				// 协议点击
				endge: false,
				// 弹框显示
				file_serve: false,
				// 节流
				jlFlag: true,
				// 密码登录
				ispass: true,
				step:0,
				step1:true,
				step2:false,
				step3:false,
				step4:false,
				// 密码小眼睛
				eye: true,
				// 眼睛图片
				eye_src: "/static/image2/register/pass.png",
				// 输入框type
				type: "password",
				// 禁用
				disabled: "disabled",
				phone: "",
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
			
			this.changeCode()
			
			
		},
		components: {
			serviceAgreement
		},

		methods: {
			
			changeCode(){
				this.codeSrc=`http://localhost:6791/server/app/user/captcha?${Date.now()}`;
				// this.$http.request({
				// 	url: `app/user/captcha?${Date.now()}`,
				// 	method: 'get',
				// 	//withCredentials: true, // 允许发送Cookies
				// 	// data: {
				// 	// 	captcha: this.code
				// 	// },
				// 	dataType: 'json',
				// 	success: res => {
				// 		//console.log(res)
						
						
				// 	},
				// 	fail: () => {
				// 		console.log('服务器请求出错');
				// 	}
				// });
				
				
			},
			back() {
				if(this.step==0){history.back()}
				if(this.step==1){
					this.step1=true
					this.step2=false
					this.step3=false
					this.step4=false
					this.step=0
				}
				if(this.step==2){
					this.step1=false
					this.step2=true
					this.step3=false
					this.step4=false
					this.step=1
				}
				if(this.step==3){
					this.step1=false
					this.step2=false
					this.step3=true
					this.step4=false
					this.step=2
				}
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
				// this.step1=false
				// this.step2=true
				// this.step3=false
				// this.step4=false
				// this.step=1
				// return false
				
				// if (this.disabled == "disabled") {
				// 	return
				// };
				// if (this.phone.length < 8 || this.phone.length > 11) {
				// 	app.globalData.showToast('請輸入正確的手機號');
				// 	return
				// }
				// if(this.code.length!=6){
				// 	app.globalData.showToast("請完整輸入驗證碼");
				// 	return
				// }
				console.log(this.code)
				this.$http.request({
					url: `app/user/validateCaptcha?captcha=${this.code}`,
					method: 'post',
					//withCredentials: true,
					//credentials:'include',
					// data: {
					// 	captcha: this.code
					// },
					dataType: 'json',
					success: res => {
						console.log(res)
						this.step1=false
						this.step2=true
						this.step3=false
						this.step4=false
						this.step=1
						// if (res.data.code == 0) {
						// 	uni.navigateTo({
						// 		url: "/pages/verification-code/verification-code?phone=" + this.phone +
						// 			"&refer=" + this.invitation + "&country=" + this.country,
						// 	})
						// } else {
						// 	app.globalData.showToast("驗證碼錯誤");
						// }
					},
					fail: () => {
						console.log('服务器请求出错');
					}
				});
			},
			//重新發送
			reSendNext(){
				this.step1=false
				this.step2=false
				this.step3=true
				this.step4=false
				this.step=2
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
				
			},
			// 密码登录接口
			pass_reg_true() {
				this.step1=false
				this.step2=false
				this.step3=false
				this.step4=true
				this.step=3
				return
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
			submit(){
				this.ispass=false
				// uni.navigateTo({
				// 	url: "/pages/login/login",
				// })
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
			
			
			// 输入验证码
				codenum: function(event) {
					// console.log('输入的值',event.target.value)
					var that = this
					var code = event.target.value
					that.code = code
					if (code.length == 4) {
						this.register((res) => {
							if (res.code == 0) {
								console.log(res.data);
								that.codeMessage = "验证码正确!!!"
								app.globalData.showToast('验证码正确');
								uni.setStorageSync('user_token', res.data.user_token);
								uni.setStorageSync('type', 'true');
								uni.setStorageSync('user_id', '' + res.data.user_id);
								app.globalData.data.user_token = res.data.user_token;
								app.globalData.data.user_id = res.data.user_id;
								uni.switchTab({
									url: '/pages/index/index',
								});
								// uni.navigateBack({
								// 	delta: 9999999
								// });
							} else {
								console.log('验证码错误!!!：', that.code)
								that.codeMessage = "验证码错误!!!"
								app.globalData.showToast('验证码错误!!!');
								setTimeout(function() {
									that.code = ''
									event.target.value = ""
									that.codeMessage = "重新输入!!!"
								}, 1500)
							}
						})
					}
				},
				// 键盘隐藏后设置失去焦点
				blur: function() {
					var that = this
					that.focus = false
				},
				// 点击自定义光标显示键盘
				codefocus: function(e) {
					var that = this
					if (e == that.code.length) {
						that.focus = true
					}
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
				// 登录
				register(f) {
					let phone = this.phone;
					if (this.phone.length == 8) {
						phone = 852 + this.phone;
					}
					console.log(this.way);
					if (this.way == 'login') {
						var url = "/api/user/login_by_mobile";
					} else {
						var url = "/api/user/reg";
					}
					this.$http.request({
						url: url,
						method: 'GET',
						data: {
							mobile: phone,
							refer: this.refer,
							lang: this.lang,
							country: this.country,
							verify: this.code,
						},
						dataType: 'json',
						success: res => {
							f(res.data);
						},
						fail: err => {
							app.globalData.showToast("发送失败，请重新获取");
						}
					})
				}
			
			
			
		}
	}
</script>

<style>
	@import "./register.css"
</style>