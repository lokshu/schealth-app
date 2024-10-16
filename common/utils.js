module.exports = {
	back(){
		const pages = getCurrentPages()//获取页面栈
		if (pages.length === 1) {//如果只有一个调用原生js
			history.back()
		} else {
			uni.navigateBack({
				delta: 1,
			})
		}
	}
}
