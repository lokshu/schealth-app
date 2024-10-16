<template>
	<view class="language">
		<view class="bg-view public-top" style="max-width: 800px;">
			<view class="flex align-center justify-between" style="padding: 20rpx 15rpx;">
				<view class="" style="width: 20%;">
					<uni-icons type="back" class="top-back-btn" size="" style="font-size: 45rpx; margin-right: 20rpx; margin-top: -5rpx;"
						@click="$back"></uni-icons>
				</view>
				<view class="text-center font-bold fc-000" style="font-size: 29rpx; width: 60%;">
					{{ $t("LANGUAGE", "修改語言") }}
				</view>
				<view class="" style="width: 20%;"></view>
			</view>
		</view>
		<view class="" style="width: 94%; margin: 100rpx auto 0;">
			<block>
				<view class="" style="color: #000; margin-bottom: 30rpx;" v-for="(item, index) in langs" :key="index"
					@click="clickLang(item, index)">
					<u-button style="border-radius: 20rpx; height: 90rpx; font-size: 28rpx;"
						:class="[{'bg-6D14B3' : activeLang == item.lang}]">
						<text class="" :class="[{'fc-fff' : activeLang == item.lang}]">{{ item.name }}</text>
					</u-button>
				</view>
			</block>
		</view>
		<!-- <view class="text-center">
			{{ $t("NEED_LOGIN") }}
		</view> -->
		<!-- <loading v-if="!loading"></loading> -->
	</view>
</template>

<script>
	const app = getApp();
	import Loading from '@/components/loading/loading.vue'
	export default {
		data() {
			return {
				langs: [{
						lang: 'chs',
						name: '中文简体'
					},
					{
						lang: 'cht',
						name: '中文繁體'
					},
					// {
					// 	lang: 'en',
					// 	name: 'English'
					// }
				],
				activeLang: uni.getStorageSync("lang"),
				loading: app.globalData.data.loading,
			}
		},
		onShow() {
			// this.activeLang = uni.getStorageSync('lang'); // 当前语言
			// // 用于监听应用语言切换，也可吧切换后的值存入本地，方便其他地方调用
			// console.log(app.globalData.data.loading)
		},
		methods: {
			clickLang(item, index) {
				if (this.activeLang != item.lang) {
					this.activeLang = item.lang;
					uni.showLoading({
						title: this.$t('loading', '加载中...')
					});
					this.$http.request({
						url: "/api/lang/" + this.activeLang,
						method: 'GET',
						data: {},
						dataType: 'json',
						success: res => {
							if (res.statusCode === 200 && res.data.code == 0) {
								this.setEdit(this.activeLang)
								uni.setStorageSync("lang", this.activeLang);
								uni.setStorageSync("lang_list", JSON.stringify(res.data.data))
								this.$i18n.locale = this.activeLang;
								// this.$i18n.mergeLocaleMessage(this.activeLang, res.data.data);
								this.$i18n.mergeLocaleMessage(uni.getStorageSync('lang'), JSON.parse(uni.getStorageSync('lang_list')))
								uni.setStorageSync("lang_select", 1)
								setTimeout(() => {
									app.globalData.showToast(this.$t("Switch_succeeded_S", "切换成功"));
								})
								setTimeout(() => {
									this.$back()
									// this.$router.go(-1)

								}, 500)
								// setTimeout(() => {
								// 	this.$back()
								// }, 700)
							} else {
								app.globalData.showToast(res.data.message)
							}
						},
						fail: () => {

						}
					})
				}
			},
			setEdit(lang) {
				this.$http.request({
					url: "/api/user/edit",
					method: 'GET',
					data: {
						field: 'lang',
						value: lang
					},
					dataType: 'json',
					success: res => {
						// if (res.statusCode === 200 && res.data.code == 0) {

						// } else {
						// 	app.globalData.showToast(res.data.message)
						// }
					},
					fail: () => {

					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.language-page {
		min-height: 100vh;
	}
</style>
