<template>
	<view class="bodys">
		<view class=" box ">
			<view class=" title text-center mt">{{data_num.title}}</view>
			<view class="inner ">{{data_num.backmsg1}}<text
					class="fc-000">{{data_num.backmsg2}}</text>{{data_num.backmsg3}}
			</view>
			<view class="btn text-size-md flex justify-between text-center">
				<view class=" option1" @click="noagree(true)">{{data_num.btn1}}</view>
				<view class=" option2" @click="noagree(false)">{{data_num.btn2}}</view>

			</view>

		</view>
	</view>
</template>

<script>
	export default {
		name: "service-agreement",
		props: ["data_num"],
		data() {
			return {
				endge: true,

			};
		},
		methods: {
			noagree(a) {
				//向父组件传值
				this.$emit("senddata", a);

			}
		}
	}
</script>

<style scoped>
	.bodys {
		width: 750rpx;
		max-width: 800px;
		height: 100%;
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 0);
		background: rgba(0, 0, 0, .32);
		z-index: 10000;
	}

	.box {
		width: 570rpx;
		position: fixed;
		background: #FFFFFF;
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-image: url(@/static/image2/register/background.png);
		background-size: 100% 100%;

	}

	.title {
		height: 44rpx;
		font-size: 28rpx;
		font-family: 蘋方-繁-Medium, 蘋方-繁;
		font-weight: 500;
		color: #000000;
		line-height: 32rpx;
		margin: 42rpx 0 38rpx;

	}

	.inner {
		width: 480rpx;
		font-size: 24rpx;
		color: #7E7E7E;
		line-height: 40rpx;
		margin: auto;
		text-align: center;
	}

	.btn {
		width: 474rpx;
		height: 90rpx;
		margin: 70rpx auto 40rpx;

	}

	.option1 {
		width: 216rpx;
		border: 2rpx solid #6D14B3;
		border-radius: 24rpx;
		line-height: 90rpx;
		box-sizing: border-box;
	}

	.option2 {
		width: 216rpx;
		background: #6D14B3;
		color: white;
		border-radius: 24rpx;
		line-height: 90rpx;
		box-sizing: border-box;
	}
</style>
