<template>
  <div>
    <div class="top">
      <img class="img-top" src="../../assets/images/up3.png" alt="cart">
    </div>
    <div class="container mb-4">
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active w-100 bg-cover carousel-1">
              <div class="ind-banner">
                <p>品味，慢活</p>
              </div>
          </div>
          <div class="carousel-item bg-cover  w-100 carousel-2">
            <div class="ind-banner">
              <p>歡慶聖誕假期～輸入優惠碼「Christmas」，全館享70％優惠</p>
            </div>
          </div>
          <div class="carousel-item bg-cover w-100 carousel-3">
            <div class="ind-banner">
              <p>打造您專屬的餐桌時尚</p>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls"
        role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls"
        role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>

    <ul class="row mr-4  category  justify-content-center">
      <li class="col-lg-2 col-md-4 col-6"  v-for="(category, key) in categories" :key="key"
      @click.prevent="categorypage" >
        <i :class="category.icon" ></i>
        <ul style="list-style-type:none ">
          <li>{{category.name}}</li>
          <li>{{category.title}}</li>
        </ul>
      </li>
    </ul>

    <div class="container my-5">
      <h3 id="hot">商品風格</h3>
      <hr>
      <div class="row mb-4">
        <div class="col-6">
          <div class="bg-cover product-item product-4">
            <router-link class="black-cover" style="text-decoration: none"
            to="/productList"><span class="font-weight-bold h3">北歐家居</span>
            </router-link>
          </div>
        </div>
        <div class="col-6">
          <div class="bg-cover product-item product-5">
            <router-link class="black-cover" style="text-decoration: none"
            to="/productList"><span class="font-weight-bold h3">典雅皇室</span>
            </router-link>
          </div>
        </div>
        <div class="types-wrap">
                <router-link to="list" class="type-box first">
                    <div class="pic pic1"></div>
                    <span class="type-name">陶瓷</span>
                </router-link>
                <router-link to="list" class="type-box">
                    <div class="pic pic2"></div>
                    <span class="type-name">釉燒</span>
                </router-link>
                <router-link to="list" class="type-box">
                    <div class="pic pic3"></div>
                    <span class="type-name">砂壺</span>
                </router-link>
          </div>
      </div>
    </div>

    


    <div class="container pb-4">
      <h3 id="new">最新消息</h3>
      <hr>
      <div class="row">
          <div class="col-md-6">
          <div class="row pb-4">
            <div class="col-6">
              <img class="img-fluid" src="../../assets/images/image10.jpg">
            </div>
            <div class="col-6">
              <h4><span class="h5 text-warning flicker ">NEW</span> 新品上市</h4>
              <p>金與黑的強烈對比，在極為簡單的線條設計下就能帶給人奢華高貴的視覺享受，讓餐桌多了分高雅的摩登感。</p>
            </div>
          </div>
        </div>

        <div class="col-md-6 pb-5 text-center d-flex align-items-center justify-content-center">
          <div>
            <img class="img-fluid mb-3" src="../../assets/images/image253.jpg">
            <h4>歡慶聖誕假期，輸入優惠券代碼「Christmas」即可獲得全館70％優惠</h4>
            <p class="animated infinite pulse delay-2s">(數量有限，手刀搶購去)</p>
            <router-link to="/product_list" class="btn btn-outline-primary">Go Shop</router-link>
          </div>
        </div>

      </div>
    </div>

    <section class="container my-4">
      <div class="row no-gutters gift-block order-2">
        <div class="col-md-7 banner gift-img">
          <img class="img-fluid" src="../../assets/images/image20.png">
        </div>
        <div class="col-md-6 gift-text d-flex flex-column justify-content-center font-letter">
          <div class="h3 mb-4">
           精挑細選造就食材
            <br>與器皿最美好的連結
          </div>
          <div>配色、擺盤、光影的視覺饗宴。</div>
          <small class="mb-5">美味しい</small>
          <router-link
            class="btn btn-outline-dark btn-pill ml-auto"
            to="/product_list">立即挑選</router-link>
        </div>
      </div>
    </section>

  <div class="container mt-4">
    
    <div class="mb-4 joinus" py-4>
      <h3 id="new">訂閱頻道，取得第一手新品資訊</h3>
      
      <div class="joinus-content">
        <input type="email" name="email" class="form-control" placeholder="Enter your email"
         :class="{'is-invalid': errors.first('email')}" v-validate="'required|email'">
        <span class="text-danger" v-if="errors.first('email')">
          {{ errors.first('email') }}
        </span>
        <button type="button" class="form-control btn btn-info mt-3"
         >Subscribe Now</button>
      </div>
    </div>
  </div>


  </div>
</template>

<script>

import $ from 'jquery';

export default {
  data() {
    return {
      categories: [
        { name: 'ALL', title: '全部商品', icon: 'fas fa-gift fa-2x' },
        { name: 'DISHES', title: '碗盤', icon: 'fas fa-mortar-pestle fa-2x' },
        { name: 'MUG', title: '杯與壺', icon: 'fas fa-mug-hot fa-2x' },
        { name: 'SPOON', title: '刀叉匙筷', icon: 'fas fa-utensil-spoon fa-2x' },
        { name: 'TOOLS', title: '料理廚具', icon: 'fas fa-home fa-2x' },
      ],
    };
  },
  methods: {
    categorypage() {
      const vm = this;
      vm.$router.push({ path: '/product_list'});
    },
  },


}


  $(document).ready(function() {
    $('.top').click(function(event) {
      event.preventDefault();
      $('html,body').animate({
        scrollTop: 0
      }, 1000);
    });
  });
  
  
