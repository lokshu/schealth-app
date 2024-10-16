<template>
  <view class="tabbar">
	<uni-tabbar class="uni-tabbar-bottom">
		<div class="uni-tabbar" style="background-color: white; backdrop-filter: none;">
			<div class="uni-tabbar-border"></div>
			<div class="uni-tabbar__item" v-for="(item, index) in list" :key="index">
				<div class="uni-tabbar__bd"  @click="linkSwitch(item.pagePath)">
					<div class="uni-tabbar__icon" style="width: 36px; height: 36px;">
						<img :src="item.iconPath">
					</div>
					<div class="uni-tabbar__label"
					style="color: rgb(191, 191, 191); font-size: 12px; line-height: normal; margin-top: 3px;"
					> {{ item.text }} </div>	
				</div>
			</div>
		</div>
	</uni-tabbar>
    
  </view>
</template>
 
<script>
export default {
  data() {
    return {
      activeIndex: 0,
	  list: [{
	  		"pagePath": "/pages/index/index",
	  		"iconPath": "static/images/home.png",
	  		"selectedIconPath": "static/images/home_active.png",
	  		"text": "主頁"
	  	},
	  	{
	  		"pagePath": "/pages/health/health",
	  		"iconPath": "static/images/health.png",
	  		"selectedIconPath": "static/images/health_active.png",
	  		"text": "我的健康"
	  	},
	  	{
	  		"pagePath": "/pages/appointment/appointment",
	  		"iconPath": "static/images/appointment.png",
	  		"selectedIconPath": "static/images/appointment_active.png",
	  		"text": "我的預約"
	  	},
	  	{
	  		"pagePath": "/pages/user/user",
	  		"iconPath": "static/images/user.png",
	  		"selectedIconPath": "static/images/user_active.png",
	  		"text": "我的賬號"
	  	}
	  ]
    };
  },
  methods: {
    linkSwitch(pagePath) {
		console.log(pagePath)
      uni.switchTab({
      	url:pagePath
      })
    },
  },
};
</script>
 
<style lang="scss">
uni-tabbar {
    display: block;
    box-sizing: border-box;
    width: 100%;
    z-index: 998
}

uni-tabbar .uni-tabbar {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    z-index: 998;
    box-sizing: border-box
}

uni-tabbar.uni-tabbar-bottom,uni-tabbar.uni-tabbar-bottom .uni-tabbar,uni-tabbar.uni-tabbar-top,uni-tabbar.uni-tabbar-top .uni-tabbar {
    position: fixed;
    left: var(--window-left);
    right: var(--window-right)
}

.uni-app--showlayout+uni-tabbar.uni-tabbar-bottom,.uni-app--showlayout+uni-tabbar.uni-tabbar-bottom .uni-tabbar,.uni-app--showlayout+uni-tabbar.uni-tabbar-top,.uni-app--showlayout+uni-tabbar.uni-tabbar-top .uni-tabbar {
    left: var(--window-margin);
    right: var(--window-margin)
}

uni-tabbar.uni-tabbar-bottom .uni-tabbar {
    bottom: 0;
    padding-bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom)
}

uni-tabbar .uni-tabbar~.uni-placeholder {
    width: 100%;
    margin-bottom: 0;
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom)
}

uni-tabbar .uni-tabbar * {
    box-sizing: border-box
}

uni-tabbar .uni-tabbar__item {
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    font-size: 0;
    text-align: center;
    -webkit-tap-highlight-color: rgba(0,0,0,0)
}

uni-tabbar .uni-tabbar__bd,uni-tabbar .uni-tabbar__item {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal
}

uni-tabbar .uni-tabbar__bd {
    position: relative;
    -webkit-flex-direction: column;
    flex-direction: column;
    cursor: pointer
}

uni-tabbar .uni-tabbar__icon {
    position: relative;
    display: inline-block;
    margin-top: 5px
}

uni-tabbar .uni-tabbar__icon.uni-tabbar__icon__diff {
    margin-top: 0;
    width: 34px;
    height: 34px
}

uni-tabbar .uni-tabbar__icon img {
    width: 100%;
    height: 100%
}

uni-tabbar .uni-tabbar__iconfont {
    font-family: UniTabbarIconFont
}

uni-tabbar .uni-tabbar__label {
    position: relative;
    text-align: center;
    font-size: 10px
}

uni-tabbar .uni-tabbar-border {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5)
}

uni-tabbar .uni-tabbar__reddot {
    position: absolute;
    top: 2px;
    right: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #f43530;
    color: #fff;
    -webkit-transform: translate(40%);
    transform: translate(40%)
}

uni-tabbar .uni-tabbar__badge {
    width: auto;
    height: 16px;
    line-height: 16px;
    border-radius: 16px;
    min-width: 16px;
    padding: 0 2px;
    font-size: 12px;
    text-align: center;
    white-space: nowrap
}

uni-tabbar .uni-tabbar__mid {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    background-size: 100% 100%
}

uni-content,uni-tabbar .uni-tabbar__mid {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex
}

</style>