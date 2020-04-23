<template>
  <div>
    <div class="container mb-5">
      <div class="row">
        <div class="col-md-7">
          <ol class="breadcrumb bg-gray">
            <li class="breadcrumb-item">
              <router-link to="/">首頁</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/product_list">購物市集</router-link>
            </li>
            <li class="breadcrumb-item active">{{ product.title }}</li>
          </ol>
        </div>
        <div class="col-md-5 text-right">
          <router-link class="btn btn-outline-primary mb-4" to="/product_list">
            <i class="fas fa-arrow-left"></i> 返回購物市集
          </router-link>
        </div>
      </div>

      <div class="row">
        <div class="col-md-7 mb-5">
          <img :src="product.imageUrl" class="img-fluid rounded" alt="img" />
        </div>

        <div class="col-md-5">
          <div class="category-tag mb-3">{{ product.category }}</div>
          <h3>{{product.title}}</h3>
          <hr />
          <div class="category-content">
            <span class="text-dark d-block">【產品描述】</span>
            {{ product.description }}
          </div>

          <div class="d-flex justify-content-between align-items-baseline mb-3">
            <del class="p4 text-muted mr-3">原價 {{product.origin_price | currency}}</del>
            <div class="h5 text-success">特惠價 {{product.price | currency}}</div>
          </div>

          <select class="form-control text-dark mt-4" v-model="optionNum">
            <option v-for="(i, index) in 8" :key="index" :value="i">選購{{ i }}{{product.unit}}</option>
          </select>

          <div class="row my-4">
            <div class="col-6 d-flex">
              <span class="h5">總計 NT{{ optionNum * product.price | currency }}</span>
            </div>
            <div class="col-6 text-right">
              <button type="button" class="btn btn-info" @click="addtoCart(product,optionNum)">
                <i class="fas fa-plus"></i> 加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Shoppingcart />
  </div>
</template>

<script>
import $ from "jquery";
import Shoppingcart from "@/components/Shoppingcart";

export default {
  components: {
    Shoppingcart
  },
  data() {
    return {
      product: {},
      optionNum: "1"
    };
  },
  methods: {
    addtoCart(item, qty = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.$store.dispatch("updateLoading", true);
      const cart = {
        data: {
          product_id: item.id,
          qty
        }
      };
      this.$http.post(api, cart).then(response => {
        this.$bus.$emit("message:push", response.data.message, "success");
        vm.$bus.$emit("updateCart");
        vm.$store.dispatch("updateLoading", false);
      });
    }
  },
  created() {
    const vm = this;
    vm.$store.dispatch("updateLoading", true);
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.$route.params.MyproductId}`;
    this.$http.get(api).then(response => {
      vm.product = response.data.product;
      vm.$store.dispatch("updateLoading", false);
    });
  }
};
</script>


<style lang="scss" scoped>
.category-tag {
  display: inline-block;
  padding: 5px 12px;
  background-color: rgb(253, 237, 227);
  color: #534741;
  font-size: 14px;
  border-radius: 5px 0 5px 0;
  margin-bottom: 10px;
}

.category-content {
  line-height: 2;
  color: #666;
  margin-bottom: 20px;
  font-size: 16px;
}
</style>