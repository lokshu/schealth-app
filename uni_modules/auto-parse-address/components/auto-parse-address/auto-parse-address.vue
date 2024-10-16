<template>
	<view class="auto-box" :class="boxClass">
		<textarea v-model="value" class="auto-textarea" :class="areaClass" :auto-height="autoHeight"
			:placeholder="placeholder" />
		<view class=" flex align-center justify-between" style="width: 642rpx; margin: auto;">
			<view class="auto-btn "
				style="border: 1rpx solid #7E7E7E; color: #7E7E7E; display: flex;align-items: center;justify-content:center;"
				@click="clear_text">
				清除
			</view>
			<view class="auto-btn fc-fff"
				style="background: #6D14B3; display: flex;align-items: center;justify-content:center;"
				@click="autoParse()">
				識別
			</view>
		</view>
	</view>
</template>
<script>
	import AddressParse from './zh-address-parse.min.js'
	export default {
		/**
		 * autoAddressParse 自动解析地址
		 * 
		 * @description 自动解析粘贴过来的地址 本插件是二次开发为uniapp版本，参考来自 [https://github.com/ldwonday/zh-address-parse]
		 * @tutorial https://ldwonday.github.io/zh-address-parse/
		 * 
		 * @param {autoHeight}  // textarea 高度自适应, 默认值：true
		 * @param {placeholder}  // 提示文本 默认值：粘贴收货信息
		 * @param {parseType}  // 哪种方式解析，0：正则，1：树查找
		 * @param {textFilter}  // 预清洗的字段
		 * @param {nameMaxLength}  // 查找最大的中文名字长度，默认值 4\
		 * @param {boxClass} 容器类名，如果不生效 请在该类名前面加 /deep/
		 * @param {areaClass} textarea 类名，如果不生效 请在该类名前面加 /deep/
		 * @param {btnClass} 按钮类名，如果不生效 请在该类名前面加 /deep/
		 * @event {Function} $emit('result')  // 解析之后返回结果方法 result()
		 * @event {Function} autoParse 点击解析地址
		 * @param {parseResult}  // 返回值 parseResult 是一个对象，里面包含
		 * { province: '', name: '', city: '', area: '', detail: '', phone: '', postalCode: '' }
		 * */
		props: {
			autoHeight: {
				type: Boolean,
				default: true
			},
			boxClass: {
				type: String,
				default: ''
			},
			areaClass: {
				type: String,
				default: ''
			},
			btnClass: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: '示例：李四1385473822广东省深圳市罗湖区3213路xxx号'
			},
			parseType: {
				type: [Number, String],
				default: 0
			},
			textFilter: {
				type: Array,
				default () {
					return []
				}
			},
			nameMaxLength: {
				type: [Number, String],
				default: 4
			}
		},
		data() {
			return {
				value: ''
			}
		},
		methods: {
			// 清除智能地址
			clear_text() {
				this.value = '';
			},
			autoParse() {
				const len = this.value.replace(/\s+/g, "")
				if (len.length === 0) return
				const parseResult = AddressParse(this.value, this.parseType, this.textFilter)
				this.$emit('result', parseResult)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.auto-box {
		// width: 600upx;
		// padding: 30upx 30upx 0upx;
		// text-align: right;
		// box-sizing: border-box;

		.auto-textarea {
			font-size: 24rpx;
			width: 642rpx !important;
			height: 190rpx !important;
			background: #F6F6F6;
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			margin-top: 10rpx;
			background-color: #F6F6F6;
			width: 642rpx;
			margin: auto;
			margin-bottom: 24rpx;
			box-sizing: border-box;
			padding: 20rpx;

			// width: 100%;
			// text-align: left;
			// box-sizing: border-box;
			// min-height: 200upx;
			// padding: 20upx;
			// border-radius: 5upx;
			// border: 2upx solid rgb(220, 223, 230);
		}

		.auto-btn {
			width: 128rpx;
			height: 50rpx;
			font-size: 24rpx;
			background: #FFFFFF;
			border-radius: 26rpx 26rpx 26rpx 26rpx;

			&:active {
				background-color: #f3f0f0;
			}
		}
	}
</style>
