<template>
  <div>
    <div class="productlist-banner ">
      <div class="dark-overlay d-flex justify-content-center align-items-center">
        <h1 class="banner-title text-center text-light">購 物 市 集</h1>
      </div>
    </div>

    <section id="NavSearch">
      <div class="container mt-5">
        <!-- breadcrumb -->
        <div class="row justify-content-between">
          <div class="col-md-5">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb" style="background:none;">
                <li class="breadcrumb-item">
                  <router-link class="text-dark" to="/">首頁</router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link class="text-dark" to="/product_list">購物市集</router-link>
                </li>
                <li class="breadcrumb-item" v-if="currentCat !== ''">
                  <span class="text-primary">{{ currentCat }}</span>
                </li>
              </ol>
            </nav>
          </div>

          <!-- search -->
          <div class="col-md-3">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                v-model="filterData"
                placeholder="搜尋商品"
                aria-label
                aria-describedby="button2"
                @keyup.enter="filterTitle"
              />
              <div class="input-group-append">
                <button
                  class="input-group-text bg-light"
                  type="button"
                  id="button2"
                  @click="filterTitle"
                >
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Category -->
    <section id="CategoryFilter">
      <div class="container">
        <div class="row">
          <div class="col-lg-2">
            <div class="sticky-top">
              <div class="list-group mt-4">
                <a
                  href="#"
                  class="list-group-item list-group-item-action list-group-item-primary"
                  @click.prevent="filterPro('全部商品')"
                >
                  <i class="fas fa-align-justify"></i> 全部商品
                </a>
                <a
                  href="#"
                  class="list-group-item list-group-item-action"
                  @click.prevent="filterPro('碗盤器皿')"
                >
                  <i class="fas fa-mortar-pestle"></i> 碗盤器皿
                </a>
                <a
                  href="#"
                  class="list-group-item list-group-item-action"
                  @click.prevent="filterPro('杯與壺')"
                >
                  <i class="fas fa-mug-hot"></i> 杯與壺
                </a>
                <a
                  href="#"
                  class="list-group-item list-group-item-action"
                  @click.prevent="filterPro('刀叉匙筷')"
                >
                  <i class="fas fa-utensil-spoon"></i> 刀叉匙筷
                </a>
                <a
                  href="#"
                  class="list-group-item list-group-item-action"
                  @click.prevent="filterPro('料理廚具')"
                >
                  <i class="fas fa-home"></i> 料理廚具
                </a>
              </div>
            </div>
          </div>

          <!-- Productlist -->
          <div class="col-lg-10 text-dark">
            <div class="row my-4">
              <div class="col-md-4 mb-4" v-for="(item, index) in filterProducts" :key="index">
                <div class="card-effect card">
                  <div class="container-img">
                    <div
                      class="l-point productlist-img"
                      :style="{ backgroundImage: `url(${item.imageUrl})` }"
                      @click="goDetail(item.id)"
                    ></div>
                  </div>
                  <div class="card-body l-point" @click="goDetail(item.id)">
                    <span class="badge category-tag mb-2">{{ item.category }}</span>
                    <h5 class="card-title">
                      <h5 class="text-dark">{{ item.title }}</h5>
                    </h5>
                    <p class="card-text">{{ item.content }}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                      <del class="origin-price">NT{{ item.origin_price | currency }}</del>
                      <div class="now-price">NT{{ item.price | currency }}</div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <button
                      type="button"
                      class="btn btn-bg btn-block ml-auto text-dark"
                      @click="addtoCart(item)"
                    >
                      <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                      <i class="fas fa-shopping-bag"></i><span> 立即選購</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-center" v-if="currentCat === '全部商品'">
              <Pagination :pageProps="pagination" @pagenum_emit="getProducts"></Pagination>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Shoppingcart />
  </div>
</template>

<script>
import Pagination from "@/components/Share/Pagination.vue";
import Shoppingcart from "@/components/Front/Shoppingcart.vue";