</script>

<style lang="scss" scoped>

  .carousel-item {
    height:400px;
  }
  .product-item {
    height: 290px;
  }
  .carousel-1 {
  background-image: url('../../assets/images/cover01.png');
  }
  .carousel-2 {
  background-image: url('../../assets/images/cover05.jpeg');
  }
  .carousel-3 {
  background-image: url('../../assets/images/cover06.jpg');
  }
  .product-1 {
  background-image: url('../../assets/images/image01.jpeg');
  }
  .product-2 {
  background-image: url('../../assets/images/image01.jpeg');
  }
  .product-3 {
  background-image: url('../../assets/images/image01.jpeg');
  }
  .product-4 {
  background-image: url('../../assets/images/image15.jpg');
  }
  .product-5 {
  background-image: url('../../assets/images/image14.jpg');
  }
  .bg-cover {
    background-position: center center ;
    background-size: cover;
  }
  .black-cover{
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    border: 1px solid rgba(255,255,255,0.5);
    text-decoration: none;
    height:290px;
    position: relative;
  }

  
  .black-cover span{
    display: none;
  }
  .black-cover:hover span{
    z-index: 2;
    display: block;
    color: white;
  }
  .black-cover::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
    background-color: rgba(0,0,0,0.5);
    transition: all 0.4s;
  }
  .black-cover:hover::before{
    opacity: 1;
  }
  //字樣出現、消失反覆效果
  @keyframes flicker {
    0%{opacity: 1;}
    50%{opacity: 0.2;}
    100%{opacity: 1;}
  }
  .flicker {
    animation: flicker 2s linear infinite; //infinite 循環播放
  }
  @media (max-width: 768px) {
    .carousel-item {
      height: 300px;
    }
  }
  @media (max-width: 575.98px) {
    .carousel-item {
      height: 200px;
    }
    .product-item {
      height: 150px;
    }
    .black-cover {
      height: 150px;
    }
  }

  .ind-banner{
    width: 100%;
    position: relative;
    padding-bottom: 40%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    p{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #fff;
        opacity: 0.8; 
        font-size: 40px;
        text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
    }
}

.types-wrap{
    width: 90%;
    max-width: 900px;
    margin: 30px auto 30px;
    font-size: 0;
}

.type-box{
    width: calc((100% - 40px)/3);
    display: inline-block;
    vertical-align: top;
    position: relative;
    border-radius: 5px;
    cursor: pointer;
    transform: scale(1);
    transition: .3s;
    filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3));
    overflow: hidden;
    &:before{
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.2);
    }
    &:hover{
        transform: scale(0.95);
    }
    .pic{
        width: 100%;
        padding-bottom: 60%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .pic1{
        background-image: url('../../assets/images/image11.jpg');
    }
    .pic2{
        background-image: url('../../assets/images/image12.jpg');
    }
    .pic3{
        background-image: url('../../assets/images/image13.jpg');
    }
    .type-name{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #fff;
        font-size: 20px;
        letter-spacing: 5px;
        text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.15);
    }
}
.type-box + .type-box{
    margin-left: 20px;
} 
.item-list{
    margin: 20px auto;
    padding: 0 10px;
}
@media (max-width: 780px){
.type-box{
    width: calc((100% - 40px)/2);
    margin-left: 0;
    &.first{
        display: block;
        margin: 0 auto 15px;
    }
}  
.type-box + .type-box{
    margin: 0 10px ;
}  
}
.joinus {
  padding: 2rem;
  background: url('https://images.unsplash.com/photo-1577278979786-3849d2d82634?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=983&q=80') center center no-repeat;
  background-size: cover;
  background-attachment: fixed;
  text-align: center;
  margin-top:100px;
  @media (max-width: 767px) {
    padding: 3rem 1rem;
  }
  h3 {
    color: white;
    text-shadow: 1px 1px 1px rgb(145, 141, 133);
  }
}
.joinus-content {
  padding: 1rem 1rem;
  margin: 0rem 5rem;
  background: rgba(rgb(209, 198, 168), 0.8);
  border-radius: 10px;
}


.gift-block {
  .gift-img { 
    width: 100%;
    border: 5px solid rgb(202, 176, 105);
  }
  .gift-text {
    padding: 20px;
    background-color:rgb(187, 173, 133);
  }
}
@media (min-width: 767px) {
  .gift-block {
    position: relative;
    height: 450px;
    .gift-img {
      margin-top: 55px;
      height: 350px;
      position: absolute;
      right: 0;
      z-index: 1;
      border: none;
    }
    .gift-text {
      height: 400px;
      position: absolute;
      left: 0;
      padding: 20px 130px 20px 40px;
    }
  }
}

.category {
  >li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    transition: all 0.45s ;
    cursor: pointer;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    color: rgb(150, 145, 145);
    white-space:nowrap;
    &:hover, &:active {
      background-color:rgb(218, 215, 188);
      color: rgb(173, 136, 80);
    }
  }
  >li:not(:last-child) {
    border-right: rgb(228, 224, 224) solid 1px;
    @media(max-width: 992px) {
      border: none;
    }
  }
}

.img-top{
  position:fixed; 
  bottom:30px;
  right:40px;
  width:40px;
  background:rgb(241, 237, 206);
  border-radius:70%;
  border-width:2px;border-style:dotted;border-color:rgb(214, 210, 187);padding:5px;



}

  



</style>