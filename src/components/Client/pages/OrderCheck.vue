<template>
  <div>
    <BuyProgress :progess = step></BuyProgress> 
    <!-- step1 -->
    <div class="container mb-4">
      <table class="table table-sm">
        <thead class="mb-4">
          <tr>
            <th class="text-center">商品資訊</th>
            <th width="50"
                class="text-center">數量</th>
            <th width="100"
                class="text-right">單價</th>
            <th width="100"
                class="text-right">折扣價</th>
            <th width="100"
                class="text-right">小計</th>
            <th width="100"
                class="text-center">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cart.carts"
              :key="index">
            <td>
              <div class="d-flex">
                <div class="order-img mr-3"
                     :style="{backgroundImage:`url(${item.product.imageUrl})`}">
                </div>
                <div>
                  {{item.product.title}}
                </div>
              </div>
            </td>
            <td class="align-middle text-center"
                style="font-size:14px">
              {{item.qty}}/{{item.product.unit}}</td>
            <td class="align-middle text-right"
                style="font-size:14px">
              {{item.product.origin_price | currency}}</td>
            <td class="align-middle text-right"
                style="font-size:14px">
              {{item.product.price | currency}}
            </td>
            <td class="align-middle text-right"
                style="font-size:14px">
              {{item.total | currency}}
            </td>

            <td class="align-middle text-center">
                <a href="#" class="text-danger"
                @click.prevent="removeCart(item.id)">
                <i class="fas fa-trash-alt"></i>              
                </a>
            </td>
          </tr>
        </tbody>
      </table>
      <hr>
      <div class="container mb-4">
       <div class="row">
        <div class="col-md-8">
          <div class="alert alert-warning">
            輸入「coupon007」，享8折優惠
          </div>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="輸入優惠碼"
            v-model="coupon_code">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary"
                      @click.prevent="addCouponCode">套用優惠券</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <table class="table order-table ">
            <tbody>
              <tr>
                <td>總金額</td>
                <td class="text-right">{{cart.total | currency}}</td>
              </tr>
              <tr>
                <td>優惠折抵</td>
                <td class="text-right">-{{cart.total - cart.final_total | currency}}</td>
              </tr>
              <tr>
                <td>應付金額</td>
                <td class="text-right text-success">{{cart.final_total | currency}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col">
          <div class="d-flex mt-2">
            <router-link to="/product_list"
            class="btn btn-outline-info mr-auto">返回購物</router-link>
            <router-link to="/client_info" class="btn btn-outline-primary">下一步</router-link>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import BuyProgress from '../BuyProgress';
import { mapGetters} from 'vuex';


export default {
    components: {
    BuyProgress,
  },
    data() {
      return {
        //cart: {},
        isLoading: false,
        coupon_code: '',
        step: '1',
      };
    },
    methods: {
      getCart() {
        this.$store.dispatch('getCart');    
      },
      removeCart(id) {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
        const vm = this;
        vm.$store.dispatch('updateLoading', true);
        this.$http.delete(api).then((response) => {
            this.$bus.$emit('message:push',response.data.message,'danger')
            vm.$store.dispatch('updateLoading', false);
            this.getCart();
        });
      },
      addCouponCode() {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
        const vm = this;
        vm.$store.dispatch('updateLoading', true);
        let couponCode = {
          data: {
            code: vm.coupon_code
          }
        };
        this.$http.post(api, couponCode).then((response) => {
          console.log(response.data.success);
          if (response.data.success == true) {
            this.$bus.$emit('message:push',response.data.message,'success')

          } else if (response.data.success == false) {
            this.$bus.$emit('message:push',response.data.message,'danger')
          }
          vm.$store.dispatch('updateLoading', false);
          this.getCart();
        });
      },
      goCheckout() {
        this.$router.push('/customer_order')
      },
    },
    filters: {
      NumCeiling(num) {
        return Math.ceil(num);
      },
    },

    computed:{
      ...mapGetters(['cart'])
    },
    created() {
      this.getCart();
    },
  }
</script>

<style lang="scss" scoped>
.order-img {
  background-position: center center;
  background-size: cover;
  width: 100px;
  height: 100px;
}
.order-table td {
  border: 0;
}
</style>