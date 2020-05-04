<template>
  <div>
    <div id="ProductDetail">
      <div class="container mb-5">
        <div class="row">
          <div class="col-md-7">
            <ol class="breadcrumb bg-light">
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
            <router-link class="btn btn-outline-info mb-4" to="/product_list">
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
            <h3>{{ product.title }}</h3>
            <hr />
            <div class="category-content">
              <span class="text-dark d-block">【產品描述】</span>
              {{ product.description }}
            </div>

            <div
              class="d-flex justify-content-between align-items-baseline mb-3"
            >
              <del class="p4 text-muted mr-3"
                >原價 {{ product.origin_price | currency }}</del
              >
              <div class="h5 text-primary">
                特惠價 {{ product.price | currency }}
              </div>
            </div>

            <select class="form-control text-dark mt-4" v-model="optionNum">
              <option v-for="(i, index) in 8" :key="index" :value="i"
                >選購{{ i }}{{ product.unit }}</option
              >
            </select>

            <div class="row my-4">
              <div class="col-6 d-flex">
                <span class="h5"
                  >總計 NT{{ (optionNum * product.price) | currency }}</span
                >
              </div>
              <div class="col-6 text-right">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="addtoCart(product, optionNum)"
                >
                  <i class="fas fa-plus"></i> 加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="py-1">
        <div class="recommend-title">
          <span class="recommend-content text-primary">為您推薦相似商品</span>
        </div>
        <div class="container">
          <div class="text-right">
            <a href="#" @click="linkProductlist">
              <i class="fas fa-angle-double-right"></i> 看更多
            </a>
          </div>
          <div class="row my-4">
            <div
              class="col-md-4 mb-4"
              v-for="item in filterData"
              :key="item.id"
            >
              <div class="card-effect card">
                <div class="container-img">
                  <div
                    class="l-point productlist-img"
                    :style="{ backgroundImage: `url(${item.imageUrl})` }"
                  ></div>
                </div>
                <div class="card-body l-point">
                  <span class="badge category-tag mb-2">{{
                    item.category
                  }}</span>
                  <h5 class="card-title">
                    <h5 class="text-dark">{{ item.title }}</h5>
                  </h5>
                </div>
                <div class="card-footer">
                  <a
                    href="#"
                    class="btn btn-bg btn-block ml-auto text-dark"
                    @click="goDetail(item.id)"
                  >
                    <i class="fas fa-search"></i><span> 了解更多</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="faq" class="p-5 text-dark">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6 mt-3">
              <div class="recommend-title">
                <span class="recommend-content text-primary">購買評價</span>
              </div>
              <hr />
              <div class="reviews d-flex  justify-content-center">
                <img
                  src="https://scontent.ftpe7-2.fna.fbcdn.net/v/t1.0-1/p160x160/94221470_10157966206034457_5996719177891577856_o.jpg?_nc_cat=111&_nc_sid=dbb9e7&_nc_ohc=MOw791oVM8kAX_1pZnw&_nc_ht=scontent.ftpe7-2.fna&_nc_tp=6&oh=d042b254e4687ffb391ebfa16551c146&oe=5ECEA8AA"
                  class="order-product-img mr-3"
                  alt=""
                />
                <div>
                  <div class="d-flex">
                    <p>TingAnn Tai</p>
                    <p class="text-muted mx-2">1 小時前</p>
                    <p>留下的購買評價</p>
                    <span class="pl-4"> 💛💛💛💛💛 </span>
                  </div>
                  <p>出貨速度超快😊😊😊😊</p>
                </div>

                <img
                  src="https://www.storemarais.com/media/99a9220a-a0f5-4b2d-9663-1a671a88fa80.jpg"
                  class="order-product-img ml-4"
                  alt=""
                />
              </div>
              <hr />
              <div class="reviews d-flex  justify-content-center">
                <img
                  src="https://scontent.ftpe2-2.fna.fbcdn.net/v/t1.0-1/p160x160/67608025_2395629564013398_5522248217942556672_n.jpg?_nc_cat=108&_nc_sid=dbb9e7&_nc_ohc=Z8U6mpDg3AsAX8POPCl&_nc_ht=scontent.ftpe2-2.fna&_nc_tp=6&oh=3ee4be4d2b0f861049168d4052e841b7&oe=5ECE9501"
                  class="order-product-img mr-3"
                  alt=""
                />
                <div>
                  <div class="d-flex">
                    <p>Janne Wang</p>
                    <p class="text-muted mx-2">2 小時前</p>
                    <p>留下的購買評價</p>
                    <span class="pl-4"> 💛💛💛💛💛 </span>
                  </div>
                  <p>金屬質感非常好、CP值高</p>
                </div>

                <img
                  src="https://www.storemarais.com/media/7c5f97dd-42f4-456b-97a7-00a2b91e44b6.jpg"
                  class="order-product-img ml-4"
                  alt=""
                />
              </div>
              <hr />
              <div class="reviews d-flex  justify-content-center">
                <img
                  src="https://scontent.ftpe2-1.fna.fbcdn.net/v/t1.0-1/p160x160/29572637_1696901947038993_2974956021994709883_n.jpg?_nc_cat=104&_nc_sid=dbb9e7&_nc_ohc=EF0Ca10m21EAX-w2pgp&_nc_ht=scontent.ftpe2-1.fna&_nc_tp=6&oh=a8435c990f51619d6a1ce583c2f7deb1&oe=5ECEB732"
                  class="order-product-img mr-3"
                  alt=""
                />
                <div>
                  <div class="d-flex">
                    <p>Rihanna Wu</p>
                    <p class="text-muted mx-2">2 小時前</p>
                    <p>留下的購買評價</p>
                    <span class="pl-4 "> 💛💛💛💛💛 </span>
                  </div>
                  <p>客服好專業，有問必答💕</p>
                </div>

                <img
                  src="https://www.storemarais.com/media/35df848c-ffbd-4741-b6f1-983a36dc0889.jpg"
                  class="order-product-img ml-4"
                  alt=""
                />
              </div>
              <hr />
              <div class="reviews d-flex justify-content-center">
                <img
                  src="https://scontent.ftpe2-2.fna.fbcdn.net/v/t1.0-1/c32.32.394.394a/s160x160/485629_182551875236418_248234854_n.jpg?_nc_cat=109&_nc_sid=dbb9e7&_nc_ohc=Bq4Xe-rQ89IAX9-K1xe&_nc_ht=scontent.ftpe2-2.fna&oh=1237992a1946ebb6260ca1e724f472b2&oe=5ED002CE "
                  class="order-product-img mr-3"
                  alt=""
                />
                <div>
                  <div class="d-flex">
                    <p>Michael Tai</p>
                    <p class="text-muted mx-2">3 小時前</p>
                    <p>留下的購買評價</p>
                    <span class="pl-4"> 💛💛💛💛💛 </span>
                  </div>
                  <p>包裝產品都精美，送禮很有面子～</p>
                </div>

                <img
                  src="https://www.storemarais.com/media/1b741eef-0500-4d3d-8917-d44d2cefe33c.jpg"
                  class="order-product-img ml-4"
                  alt=""
                />
              </div>
            </div>

            <div class="col-lg-6 mt-3">
              <div class="recommend-title mb-3">
                <span class="recommend-content text-primary">問答區</span>
              </div>
              <div class="row">
                <div class="col">
                  <div id="accordion">
                    <div class="card">
                      <div class="card-header" id="headingFour">
                        <h5 class="mb-0 text-center">
                          <div
                            href="#collapseFour"
                            data-toggle="collapse"
                            aria-expanded="false"
                            aria-controls="collapseFour"
                          >
                            <i class="fa fa-chevron-circle-down"></i> 付款方式
                          </div>
                        </h5>
                      </div>

                      <div
                        id="collapseFour"
                        class="collapse show"
                        aria-labelledby="headingFour"
                        data-parent="#accordion"
                      >
                        <div class="card-body">
                          信用卡安全加密付款, 信用卡安全加密付款, 7-11 ibon
                          代碼繳費, ATM 轉帳繳費, 全家 FamiPort 代碼繳費,
                          信用卡分期 (3 期零利率), 信用卡分期 (6 期零利率), LINE
                          Pay, Alipay 支付寶
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingOne">
                        <h5 class="mb-0 text-center">
                          <div
                            href="#collapseOne "
                            data-toggle="collapse"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            <i class="fa fa-chevron-circle-down"></i> 商品須知
                          </div>
                        </h5>
                      </div>

                      <div
                        id="collapseOne"
                        class="collapse"
                        aria-labelledby="headingOne"
                        data-parent="#accordion"
                      >
                        <div class="card-body">
                          <ul>
                            <li>
                              產品因拍攝關係顏色可能略有差異，實際以廠商出貨為主。
                            </li>
                            <li>
                              商品情境照為示意用，僅商品主體不包含其他配件，請以規格內容物為主。
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card-header" id="headingTwo">
                        <h5 class="mb-0 text-center">
                          <div
                            href="#collapseTwo"
                            data-toggle="collapse"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            <i class="fa fa-chevron-circle-down"></i> 運送說明
                          </div>
                        </h5>
                      </div>

                      <div
                        id="collapseTwo"
                        class="collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordion"
                      >
                        <div class="card-body">
                          <ul>
                            <li>
                              商品免運費，下單翌日起算兩個工作天內出貨，送貨範圍限台灣本島。注意！收件地址請勿為郵政信箱。
                            </li>
                            <li>
                              商品頁標示「預購、客製化」商品，將以實際出貨或製作日標示為主。（不適用3個工作天出貨）
                            </li>
                            <li>送貨方式由物流宅配送達。</li>
                            <li>
                              訂購商品若經配送三次無法送達，並經本公司以電話與E-mail均無法聯繫逾三天者，本公司將取消該筆訂單並全額退款。
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card-header" id="headingThree">
                        <h5 class="mb-0 text-center">
                          <div
                            href="#collapseThree"
                            data-toggle="collapse"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            <i class="fa fa-chevron-circle-down"></i> 退貨須知
                          </div>
                        </h5>
                      </div>

                      <div
                        id="collapseThree"
                        class="collapse"
                        aria-labelledby="headingThree"
                        data-parent="#accordion"
                      >
                        <div class="card-body">
                          <ul>
                            <li>
                              依《消費者保護法》規定，消費者享有商品簽收翌日起算七天之鑑賞期，期間申請退購無須負擔運費，欲退購者請於七日內提出，逾期恕不受理。注意！猶豫期並非試用期，故退回的商品必須是全新的狀態且完整包裝（含商品本體、配件、贈品、保證書、原廠包裝及所有附隨文件或資料），切勿缺漏任何配件、自行拆解商品、或損毀原廠外盒。如有遺失、毀損或缺件，可能影響您退貨的權益，也將依照損毀程度扣除為復原所需之整新費用。
                            </li>
                            <li>
                              如購買的商品是電腦軟體、遊戲、影音光碟、食品、耗材、個人衛生用品及客製化商品，拆封後除瑕疵品外恕無法辦理退換貨。
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Shoppingcart />
    </div>
  </div>
