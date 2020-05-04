<template>
  <section class="HomeSection">
    <!-- 彈出式蓋板 -->
    <PopupNews></PopupNews>
    <!-- 點擊滑動置頂 -->
    <div id="SliderTop">
      <img class="SliderTop-img" src="../../assets/images/up3.png" alt="cart" />
    </div>

    <section id="CarouselSlider">
      <div class="container mb-4">
        <div id="carouselHomeControls" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active w-100 l-bg-cover carousel01">
              <div class="inside-banner">
                <p>品味，慢活</p>
              </div>
            </div>

            <div class="carousel-item l-bg-cover w-100 carousel02">
              <div class="inside-banner">
                <p>品嘗，簡居</p>
              </div>
            </div>
            <div class="carousel-item l-bg-cover w-100 carousel03">
              <div class="inside-banner">
                <p>品選，經典</p>
              </div>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselHomeControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselHomeControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </section>

    <section id="CategoryList">
      <div class="container">
        <ul class="row mr-4 category-list justify-content-around">
          <li
            class="col-md-3 col-6"
            v-for="(category, key) in categories"
            :key="key"
            @click.prevent="linkProductlist"
          >
            <i :class="category.icon"></i>
            <ul style="list-style-type:none ">
              <li>{{ category.name }}</li>
              <li>{{ category.title }}</li>
            </ul>
          </li>
        </ul>
      </div>
    </section>

    <section id="ProductsType">
      <div class="container my-5">
        <h3>產品風格</h3>
        <hr />
        <div class="row mb-4">
          <div class="col-sm-4 my-1">
            <div class="l-bg-cover rounded type01 img-thumbnail">
              <router-link class="black-cover" to="/product_list">
                <span class="h4">陶瓷</span>
              </router-link>
            </div>
          </div>
          <div class="col-sm-4 my-1">
            <div class="l-bg-cover rounded type02 img-thumbnail">
              <router-link class="black-cover" style="text-decoration: none" to="/product_list">
                <span class="h4">釉燒</span>
              </router-link>
            </div>
          </div>

          <div class="col-sm-4 my-1">
            <div class="l-bg-cover rounded type03 img-thumbnail">
              <router-link class="black-cover" style="text-decoration: none" to="/product_list">
                <span class="h4">磨砂</span>
              </router-link>
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-md-6 my-1">
            <div class="l-bg-cover rounded type04 img-thumbnail">
              <router-link class="black-cover" to="/product_list">
                <span class=" h4">北歐家居</span>
              </router-link>
            </div>
          </div>
          <div class="col-md-6 my-1">
            <div class="l-bg-cover rounded type05 img-thumbnail">
              <router-link class="black-cover" style="text-decoration: none" to="/product_list">
                <span class="h4">典雅皇室</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="NewsInfo">
      <div class="container">
        <h3>最新消息</h3>
        <hr />
        <div class="row py-3">
          <div class="col-md-6 pb-5 text-center justify-content-center">
            <div>
              <h4>
                【新品上市】經典歐風淺盤
              </h4>
              <img class="img-fluid rounded my-2 l-bg-cover" src="../../assets/images/gift15.jpg" />

              <h5 class="my-3">限量推出『雲紋陶瓷淺盤』</h5>

              <p>低溫素燒，高溫釉燒，展現清澈透亮的釉彩質感</p>
              <p>百搭各種餐具，限量8組，送禮自用兩相宜</p>
              <router-link to="/product_list" class="btn btn-outline-primary"
                >手刀搶購 >></router-link
              >
            </div>
          </div>

          <div class="col-md-6 pb-5 text-center justify-content-center">
            <div>
              <h4>
                <span>
                  寵愛媽咪選好鍋 <i class=" flicker fas fa-heart"></i> <span> </span>
                  <i class=" flicker fas fa-heart"></i
                ></span>
              </h4>
              <img class="img-fluid rounded my-2" src="../../assets/images/gift16.jpg" />
              <h5 class="my-3">孝親限定『法國原木柄不沾鍋』</h5>
              <p>慢煮、香煎等各式料理手法都能夠輕鬆駕馭</p>
              <p>送好鍋來慰勞辛苦的媽媽就趁現在，限時搶購85折</p>
              <router-link to="/product_list" class="btn btn btn-outline-primary"
                >前往市集 >></router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="VideoIntro">
      <div class="container">
        <h3>陶瓷工藝</h3>
      </div>
      <div class="bg-light">
        <div class="container">
          <div class="row align-items-center justify-content-center py-3">
            <div class="col-lg-7 p-3">
              <div class="embed-responsive embed-responsive-16by9">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/he9Vb75mAhw?autoplay=1"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div class="col-lg-5 p-3">
              <h5 class="text-center">陶藝文化的傳承</h5>
              <hr />
              <p class="font-intro">
                陶瓷是中國傳統的工藝品，原本製作充當日常器皿，但後來有藝匠窮其畢生的精力，鑽研講究燒製的方法，使成品精美、細緻無比。
              </p>
              <p>
                陶瓷也可製做各種家庭用品，例如白地青花或福壽五彩等有中國風味的碗盤酒具，或是具有歐洲風味的咖啡杯盤與馬克杯，使飲食起居更具情趣，使室內增添不少生氣與光彩。陶瓷已成為生活中不可或缺的一部份。
              </p>
              <p>
                影片講述陶瓷從捏泥到窯燒的製程，陶藝家對細節的堅持將最純粹的藝品帶入日常中，值得細細品味。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="BrandSpirit">
      <div class="container my-4">
        <div class="row no-gutters brand-block">
          <div class="col-md-7 brand-img">
            <img class="img-fluid rounded" src="../../assets/images/image20.png" />
          </div>
          <div class="col-md-6 rounded brand-text d-flex flex-column justify-content-center">
            <div class="h3 mb-4">
              精挑細選造就食材
              <br />與器皿最美好的連結
            </div>
            <div>配色、擺盤、光影的視覺饗宴。</div>
            <small class="mb-5">美味しい</small>
            <router-link class="btn btn-outline-dark btn-pill ml-auto" to="/product_list"
              >立即挑選</router-link
            >
          </div>
        </div>
      </div>
    </section>

    <section id="SubscribeChannel">
      <div class="container">
        <h3 class="mt-5">訂閱頻道</h3>
        <hr />
        <div class="mb-4 channel-form rounded text-white">
          <h4>取得第一手資訊</h4>
          <p>
            喜歡我們的商品嗎？歡迎訂閱我們的頻道並多多分享，新品資訊絕不錯過！
          </p>
          <form class="form-inline justify-content-center">
            <input type="text" class="form-control my-2 mr-3 text-center" placeholder="輸入暱稱" />
            <input type="text" class="form-control my-2 mr-3 text-center" placeholder="輸入信箱" />
            <button class="btn btn-primary  my-2" @click.prevent="subscriptComplete">
              送出
            </button>
          </form>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import $ from "jquery";
