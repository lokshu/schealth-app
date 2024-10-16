import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

//国际化
const i18n = new VueI18n({
    locale: "en",
    messages: {
        en: {},
    },
    silentTranslationWarn: process.env.NODE_ENV === 'production' || true
});

Vue.prototype.$t = (path, values, describe) => {
    // return describe || values || path

    if (describe) {
        return i18n.t(path, values);
    } else {
        return i18n.t(path);
    }
};

export default i18n;