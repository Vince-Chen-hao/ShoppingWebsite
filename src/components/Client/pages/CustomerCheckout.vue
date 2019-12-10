<template>
    <div>
        <div class="my-5 row justify-content-center">
            <form class="col-md-6" @submit.prevent="payOrder">
                <table class="table">
                <thead>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                </thead>
                <tbody>
                    <tr v-for="item in order.products" :key="item.id">
                    <td class="align-middle">{{ item.product.title }}</td>
                    <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                    <td colspan="2" class="text-right">總計</td>
                    <td class="text-right">{{ order.total | currency}}</td>
                    </tr>
                </tfoot>
                </table>

                <table class="table">
                <tbody>
                    <tr>
                    <th width="100">Email</th>
                    <td>{{ order.user.email }}</td>
                    </tr>
                    <tr>
                    <th>姓名</th>
                    <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                    <th>收件人電話</th>
                    <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                    <th>收件人地址</th>
                    <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                    <th>付款狀態</th>
                    <td>
                        <span v-if="!order.is_paid">尚未付款</span>
                        <span v-else class="text-success">付款完成</span>
                    </td>
                    </tr>
                </tbody>
                </table>
                <div class="text-right" v-if="order.is_paid === false">
                <button class="btn btn-danger">確認付款去</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            order:{
                user:{}, //要隨著後端的資料擺放位置來分層取得
            },
            orderId:'',
        };
    },
    methods:{
        //取得單一訂單資訊
        getOrder(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
            vm.isLoading = true;

            this.$http.get(api).then((response) => { 
                vm.order = response.data.order;
                console.log(response);
                vm.isLoading = false;
            });  
        },
        //付款完成步驟
        payOrder(){ 
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
            vm.isLoading = true;

            this.$http.post(api).then((response) => { 
                console.log(response);
                if(response.data.success){
                    vm.getOrder() //一旦點擊，後端系統便會將is_paid轉為true
                }
                vm.isLoading = false;
            });  
        },

    },
    
    created(){
        this.orderId = this.$route.params.orderId; //匯入參數公式之一， oderId必須要對應router裡的path路徑名稱
        console.log(this.orderId);
        this.getOrder();

    }
}
</script>
