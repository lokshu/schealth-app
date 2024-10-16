import Vue from 'vue';
import App from './App';
import base from './common/js/common/base';
import utils from "./common/utils.js";
import uView from "./uni_modules/uview-ui";
import VueI18n from 'vue-i18n';
import Md5 from "js-md5";
import messages from './common/js/i18n/index.js';
import http from "./static/js/http.js";

Vue.prototype.$http = http;
Vue.prototype.$md5 = Md5;
Vue.use(VueI18n);
Vue.use(uView);

let i18nConfig = {
	locale: uni.getStorageSync('lang') || 'cht',
	messages
};

if (!uni.getStorageSync('lang')) {
	uni.setStorageSync('lang', 'cht');
}

let customerService = 'https://www.soboten.com/chat/pc/v6/index.html?sysnum=514682e8749f44fcacd23960ad981fc4';
const i18n = new VueI18n(i18nConfig);
Vue.prototype.$customerService = customerService;
Vue.prototype.$t = (path, values, describe) => {
	if (describe) {
		return i18n.t(path, values);
	} else {
		return i18n.t(path);
	}
};

uni.$u.setConfig({
	config: {
		unit: 'rpx'
	},
	props: {
		radio: {
			size: 15
		}
	}
});

Vue.prototype.$formatTime = (str = store.state.system.time_format, time) => {
	let t = time ? new Date(time) : new Date();
	let yyyy = t.getFullYear(),
		mm = (t.getMonth() + 1) > 9 ? (t.getMonth() + 1) : '0' + (t.getMonth() + 1),
		dd = t.getDate() > 9 ? t.getDate() : '0' + t.getDate(),
		HH = t.getHours() > 9 ? t.getHours() : '0' + t.getHours(),
		MM = t.getMinutes() > 9 ? t.getMinutes() : '0' + t.getMinutes(),
		SS = t.getSeconds() > 9 ? t.getSeconds() : '0' + t.getSeconds();

	if (isNaN(yyyy)) {
		return time;
	}

	return str
		.replace('yyyy', yyyy)
		.replace('mm', mm)
		.replace('dd', dd)
		.replace('HH', HH)
		.replace('MM', MM)
		.replace('SS', SS);
};

Vue.prototype.$back = utils.back;

Vue.mixin(base);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
	...App,
	i18n,
});
app.$mount();
