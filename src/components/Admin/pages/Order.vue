<template>
    <div>
        <Loading :active.sync="isLoading"></Loading>
        <table class="table mt-4">
            <thead>
                <tr>
                    <td width="120">購買時間</td>
                    <td width="120">Email</td> <!-- 給較多空間 -->
                    <td width="120">購買款項</td>
                    <td width="120">應付金額</td>
                    <td width="80">是否付款</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, key) in sortOrder" :key="key"
                    :class="{'text-secondary': !item.is_paid}">
                    <td>{{ item.create_at | date }}</td>
                    <td><span v-text="item.user.email" v-if="item.user"></span></td>
                    <td>
                        <ul class="list-unstyled">
                            <li v-for="(product, i) in item.products" :key="i">
                                {{ product.product.title }} 數量：{{ product.qty }}
                                {{ product.product.unit }}
                            </li>
                        </ul>
                     </td>
                    <td class="text-center">
                        {{item.total| currency}}
                    </td>
                    <td>
                        <span v-if="item.is_paid" class="text-success">付款</span>
                        <span v-else class="text-muted" >未付款</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <Pagination :pageProps="pagination" @pagenum_emit="getOrders"></Pagination>
    </div>
</template>


<script>
import Pagination from '@/components/Pagination';


export default {
    components: {
    Pagination,
    },
    
    data(){
        return{
            orders:[],
            isNew: false,
            pagination: {},
            isLoading: false,
        };
    },
    

    methods:{
        getOrders(page = 1){ //ES6預設值，如無代數值便會使用原先1，有參數則使用參數數值
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
            const vm = this;
            vm.isLoading = true;

            this.$http.get(api, vm.tempProduct).then((response) => { 
                console.log(response.data);
                vm.orders = response.data.orders //將取得資料的products項目匯入data的空陣列裡
                vm.pagination = response.data.pagination;
                vm.isLoading = false;           
            }); 
            
        },
    },
    computed: {
        sortOrder() {
        const vm = this;
        let newOrder = [];
        if (vm.orders.length) {
            newOrder = vm.orders.sort((a, b) => {
            const aIsPaid = a.is_paid ? 1 : 0;
            const bIsPaid = b.is_paid ? 1 : 0;
            return bIsPaid - aIsPaid;
            });
        }
        return newOrder;
        },
    },

    created(){ 
        this.getOrders();
        console.log(process.env.APIPATH);
    },
};
</script>