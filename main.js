import Vue from 'vue';
import App from './App';

// 全局mixins
import base from './common/js/common/base';
// import share from './common/js/common/share';
import utils from "./common/utils.js";
import uView from "./uni_modules/uview-ui"
// import './uni_modules/uview-ui/theme.scss'
import VueI18n from 'vue-i18n';
import Md5 from "js-md5";
import messages from './common/js/i18n/index.js'
// import i18n from "./common/js/i18n/i18n.js";
import http from "./static/js/http.js"
Vue.prototype.$http = http
// Vue.use(i18n);
Vue.prototype.$md5 = Md5
Vue.use(VueI18n)
Vue.use(uView)

let i18nConfig = {
	locale: uni.getStorageSync('lang') || 'cht',
	messages
}
// if (localStorage.lang == "null") {
// 	localStorage.lang = "cht"
// }
if (!uni.getStorageSync('lang')) {
	uni.setStorageSync('lang', 'cht')
} else {
	// console.log("有")
}
let customerService = 'https://www.soboten.com/chat/pc/v6/index.html?sysnum=514682e8749f44fcacd23960ad981fc4';
const i18n = new VueI18n(i18nConfig)
Vue.prototype.$customerService = customerService;
Vue.prototype.$t = (path, values, describe) => {
	// return describe || values || path

	if (describe) {
		return i18n.t(path, values);
	} else {
		return i18n.t(path);
	}
};


// 调用setConfig方法，方法内部会进行对象属性深度合并，可以放心嵌套配置
// 需要在Vue.use(uView)之后执行
uni.$u.setConfig({
	// 修改$u.config对象的属性
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
		unit: 'rpx'
	},
	// 修改$u.props对象的属性
	props: {
		// 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
		radio: {
			size: 15
		}
		// 其他组件属性配置
		// ......
	}
})

Vue.prototype.$formatTime = (str = store.state.system.time_format, time) => {
	let t = time ? new Date(time) : new Date()
	let yyyy = t.getFullYear(),
		mm = (t.getMonth() + 1) > 9 ? (t.getMonth() + 1) : '0' + (t.getMonth() + 1),
		dd = t.getDate() > 9 ? t.getDate() : '0' + t.getDate(),
		HH = t.getHours() > 9 ? t.getHours() : '0' + t.getHours(),
		MM = t.getMinutes() > 9 ? t.getMinutes() : '0' + t.getMinutes(),
		SS = t.getSeconds() > 9 ? t.getSeconds() : '0' + t.getSeconds();

	if (isNaN(yyyy)) {
		return time
	}

	return str
		.replace('yyyy', yyyy)
		.replace('mm', mm)
		.replace('dd', dd)
		.replace('HH', HH)
		.replace('MM', MM)
		.replace('SS', SS)
}

Vue.prototype.$back = utils.back;

Vue.mixin(base);
// Vue.mixin(share);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
	...App,
	i18n,
});
app.$mount();
