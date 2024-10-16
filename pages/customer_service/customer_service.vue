<template>
	<view class="customer_service">
		<web-view :src="url_web" v-if="uer_state"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url_web: '',
				uer_state: true,
			}
		},
		onShow() {
			this.url_web = this.$customerService;
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