export default {
  components: {
    Pagination,
    Shoppingcart
  },
  data() {
    return {
      currentCat: "全部商品",
      Allproducts: [],
      products: [],
      filterData: "",
      filterProducts: [],
      pagination: {},
      cart: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      status: {
        loadingItem: ""
      }
    };
  },
  computed: {},

  methods: {
    //取得分頁後的產品
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.$store.dispatch("updateLoading", true);
      vm.$http.get(api).then(response => {
        vm.products = response.data.products;
        vm.filterProducts = response.data.products;
        vm.pagination = response.data.pagination;
        vm.$store.dispatch("updateLoading", false);
      });
    },

    addtoCart(item, qty = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      vm.$store.dispatch("updateLoading", true);
      const cart = {
        data: {
          product_id: item.id,
          qty
        }
      };
      vm.$http.post(api, cart).then(response => {
        vm.$bus.$emit("updateCart");
        vm.$bus.$emit("message:push", response.data.message, "success");
        vm.$store.dispatch("updateLoading", false);
      });
    },

    //取得全部產品
    getAllproducts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      const vm = this;
      vm.$http.get(api).then(response => {
        vm.Allproducts = response.data.products;
      });
    },

    //取得分類的產品
    filterPro(name) {
      const vm = this;
      vm.currentCat = name;
      vm.$store.dispatch("updateLoading", true);
      let newArray = [];
      if (name === "全部商品") {
        vm.getProducts();
      } else {
        newArray = vm.Allproducts.filter(product => {
          return product.category == name;
        });
        vm.filterProducts = newArray;
      }
      vm.$store.dispatch("updateLoading", false);
    },

    //關鍵字查詢產品
    filterTitle() {
      const vm = this;
      vm.filterProducts = vm.products.filter(item => {
        return item.title.indexOf(vm.filterData) > -1; //indexOf查詢陣列位置，找不到名稱則顯示-1
      });
      vm.filterData = "";
    },
    goDetail(id) {
      this.$router.push(`/product_detail/${id}`);
    }
  },

  created() {
    this.getProducts();
    this.getAllproducts();
  }
};
</script>

<style lang="scss" scoped>
.btn-outline-success:hover {
  color: white;
}

.list-group-item-action:focus {
  color: #6c747c;
  background-color: rgba(243, 222, 126, 0.8);
}

.l-point {
  cursor: pointer;
}

.sticky-top {
  z-index: 0;
}

.productlist-banner {
  min-height: 27vh;
  position: relative;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(../../assets/images/cover04.png);

  .banner-title {
    letter-spacing: 10px;
  }
  .dark-overlay {
    min-height: 27vh;
    width: 100%;
    background-color: rgba(121, 90, 32, 0.267);
  }
}

#NavSearch {
  .breadcrumb-item {
    font-size: 16px;
  }
  .breadcrumb {
    padding: 0.75rem 0rem;
  }
}

#CategoryFilter {
  .list-group-item {
    height: 50px;
    font-size: 15px;
    transition: all 0.4s;
    text-align: left;
  }
  .list-group-item:hover {
    cursor: pointer;
    background: rgba(245, 217, 95, 0.8);
  }
  .card-effect {
    transition: all 0.5s;
    &:hover {
      box-shadow: 1px 1px 10px 1px rgb(156, 156, 151);
      filter: brightness(1.1);
    }
  }

  .origin-price {
    left: 0;
    bottom: 0;
    color: #b3b3b3;
  }

  .now-price {
    font-size: 18px;
    color: #c1272d;
  }

  .productlist-img {
    background-size: cover;
    background-position: center center;
    height: 200px;
    transition: all 0.8s;

    &:hover {
      height: 200px;
      transform: scale(1.2);
    }
  }
  .container-img {
    height: 200px;
    overflow: hidden;
  }
  .category-tag {
    background-color: rgb(253, 237, 227);
    color: #534741;
    font-size: 14px;
    border-radius: 5px 0 5px 0;
  }

  .card-footer {
    .btn-bg {
      background-color: #f1be77;
    }
  }
}
</style>