import PopupNews from "@/components/Front/PopupNews.vue";

export default {
  components: {
    PopupNews
  },
  data() {
    return {
      categories: [
        { name: "DISHES", title: "碗盤", icon: "fas fa-mortar-pestle fa-2x" },
        { name: "MUG", title: "杯與壺", icon: "fas fa-mug-hot fa-2x" },
        {
          name: "SPOON",
          title: "刀叉匙筷",
          icon: "fas fa-utensil-spoon fa-2x"
        },
        { name: "TOOLS", title: "料理廚具", icon: "fas fa-home fa-2x" }
      ]
    };
  },
  methods: {
    linkProductlist() {
      const vm = this;
      vm.$router.push({ path: "/product_list" });
    },
    subscriptComplete() {
      const vm = this;
      vm.$bus.$emit("message:push", "訂閱成功，感謝你的支持", "success");
    }
  }
};

$(function() {
  $("#SliderTop").click(function() {
    $("html,body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  //偵測卷軸滑動時，往下滑超過400px就讓按鈕出現//
  $(window).scroll(function() {
    if ($(this).scrollTop() > 400) {
      $("#SliderTop").fadeIn();
    } else {
      $("#SliderTop").fadeOut();
    }
  });
});
</script>

<style lang="scss" scoped>
.SliderTop-img {
  position: fixed;
  bottom: 30px;
  right: 40px;
  width: 40px;
  background: rgb(241, 237, 206);
  border-radius: 70%;
  border-width: 2px;
  border-style: dotted;
  border-color: rgb(214, 210, 187);
  padding: 5px;
  z-index: 1000;
}

.l-bg-cover {
  background-position: center center;
  background-size: cover;
}

#CarouselSlider {
  .carousel-item {
    height: 400px;

    @media (max-width: 768px) {
      height: 300px;
    }
    @media (max-width: 575.98px) {
      height: 200px;
    }
  }

  .carousel01 {
    background-image: url("../../assets/images/cover01.png");
  }
  .carousel02 {
    background-image: url("https://scontent.ftpe7-1.fna.fbcdn.net/v/t31.0-8/s960x960/16992013_1023019867841945_3558742331080762043_o.jpg?_nc_cat=110&_nc_sid=05277f&_nc_ohc=BSw0P1ufNvEAX_6Etgp&_nc_ht=scontent.ftpe7-1.fna&_nc_tp=7&oh=be369ab9796f3a87f57fb41eb718c88d&oe=5EC257CC");
  }
  .carousel03 {
    background-image: url("https://scontent.ftpe7-4.fna.fbcdn.net/v/t1.0-0/p640x640/88336090_1958586280951961_4098884979327500288_o.jpg?_nc_cat=101&_nc_sid=dd9801&_nc_ohc=LhOi-BUL5EgAX9-KBnF&_nc_ht=scontent.ftpe7-4.fna&_nc_tp=6&oh=bc52549a268cd7dba172d3ba1c62dba4&oe=5EC16B12");
  }

  .inside-banner {
    width: 100%;
    position: relative;
    padding-bottom: 40%;
    background-size: cover;
    background-position: center center;
    p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      opacity: 0.8;
      font-size: 40px;
      text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);

      @media (max-width: 575.98px) {
        margin-top: 20px;
        font-size: 28px;
      }
    }
  }
}

