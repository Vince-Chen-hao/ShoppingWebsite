import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import cartsModel from './getdata';


Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  state: {
    isLoading: false,
  },
  //操作行為，適用非同步行為
  //status 是外部傳進來的資料稱為payload
  //context自定義變數，當作內部代數使用
  actions:{
    updateLoading(context, status) {
        context.commit('LOADING', status);
      },
    },
  //操作狀態，適用於同步行為
  //使用大寫
  //這個區間裡(state是上面data的資料，status是從外部傳進來的payload參數))
  mutations:{
    LOADING(state, status) {
        state.isLoading = status;
      },
  },
  modules:{
    cartsModel,
  },

  getters: {
    isLoading: state => state.isLoading,

  },
  
});



