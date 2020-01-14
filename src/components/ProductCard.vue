<template>
  <div class="card mb-3 mb-md-2 mb-lg-0">
    <div>
      <a href="#" @click.prevent="getProductInfo(product.id)">
        <div
          class="card-image bg-cover d-flex justify-content-center align-items-center"
          :style="{ backgroundImage: `url(${product.imageUrl})` }"
        >
        <span class="card-image-title text-white">查看更多</span>
        </div>
      </a>
    </div>
    <div class="card-body text-center pb-0 px-0">
      <a
        href="#"
        @click.prevent="getProductInfo(product.id)"
        ><h5 class="card-title">{{ product.title }}</h5></a
      >
      <p class="card-text mt-2">
        <del class="mr-2" v-if="product.origin_price != product.price">{{
          product.origin_price | currency
        }}</del>
        <span class="text-primary font-weight-bold h5">{{
          product.price | currency
        }}</span>
      </p>
      <button
        type="button"
        class="btn btn-primary btn-lg btn-block"
        @click="addToCart"
        :disabled="product.is_enabled !== 1 || status.cartLoading"
      >
        <i class="fas fa-spinner fa-pulse" v-if="status.cartLoading"></i>
        <span v-if="product.is_enabled !== 1">即將上市</span>
        <span v-else>加入購物車</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {
      status: {
        cartLoading: false,
      },
    };
  },
  methods: {
    getProductInfo(productId) {
      const self = this;
      // 透過 push 代入產品 Id
      self.$router.push(`/product_detail/${productId}`); 
    },
    addToCart() {
      const self = this;
      const api = `${process.env.API_URL}/api/${process.env.API_PATH}/cart`;
      const cart = {
        product_id: self.product.id,
        qty: 1,
      };
      self.status.cartLoading = true;
      self.$http.post(api, { data: cart }).then((response) => {
        if (response.data.success) {
          self.status.cartLoading = false;
          self.$bus.$emit('message:push', response.data.message, 'success');
          self.$bus.$emit('updateCart');
          self.$bus.$emit('updateCart:nav');
        }
      });
    },
  },
};
</script>