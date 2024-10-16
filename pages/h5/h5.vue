<template>
	<view class="Alipay">
		<web-view :src="urls"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				urls: '',
			}
		},
		onLoad(res) {
			this.urls = res.url
			console.log(res.url)
		},
		onShow() {

		},
	}
</script>

<style>

</style>