#CategoryList {
  .category-list {
    > li {
      //只改變下一層的子元素li，不再往內層作用
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 15px 0;
      transition: all 0.5s;
      cursor: pointer;
      color: rgb(150, 145, 145);
      white-space: nowrap;
      @media (max-width: 575.98px) {
        font-size: 10px;
        padding: 8px 0;
      }

      &:hover,
      &:active {
        background-color: rgb(218, 215, 188);
        color: rgb(173, 136, 80);
      }
    }
    > li:not(:last-child) {
      //作用在最後一個子元素
      border-right: rgb(228, 224, 224) solid 1px;
      @media (max-width: 768px) {
        border: none;
      }
    }
  }
}

#ProductsType {
  .type01 {
    background-image: url("../../assets/images/image11.jpg");
  }
  .type02 {
    background-image: url("../../assets/images/image12.jpg");
  }
  .type03 {
    background-image: url("../../assets/images/image13.jpg");
  }
  .type04 {
    background-image: url("../../assets/images/image15.jpg");
  }
  .type05 {
    background-image: url("../../assets/images/image14.jpg");
  }

  .black-cover {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1.5px solid rgba(255, 255, 255, 0.5);
    text-decoration: none;
    height: 280px;
    position: relative;

    span {
      display: none;
    }

    &:hover span {
      z-index: 2;
      display: block;
      color: white;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 1s;
    }

    &:hover::before {
      opacity: 1;
    }
  }
}

#NewsInfo {
  //淡出動畫效果
  @keyframes flicker {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 1.2;
    }
  }
  .flicker {
    animation: flicker 1.5s linear infinite;
    color: #f7d202;
  }
  p {
    line-height: 10px;
  }
}

#VideoIntro {
  .font-intro {
    text-indent: 2em;
  }
}

#BrandSpirit {
  .brand-text {
    padding: 20px;
    background-color: rgb(187, 173, 133);
  }

  @media (min-width: 767px) {
    .brand-block {
      position: relative;
      height: 450px;
      .brand-img {
        margin-top: 55px;
        height: 350px;
        position: absolute;
        right: 0;
        z-index: 1;
      }
      .brand-text {
        height: 400px;
        position: absolute;
        left: 0;
        padding: 20px 130px 20px 40px;
      }
    }
  }
}

#SubscribeChannel {
  .channel-form {
    padding: 2rem;
    background: url("https://images.unsplash.com/photo-1577278979786-3849d2d82634?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=983&q=80")
      top 50px left 20px;
    background-size: cover;
    text-align: center;
    @media (max-width: 767px) {
      padding: 3rem 1rem;
    }
    h4 {
      color: white;
      text-shadow: 1px 1px 1px rgb(3, 50, 56);
    }
    p {
      font-size: 15px;
    }
  }

  .form-control {
    padding: 0.3rem;
    border-radius: 5px;
  }
}
</style>
