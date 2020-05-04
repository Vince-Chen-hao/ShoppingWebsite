import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      //輸入錯誤回傳頁面
      path: "*",
      redirect: "/login"
    },

    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Back/Login.vue")
    },

    {
      path: "/admin",
      name: "Dashboard",
      component: () => import("@/views/Back/Dashboard.vue"),
      children: [
        {
          path: "products",
          name: "products",
          component: () => import("@/views/Back/Products.vue"),
          meta: { requiresAuth: true } //導航守衛
        },

        {
          path: "orders",
          name: "orders",
          component: () => import("@/views/Back/Order.vue")
          //meta: { requiresAuth: true },
        },

        {
          path: "coupons",
          name: "coupons",
          component: () => import("@/views/Back/Coupon.vue")
          //meta: { requiresAuth: true },
        }
      ]
    },

    {
      path: "/",
      name: "Layout",
      component: () => import("@/views/Front/Layout.vue"),
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("@/views/Front/Home.vue")
        },

        {
          path: "product_list",
          name: "ProductList",
          component: () => import("@/views/Front/ProductList.vue"),
          props: route => ({ category: route.query.category })
        },

        {
          path: "product_detail/:MyproductId", //productlist的參數ID
          name: "ProductDetail",
          component: () => import("@/views/Front/ProductDetail.vue")
        },

        {
          path: "coupon_page",
          name: "CouponPage",
          component: () => import("@/views/Front/Coupon.vue")
        },

        {
          path: "contact_page",
          name: "ContactPage",
          component: () => import("@/views/Front/Contact.vue")
        },

        {
          path: "order_check",
          name: "OrderCheck",
          component: () => import("@/views/Front/OrderCheck.vue")
        },

        {
          path: "client_info",
          name: "ClientInfo",
          component: () => import("@/views/Front/ClientInfo.vue")
        },

        {
          path: "order_complete/:orderId",
          name: "OrderComplete",
          component: () => import("@/views/Front/OrderComplete.vue")
        }
      ]
    }
  ]
});
