<template>
  <div>
    <BuyProgress :progress="step"></BuyProgress>

    <div class="container">
      <div class="row py-4">
        <div class="col-md-8">
          <h5 class="text-center">訂購資料</h5>
          <form class="col-md-12" @submit.prevent="createOrder">
            <div class="form-group">
              <label for="email">Email <span class="text-secondary">( 必填 )</span></label>
              <input
                type="email"
                name="email"
                id="email"
                class="form-control"
                :class="{ 'is-invalid': errors.first('email') }"
                v-validate="'required|email'"
                placeholder="請輸入 Email"
                v-model="form.user.email"
              />
              <span class="text-danger" v-if="errors.first('email')"
                >{{ errors.first("email") }}
              </span>
            </div>
            <div class="form-group">
              <label for="name">收件人姓名 <span class="text-secondary">( 必填 )</span> </label>
              <input
                type="text"
                name="name"
                id="name"
                class="form-control"
                :class="{ 'is-invalid': errors.has('name') }"
                v-validate="'required'"
                placeholder="請輸入收件人姓名"
                v-model="form.user.name"
              />
              <span class="text-danger" v-if="errors.has('name')">姓名欄位不可以是空的喔！ </span>
            </div>
            <div class="form-group">
              <label for="tel">收件人電話 <span class="text-secondary">( 必填 )</span> </label>
              <input
                type="tel"
                name="tel"
                id="tel"
                class="form-control"
                :class="{ 'is-invalid': errors.has('tel') }"
                v-validate="'required'"
                placeholder="請輸入收寄人電話"
                v-model="form.user.tel"
              />
              <span class="text-danger" v-if="errors.has('tel')">電話不可以是空的喔！</span>
            </div>
            <div class="form-group">
              <label for="address">收件人地址 <span class="text-secondary">( 必填 )</span> </label>
              <input
                type="text"
                name="address"
                id="address"
                class="form-control"
                :class="{ 'is-invalid': errors.has('address') }"
                v-validate="'required'"
                placeholder="請輸入收件人地址"
                v-model="form.user.address"
              />
              <span class="text-danger" v-if="errors.has('address')">地址欄位不可以是空的喔！</span>
            </div>
            <div class="form-group mb-4">
              <label for="message">留言 <span class="text-secondary">( 選填 )</span> </label>
              <textarea
                name="message"
                id="message"
                class="form-control"
                cols="20"
                rows="5"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="stepBtn d-flex my-4">
              <router-link to="/order_check" class="btn btn-outline-info mr-auto"
                >上一頁</router-link
              >

              <button type="submit" class="btn btn-outline-secondary justify-content-end">
                確認訂購
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>

        <div class="col-md-4">
          <h5 class="text-center pb-4">訂單金額</h5>

          <table class="table order-table">
            <tbody>
              <tr>
                <td>總金額</td>
                <td class="text-right">{{ cart.total | currency }}</td>
              </tr>
              <tr>
                <td>優惠折抵</td>
                <td class="text-right">-{{ (cart.total - cart.final_total) | currency }}</td>
              </tr>
              <tr>
                <td>應付金額</td>
                <td class="text-right text-secondary">
                  {{ cart.final_total | currency }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BuyProgress from "@/components/Front/BuyProgress.vue";

export default {
  components: {
    BuyProgress
  },
  data() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      fullPage: true,
      coupon_code: "",
      step: "2"
    };
  },

  methods: {
    getCart() {
      this.$store.dispatch("getCart");
    },

    createOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      vm.$validator.validate().then(valid => {
        if (valid) {
          vm.$http.post(url, { data: order }).then(response => {
            if (response.data.success) {
              vm.$router.push(`/order_complete/${response.data.orderId}`); //傳至路徑，取得後端資料庫裡的orderId
            }
          });
        }
      });
    }
  },

  filters: {
    NumCeiling(num) {
      return Math.ceil(num);
    }
  },
  computed: {
    ...mapGetters(["cart"])
  },

  created() {
    this.getCart();
  }
};
</script>

<style lang="scss" scoped>
.form-control:focus {
  border-color: rgba(107, 201, 224, 0.91);
  box-shadow: 0 0 0 0.2rem rgba(220, 235, 241, 0.92549);
}
</style>
