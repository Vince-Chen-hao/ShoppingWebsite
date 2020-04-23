<template>
  <div>
    <div class="productlist-banner d-flex justify-content-center align-items-center">
      <h1 class="banner-title text-center text-light">購 物 市 集</h1>
    </div>

    <section id="NavSearch">
      <div class="container mt-5">
        <!-- breadcrumb -->
        <div class="row justify-content-between">
          <div class="col-md-5">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb" style="background:none;">
                <li class="breadcrumb-item">
                  <a href="#" class="text-dark">首頁</a>
                </li>
                <li class="breadcrumb-item">
                  <a href="#" class="text-dark">購物市集</a>
                </li>
                <li class="breadcrumb-item" v-if="currentCat !== ''">
                  <a href="#" class="text-secondary">{{currentCat}}</a>
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
                class="list-group-item list-group-item-action list-group-item-secondary"
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
                @click.prevent="filterPro('杯與壺');"
              >
                <i class="fas fa-mug-hot"></i> 杯與壺
              </a>
              <a
                href="#"
                class="list-group-item list-group-item-action"
                @click.prevent="filterPro('刀叉匙筷');"
              >
                <i class="fas fa-utensil-spoon"></i> 刀叉匙筷
              </a>
              <a
                href="#"
                class="list-group-item list-group-item-action"
                @click.prevent="filterPro('料理廚具');"
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
                    @click="goDetail(item.id)"
                    :style="{backgroundImage:`url(${item.imageUrl})`}"
                  ></div>
                </div>
                <div class="card-body">
                  <span class="badge badge-secondary mb-2">{{ item.category }}</span>
                  <h5 class="card-title">
                    <h5 class="text-dark">{{ item.title }}</h5>
                  </h5>
                  <p class="card-text">{{ item.content }}</p>
                  <div class="d-flex justify-content-between align-items-baseline">
                    <del class="origin-price">NT{{ item.origin_price| currency }}</del>
                    <div class="now-price">NT{{ item.price| currency }}</div>
                  </div>
                </div>
                <div class="card-footer d-flex">
                  <button
                    type="button"
                    class="btn btn-outline-success btn-sm"
                    @click="goDetail(item.id)"
                  >
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                    商品詳情
                  </button>
                  <button
                    type="button"
                    class="btn btn-success btn-sm ml-auto text-light"
                    @click="addtoCart(item)"
                  >
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                    <span>加入購物車</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center" v-if="currentCat ==='全部商品'">
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
import $ from "jquery";
import Pagination from "@/components/Pagination";
import Shoppingcart from "@/components/Shoppingcart";

export default {
  components: {
    Pagination,
    Shoppingcart
  },
  data() {
    return {
      currentCat: "全部商品",
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
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.$store.dispatch("updateLoading", true);
      this.$http.get(api).then(response => {
        vm.products = response.data.products;
        console.log("取得產品列表:", response.data.products);

        vm.filterProducts = response.data.products;
        vm.pagination = response.data.pagination;
        vm.$store.dispatch("updateLoading", false);
      });
    },
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
        vm.$bus.$emit("updateCart");
        this.$bus.$emit("message:push", response.data.message, "success");
        vm.$store.dispatch("updateLoading", false);
      });
    },
    filterPro(name) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.currentCat = name;
      vm.$store.dispatch("updateLoading", true);
      this.$http.get(api).then(response => {
        let newArray = [];
        if (name === "全部商品") {
          this.getProducts();
        } else {
          newArray = response.data.products.filter(product => {
            return product.category == name;
          });
          vm.filterProducts = newArray;
          vm.products = response.data.products;
        }
        vm.$store.dispatch("updateLoading", false);
      });
    },

    filterTitle() {
      const vm = this;
      vm.filterProducts = vm.products.filter(item => {
        //括號裡的product是自定義稱與回傳return的product做連結，product =products
        return item.title.indexOf(vm.filterData) > -1; //indexOf查詢陣列位置，“-1”找不到相同的名稱顯示-1
      });
      //https://cythilya.github.io/2017/05/08/javascript-find-item-in-an-array/
      vm.filterData = "";
    },
    goDetail(id) {
      this.$router.push(`/product_detail/${id}`);
    }
  },

  filters: {
    NumCeiling(num) {
      return Math.ceil(num);
    }
  },

  created() {
    this.getProducts();
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

.productlist-banner {
  min-height: 30vh;
  position: relative;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(../../../assets/images/cover04.png);

  .banner-title {
    letter-spacing: 10px;
  }
}

#NavSearch {
  .breadcrumb-item {
    font-size: 16px;
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
}


</style>