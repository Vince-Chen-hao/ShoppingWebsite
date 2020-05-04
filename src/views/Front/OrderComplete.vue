<template>
  <div>
    <div id="bg-gray">
      <BuyProgress :progress="step"></BuyProgress>

      <div class="container mb-5">
        <div class="my-5 row justify-content-center">
          <div class="col-md-6">
            <div class="h5 my-4"><i class="fas fa-shopping-bag "></i> 訂單資訊</div>
            <table class="table my-4">
              <thead class="table-warning">
                <th>品名</th>
                <th>數量</th>
                <th>價格</th>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                  <td class="align-middle text-right">
                    {{ item.final_total | currency }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" class="text-right">總計</td>
                  <td class="text-right">{{ order.total | currency }}</td>
                </tr>
              </tfoot>
            </table>
            <div class="clientinfo " v-if="order.is_paid === false">
              <div class="h5 pt-4 "><i class="fas fa-user-check"></i> 訂購人資訊</div>
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
            </div>

            <div class="payfinish" v-else>
              <img class="paid-img img-fluid" src="../../assets/images/paid01.jpg" alt="" />
              <div class=" py-4 my-4 text-dark text-center ">
                <h4>～～～恭喜您完成購買～～～</h4>
                <p class="mt-3" style="font-size:15px">
                  <i class="mr-2 fas fa-bullhorn"></i> 全館 7
                  折優惠倒數計時，多款優選商品等你帶回家，歡迎再次光臨！！
                </p>
              </div>
            </div>

            <div class="text-right" v-if="order.is_paid === false">
              <button class="btn btn-secondary" @click="payOrder">
                前往付款
              </button>
            </div>
            <div class="paid d-flex justify-content-between" v-else>
              <a href="#" class="btn btn-outline-info" @click="linkHome">
                回到大廳
              </a>

              <router-link class="btn btn-secondary" to="/product_list">繼續逛逛</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BuyProgress from "@/components/Front/BuyProgress.vue";

export default {
  components: {
    BuyProgress
  },
  data() {
    return {
      fullPage: true,
      orderId: "",
      order: {
        user: {}
      },
      step: "3"
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      vm.$store.dispatch("updateLoading", true);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
      vm.$http.get(url).then(response => {
        vm.order = response.data.order;
        vm.$store.dispatch("updateLoading", false);
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
      vm.$store.dispatch("updateLoading", true);

      vm.$http.post(api).then(response => {
        if (response.data.success) {
          vm.getOrder(); //回傳已付款訊息
          vm.$bus.$emit("message:push", "付款成功", "success");
        }
        vm.$store.dispatch("updateLoading", false);
      });
    },

    linkHome() {
      const vm = this;
      vm.$router.push({ path: "/" });
    }
  },

  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  }
};
</script>

<style lang="scss" scoped>
.paid-img {
  background-position: center center;
  background-size: cover;
  width: 750px;
  height: 250px;
}
</style>