</template>

<script>
import Shoppingcart from "@/components/Front/Shoppingcart.vue";

export default {
  components: {
    Shoppingcart
  },
  data() {
    return {
      product: {},
      optionNum: "1",
      Allproducts: []
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      vm.$store.dispatch("updateLoading", true);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.$route.params.MyproductId}`;
      vm.$http.get(api).then(response => {
        vm.product = response.data.product;
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
        vm.$bus.$emit("message:push", response.data.message, "success");
        vm.$bus.$emit("updateCart");
        vm.$store.dispatch("updateLoading", false);
      });
    },

    getAllproducts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      const vm = this;
      vm.$http.get(api).then(response => {
        vm.Allproducts = response.data.products;
      });
    },

    goDetail(id) {
      this.$router.push(`/product_detail/${id}`);
      this.getProduct();
    },

    linkProductlist() {
      const vm = this;
      vm.$router.push({ path: "/product_list" });
    }
  },

  computed: {
    filterData() {
      const vm = this;
      return vm.Allproducts.filter(item => {
        return item.id !== vm.product.id;
      }).filter(item => {
        return item.category === vm.product.category;
      });
    }
  },

  created() {
    this.getProduct();
    this.getAllproducts();
  }
};
</script>

<style lang="scss" scoped>
#ProductDetail {
  .breadcrumb {
    max-width: 600px;
  }

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
}

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

.recommend-title {
  position: relative;
  text-align: center;
  padding: 2rem 0;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    border-top: 1px solid rgb(235, 181, 89);
    width: 100%;
    z-index: -1;
  }
  .recommend-content {
    z-index: 1;
    background-color: #fff;
    padding: 0 2rem;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
  }
}

.order-product-img {
  background-position: center center;
  background-size: cover;
  width: 60px;
  height: 60px;
}

#faq {
  .fa {
    color: #f2ac34;
  }
}
</style>
