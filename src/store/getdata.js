import axios from "axios";

export default {
  //namespaced: true, //轉換為區域變數
  state: {
    products: [],
    pagination: {},
    cart: {},
    total: 0,
    cartNum: 0
  },

  actions: {
    getProducts(context, page = 1) {
      //ES6預設值，無代數值便套用page1，有代參數則套入參數數值
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      context.commit("LOADING", true);
      axios.get(api).then(response => {
        context.commit("PRODUCTS", response.data.products);
        context.commit("LOADING", false);
        context.commit("PAGINATION", response.data.pagination);
      });
    },

    getCart(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit("LOADING", true);
      axios.get(api).then(response => {
        context.commit("CART", response.data.data);
        context.commit("TOTAL", response.data.data.total);
        context.commit("CARTNUM", response.data.data.carts.length);
        context.commit("LOADING", false);
      });
    }
  },

  mutations: {
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
    CART(state, payload) {
      state.cart = payload;
    },
    TOTAL(state, payload) {
      state.total = payload;
    },
    CARTNUM(state, payload) {
      state.cartNum = payload;
    }
  },

  getters: {
    products: state => state.products,
    pagination: state => state.pagination,
    cart: state => state.cart,
    total: state => state.total,
    cartNum: state => state.cartNum
  }
};
