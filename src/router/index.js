import Vue from 'vue'
import VueRouter from 'vue-router'
//上方為官方元件
import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import Order from '@/components/pages/Order';
import Coupon from '@/components/pages/Coupon';
import CustomerOrder from '@/components/pages/CustomerOrder';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
//自訂的分頁元件



Vue.use(VueRouter);
//啟用VueRouter

export default new VueRouter({
    routes:[

        { //當隨便輸入錯誤網址時，會導入至login頁面
            path:'*',
            redirect:'login',
        },
    
        {
            path:'/login', //指定路徑
            name:'Login', //元件名稱
            component: Login, //對應import元件名稱
        },
        {
            path:'/admin',
            name:'Dashboard',
            component: Dashboard,
            children:[
                {   path:'products', //巢狀http://admin/products
                    name:'products',
                    component: Products,
                    meta: { requiresAuth: true }, //執行導航守衛以判定是否已登入
                },

                {   path:'orders', //巢狀http://admin/orders
                    name:'orders',
                    component: Order,
                    meta: { requiresAuth: true },
                },

                {   path:'coupons', //巢狀http://admin/coupons
                    name:'coupons',
                    component: Coupon,
                    meta: { requiresAuth: true },
                },
            ]

            
        },

        {
            path:'/',
            name:'Dashboard',
            component: Dashboard,
            children:[
                {   path:'customer_order', //巢狀http://admin/products //路徑建議小寫
                    name:'CustomerOrder',
                    component: CustomerOrder,
                },

                {   path:'customer_checkout/:orderId', //巢狀http://admin/products //路徑建議小寫
                    name:'CustomerCheckout',
                    component: CustomerCheckout,
                },

            ]

            
        },
    ],
});