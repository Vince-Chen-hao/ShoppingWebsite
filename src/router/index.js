import Vue from 'vue'
import VueRouter from 'vue-router'
//官方元件

//pages
import Login from '@/components/Login';

//admin
import Dashboard from '@/components/Admin/Dashboard';
import Products from '@/components/Admin/pages/Products';
import Order from '@/components/Admin/pages/Order';
import Coupon from '@/components/Admin/pages/Coupon';


//client
import Layout from '@/components/Client/Layout';
import Home from '@/components/Client/Home';
import ProductList from '@/components/Client/pages/ProductList';
import ProductDetail from '@/components/Client/pages/ProductDetail';
import OrderCheck from '@/components/Client/pages/OrderCheck';
import OrderClientData from '@/components/Client/pages/OrderClientData';
import OrderComplete from '@/components/Client/pages/OrderComplete';



Vue.use(VueRouter);
//啟用VueRouter

export default new VueRouter({
    routes:[

        { //輸入錯誤網址會回到login頁
            path:'*',
            redirect:'login',
        },
    
        {
            path:'/login', 
            name:'Login', 
            component: Login, 
        },


        {
            path:'/admin',
            name:'Dashboard',
            component: Dashboard,
            children:[
                {   path:'products', 
                    name:'products',
                    component: Products,
                    meta: { requiresAuth: true }, //導航守衛
                },

                {   path:'orders', 
                    name:'orders',
                    component: Order,
                    meta: { requiresAuth: true },
                },

                {   path:'coupons', 
                    name:'coupons',
                    component: Coupon,
                    meta: { requiresAuth: true },
                },
            ]

            
        },

        {
            path:'/',
            name:'Layout',
            component: Layout,
            children:[
                {   path:'/', 
                    name:'Home',
                    component: Home,
                },

                 {   path:'/product_list',
                    name:'productList',
                    component: ProductList,
                },

                {   path:'/product_detail',
                    name:'PorductDetail',
                    component: ProductDetail,
                },

                {   path:'/order_check',
                    name:'OrderCheck',
                    component: OrderCheck,
                },

                {   path:'/order_clientdata',
                    name:'OrderClientData',
                    component: OrderClientData,
                },

                {   path:'/order_complete',
                    name:'OrderComplete',
                    component: OrderComplete,
                },

            ]

            
        },
    ],
});