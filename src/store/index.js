import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";

import cartsModel from "./getdata";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false
    // products: [],
    // filterProducts: [],
    // pagination: {},
  },
  //操作行為，適用非同步行為
  //status 是外部傳進來的資料稱為payload
  //context自定義變數，當作內部代數使用
  actions: {
    updateLoading(context, status) {
      context.commit("LOADING", status);
    }
    // getProducts(context, page) {
    //     const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
    //     context.commit('LOADING', true);
    //     axios.get(api).then(response => {
    //         context.commit('PRODUCTS', response.data.products);
    //         context.commit('FILTERPRODUCTS', response.data.products);
    //         context.commit('PAGINATION', response.data.pagination);
    //         context.commit('LOADING', false);
    //     });
    // },
  },
  //操作狀態，適用於同步行為
  //使用大寫
  //這個區間裡(state是上面data的資料，status是從外部傳進來的payload參數))
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    }
    // PRODUCTS(state, payload) {
    //     state.products = payload;
    // },
    // FILTERPRODUCTS(state, payload) {
    //     state.filterProducts = payload;
    // },
    // PAGINATION(state, payload) {
    //     state.pagination = payload;
    // },
  },
  modules: {
    cartsModel
  },

  getters: {
    isLoading: state => state.isLoading
  }
});
