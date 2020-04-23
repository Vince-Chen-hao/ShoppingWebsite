<template>
  <div>
    <div class="cart-dropdown">
      <a class="fixPage" @click.prevent="openList()">
        <img class="img-fluid" src="../assets/images/1.png" alt="cart" />
        <span class="badge badge-pill" v-if="!cartNum == 0">{{cartNum}}</span>
      </a>
      <!-- 購物清單Modal -->
      <div class="cart-box dropdown-cart-menu" style="display: none">
        <div class="row justify-content-center bg-light border rounded py-2">
          <div class="col-md-12">
            <div class="dropdown-header mt-3">
              <div class="d-flex justify-content-between">
                <h5>購物車清單</h5>
                <a href="#" @click.prevent="closeList()">
                  <i style="font-size:18px" class="mt-1 far fa-window-close"></i>
                </a>
              </div>
              <span class="text-danger" v-if="total === 0">尚無選購商品</span>
            </div>
            <hr />
            <div
              class="dropdown-item d-flex align-items-center"
              v-for="item in cart.carts"
              :key="item.id"
            >
              <!-- 當變數刪除有值的時候便不會出現按鈕 -->
              <div
                class="cart-icon d-flex justify-content-center align-items-center mr-4"
                @click="deleteCartItem(item.id)"
              >
                <!-- 點擊後函式的值等於產品id出現轉圈畫面，以id當作判定依據以避免全部進行轉圈 -->
                <i class="fas fa-spinner fa-pulse" v-if="deleteItem == item.id"></i>
                <!-- 如果不等於產品id就出現垃圾桶圖樣 -->
                <i v-else class="fas fa-trash-alt"></i>
              </div>
              <div
                class="cart-dropdown-item-image bg-cover mr-3"
                :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
              ></div>
              <div class="mr-4">
                <h4 class="h6 mb-0">{{ item.product.title }}</h4>
                <span>數量：{{ item.qty }}</span>
              </div>
              <span class="ml-auto text-success">
                {{
                item.total | currency
                }}
              </span>
            </div>
            <hr />
            <div class="dropdown-item text-right mb-3">
              <span class="mr-3">總計</span>
              <span class="text-success">{{ total | currency }}</span>
            </div>
            <a class="btn btn-primary btn-block" href="#" @click.prevent="goCheckout">前往結帳</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      //cart: [],
      //cartNum:0,
      //total: 0,
      deleteItem: ""
    };
  },
  methods: {
    getCart() {
      this.$store.dispatch("getCart");
    },

    deleteCartItem(id) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.deleteItem = id;
      vm.$http.delete(api).then(response => {
        if (response.data.success) {
          vm.getCart();
          vm.$bus.$emit("message:push", response.data.message, "danger");
          vm.deleteItem = "";
        }
      });
    },

    openList() {
      $(".dropdown-cart-menu").toggle();
      // cart dropdown 10 秒後自動關閉
      setTimeout(() => {
        $(".dropdown-cart-menu").fadeOut(2000);
      }, 15000);
    },

    closeList() {
      $(".dropdown-cart-menu").hide();
    },

    goCheckout() {
      const vm = this;
      if (vm.cartNum !== 0) {
        this.$router.push("/order_check");
      }
    }
  },

  computed: {
    ...mapGetters(["cart", "total", "cartNum"])
  },

  created() {
    this.getCart();
    const vm = this;

    vm.$bus.$on("updateCart", () => {
      vm.getCart();
    });
  }
};
</script>

<style lang="scss" scoped>
.cart-dropdown {
  position: fixed;
  bottom: 15px;
  right: 15px;
}
.fixPage {
  position: absolute;
  right: 20px;
  bottom: 20px;
  height: 65px;
  width: 65px;
  z-index: 2;
  cursor: pointer;
}

.badge {
  transform: translate(55px, -75px);
  font-size: 11px;
  background-color: #df6b57;
  color: #fff;
}
.cart-box {
  position: relative;
  bottom: 80px;
  right: 85px;
  box-shadow: 0rem 0rem 0.625rem 0.1875rem gray;
  background-color: #fff;
  z-index: 1;
}
.fa-window-close {
  margin-left: 120px;
  color: gray;
}

.cart-dropdown-item-image {
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  background-size: cover;
  background-position: center;
}

.cart-icon {
  width: 1.5625rem;
  height: 1.5625rem;
  cursor: pointer;
  color: red;
  border: 0.0625rem solid red;
  padding: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    color: white;
    border: 0.0625rem solid red;
    background-color: red;
  }
}
</style>