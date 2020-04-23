import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vuex from 'vuex'
//區隔第三方套件及自建立


import 'bootstrap';
//下方為loading效果
import Loading from 'vue-loading-overlay'; //瀏覽樣式
import 'vue-loading-overlay/dist/vue-loading.css'; //瀏覽的ccs樣式
import clipboard from 'clipboard'; //按鈕複製功能
import animate from 'animate.css' //css動畫效果




import './bus'; //將bus.vue直接掛在Vue主元件的下面

import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

import VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n';

import store from './store'






Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.config.productionTip = false

Vue.prototype.clipboard = clipboard;


axios.defaults.withCredentials = true; //將API撈取資料cookie也備份一份在記憶體裡，須啟動axios功能
Vue.component('Loading', Loading); //全域啟用瀏覽中loading的樣式
Vue.filter('currency', currencyFilter); //全域啟用瀏覽中的樣式
Vue.filter('date', dateFilter);
Vue.use(VueI18n);
Vue.use(VueAwesomeSwiper);
Vue.use(animate);


const i18n = new VueI18n({
    locale: 'zhTW'
})
Vue.use(VeeValidate, {
    i18n,
    dictionary: {
        zhTW
    }
});


/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
    router,
    store,
    i18n,
});


//導航守衛//

router.beforeEach((to, from, next) => {

    if (to.meta.requiresAuth) { //需審核的頁面放置在需驗證的vue頁面，並運行下方判定公式
        const api = `${process.env.APIPATH}/api/user/check`; //依登入api說明新增(左：路徑，右：API功能) 有成功到這一層嗎
        axios.post(api).then((response) => { //因執行環境在router下，而非vue元件，因此http需替換為axios
            console.log(response.data);
            if (response.data.success) {
                next();
            } else {
                next({
                    path: '/login',

                });
            }
        });
    } else {
        next();
    }
});