<template>
  <div >
    <loading :active.sync="isLoading" ></loading>
    <div class="list-banner"><h1>購 . 物 . 市 . 集</h1></div>
    <div class="container mt-5">
      
      <div class="row justify-content-between">
        <div class="col-md-3">
          <ol class="breadcrumb" style="background:none;">
            <li class="breadcrumb-item">
              <router-link to="/home" class="text-dark">首頁</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/product_list" class="text-dark">購物專區</router-link>
            </li>

          </ol>
        </div>
        
      <!-- search -->
        <div class="col-md-3">
          <div class="input-group mb-3 ">
            <input type="text" class="form-control" v-model="filterData" placeholder="Search" aria-label=""
              aria-describedby="button-addon2">
            <div class="input-group-append">
              <button class="input-group-text bg-light" type="button" id="button-addon2" @click="filterTitle">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Category -->
    <div class="row mx-sm-5">
      <div class="col-md-2">
        <div class="sticky-top">
        <ul class="list-group mt-4">
        <li class=" list-group-item bg-light" @click="filterPro('') "> <i class="fas fa-align-justify"></i> 全部商品</li>
        <li class=" list-group-item" @click="filterPro('碗盤器皿')"><i class="fas fa-mortar-pestle"></i> 碗盤器皿</li>
        <li class=" list-group-item" @click="filterPro('杯與壺')"><i class="fas fa-mug-hot"></i> 杯與壺</li>
        <li class=" list-group-item" @click="filterPro('刀叉匙筷')"><i class="fas fa-utensil-spoon"></i> 刀叉匙筷</li>
        <li class=" list-group-item" @click="filterPro('料理廚具')"><i class="fas fa-home"></i> 料理廚具</li>
      </ul>
      </div>
      </div>

    <!-- Productlist -->
      <div class="col-md-10 text-dark">
        <div class="row my-4">
          <div class="col-md-4 mb-4" v-for="(item, index) in filterProducts" :key="index">
            <div class="card border-0 shadow-sm mycard">
              <div class="imgContainer">
                <div class="point my-img" @click="goDetail(item.id)" :style="{backgroundImage:`url(${item.imageUrl})`}">
                </div>
              </div>
              <div class="card-body">
                <span class="badge badge-secondary mb-2">{{ item.category }}</span>
                <h5 class="card-title">
                  <h5 class="text-dark">{{ item.title }}</h5>
                </h5>
                <p class="card-text">{{ item.content }}</p>
                <div class="d-flex justify-content-between align-items-baseline">
                  <del class="origin-price">NT{{ item.origin_price| currency }} </del>
                  <div class="now-price">NT{{ item.price| currency }} </div>
                </div>
              </div>
              <div class="card-footer d-flex">
                <button type="button" class="btn btn-outline-success btn-sm " @click="goDetail(item.id)">
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                  商品詳情
                </button>
                <button type="button" class="btn btn-success btn-sm ml-auto text-light" @click="addtoCart(item)">
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                  <span >加入購物車</span>
                </button>

                <button type="button" class="btn btn-success btn-sm ml-auto text-light" @click="getapi()">
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                  <span >加入購物車</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="row justify-content-center">
        <Pagination  
        v-if="filterPro === '全部商品'"
        :pageProps="pagination" 
        @pagenum_emit="getProducts" ></Pagination>
        </div>  -->
      </div>
    </div>
     <Shoppingcart /> 
  </div>
  
</template>

<script>
  import $ from 'jquery';
  import Pagination from '@/components/Pagination';
  import Shoppingcart from '@/components/Shoppingcart';

  export default {
     components: {
        Pagination,
      Shoppingcart,
     },
    data() {
      return {
        products: [],
        filterData: '',
        filterProducts: [],
        pagination: {},
        cart: {},
        form: {
          user: {
            name: '',
            email: '',
            tel: '',
            address: '',
          },
          message: '',
        },
        isLoading: false,
        status: {
          loadingItem: '',
        },
      };
    },
    methods: {
      getProducts(page = 1) {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;        
        const vm = this;
        vm.$store.dispatch('updateLoading', true);
        this.$http.get(api).then(response => {
            vm.products = response.data.products;
            vm.filterProducts = response.data.products;
            vm.pagination = response.data.pagination;
            vm.$store.dispatch('updateLoading', false);
        });
      },
      addtoCart(item, qty = 1) {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;
        vm.$store.dispatch('updateLoading', true);
        const cart = {
          data: {
            product_id: item.id,
            qty,
          },
        };
        this.$http.post(api, cart).then((response) => {
          vm.$bus.$emit('updateCart');
          this.$bus.$emit('message:push',response.data.message,'success')
          vm.$store.dispatch('updateLoading', false);
        });
      },
      filterPro(name) {
        const vm = this;
        let newArray = [];
        if (name == '') {
          vm.filterProducts = vm.products;
        } else {
          newArray = vm.products.filter(function (product) {
            return product.category == name;
          });
          vm.filterProducts = newArray;
        }
      },
      filterTitle() {
        const vm = this; 
        vm.filterProducts = vm.products.filter(function (product) {//括號裡的product是自定義稱與回傳return的product做連結，product =products  
          return product.title.indexOf(vm.filterData) > -1; //回傳產品的位置，“-1”代表找不到相同的值
        });
        //https://cythilya.github.io/2017/05/08/javascript-find-item-in-an-array/
        vm.filterData = '';
      },
      goDetail(id) {
        this.$router.push(`/product_detail/${id}`);
      },
      
      getapi() {
        const vm = this;
        this.$http.get('https://randomuser.me/api/').then(response => {
          console.log(response)
          //vm.name = response.data.order;
        });
      },
      
    },
    
    filters: {
      NumCeiling(num) {
        return Math.ceil(num);
      },
    },

    created() {
      this.getProducts();
      this.getapi();
    },
  }
</script>

<style lang="scss" scoped>
  
  .pro-title {
    display: inline-block;
    font-size: 30px;
  }
  .list-group-item {
    height: 50px;
    font-size: 15px;
    transition: all 0.4s;
    text-align:left
  }
  .list-group-item:hover {
    cursor: pointer;
    background: rgba(245, 217, 95, 0.8);
  }
  .point {
    cursor: pointer;
  }
  .my-img {
    background-size: cover;
    background-position: center center;
    height: 200px;
    transition: all 0.8s;
  }
  .my-img:hover {
    height: 200px;
    transform: scale(1.2)
  }
  .imgContainer{
    height: 200px;
    overflow: hidden;
    
  }
  .list-banner{
    width: 100%;
    height: 220px;
    position: relative;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url(../../../assets/images/cover04.png);
    h1{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        color: rgba(250, 249, 249, 0.8);
    }
}

.product-list{
    display: inline-block;
    width: calc(100% - 230px);
}
@media (max-width: 780px){
    .classify-board{
        display: block;
        width: 90%;
        margin: 0 auto 30px;
        li{
            display: inline-block;
            width: 50%;
        }
        li + li .classify{
            border-top: 1px solid #EFE5DC;
        }
    }
    .product-list{
        display: block;
        width: 90%;
        margin: auto;
    }
};

.origin-price{
  left: 0;
  bottom: 0;
  color: #B3B3B3;
};

.now-price{
  font-size: 18px;
  color: #C1272D;
};

.breadcrumb-item{
  font-size: 16px;
}
  
</style>