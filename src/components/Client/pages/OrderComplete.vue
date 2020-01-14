<template>
    <div>
    <div id="bg-gray">
    <loading :active.sync="isLoading"></loading>
    <BuyProgress :progess = step></BuyProgress>
    
    <div class="container mb-5">
      <div class="my-5 row justify-content-center">
        
        <div class="col-md-6">
          <i class='fas fa-shopping-bag'></i>  訂單資訊
          <table class="table my-4">
            <thead>
              <th>品名</th>
              <th>數量</th>
              <th>價格</th>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total | currency}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right">總計</td>
                <td class="text-right">{{ order.total | currency }}</td>
              </tr>
            </tfoot>
          </table>
          <i class='fas fa-user-check	'></i> 訂購人資訊
          <table class="table my-4">
          
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
                  <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
        
          <div class="text-right" v-if="order.is_paid === false">
            <button class="btn btn-info" @click="payOrder">前往付款</button>
          </div>
          <div class="text-right" v-else>
            <button class="btn btn-primary" @click="goHome">繼續購物</button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  </div>
</template>


<script>
import BuyProgress from '../BuyProgress';

  export default {
    components: {
    BuyProgress,
  },
    data() {
      return {
        isLoading: false,
        fullPage: true,
        orderId: '',
        order: {
          user: {},
        },
        step:'3'
      }
    },
    methods: {
      getOrder() {
        const vm = this;
        vm.$store.dispatch('updateLoading', true);
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
        this.$http.get(url).then(response => {
          vm.order = response.data.order;
          vm.$store.dispatch('updateLoading', false);
        });
      },
      payOrder(){ 
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
            vm.$store.dispatch('updateLoading', true);

            this.$http.post(api).then((response) => { 
                console.log(response);
                if(response.data.success){
                    vm.getOrder() //後端將is_paid轉為true
                }
                vm.$store.dispatch('updateLoading', false);
            });  
        },
      goHome() {
        this.$router.push('/product_list');
      }
    },
  
    created() {
      this.orderId = this.$route.params.orderId;
      this.getOrder();
    },
  }
</script>