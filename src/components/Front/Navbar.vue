<template>
  <div id="main-nav">
    <div class="marquee">
      <span><i class="fas fa-volume-up"></i> 活動快報</span>
      <marquee
        >歡慶 LifeHouse 品牌創立 2 週年！限時大放送～ 輸入優惠代碼「HAPPY2YEARS」 享有線上購物 7
        折優惠！！</marquee
      >
    </div>
    <div class="naver-title">
      <div class="container mb-4 p-0">
        <nav class="navbar navbar-expand-md navbar-light ">
          <router-link
            to="/"
            class="navbar-brand logo
            bg-transparent shadow-none font-weight-bold"
            >LifeHouse Shop</router-link
          >
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto ">
              <li class="nav-item active">
                <router-link to="/" class="nav-link">品牌首頁 </router-link>
              </li>

              <li class="nav-item active">
                <router-link to="/product_list" class="nav-link">購物市集 </router-link>
              </li>
              <li class="nav-item active">
                <router-link to="/coupon_page" class="nav-link">優惠活動 </router-link>
              </li>
              <li class="nav-item active">
                <router-link to="/contact_page" class="nav-link">門市資訊 </router-link>
              </li>
            </ul>

            <ul class="list-inline mb-0 mt-3 text-center">
              <li class="list-inline-item" data-toggle="tooltip" title="訂單管理中心">
                <router-link to="/login" class="nav-icon btn btn-outline-dark rounded-circle">
                  <i class="fas fa-user"></i>
                </router-link>
              </li>
              <li class="list-inline-item" data-toggle="tooltip" title="前往結帳">
                <router-link to="/order_check" class="nav-icon btn btn-outline-dark rounded-circle">
                  <i class="fa fa-shopping-cart"> </i>
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.marquee {
  background: rgba(67, 83, 81, 0.781);
  color: #fff;
  padding: 2px 5%;
  display: flex;
  font-size: 15px;

  span {
    display: inline-block;
    padding: 0px 10px;
    font-size: 15x;
    border-radius: 3px;
    white-space: nowrap;
  }
}

.logo {
  font-size: 22px;
  font-weight: bold;
}

.naver-title {
  font-size: 15px;
}

.nav-link {
  position: relative;
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      height: 1px;
      width: 0px;
      background: rgba(240, 227, 109, 0.781);
      transition: width 0.6s;
    }
    &:hover::before {
      width: 100%;
    }

    &.router-link-exact-active {
      font-weight: bold;
      border-bottom: 2px solid rgba(240, 227, 109, 0.781);
    }
  }

  @media (max-width: 768px) {
    border-bottom: 1px solid rgba(65, 54, 54, 0.3);

    &:hover {
      background: rgb(250, 238, 217);
    }

    &.router-link-exact-active {
      font-weight: bold;
      font-size: 17px;
      background: rgb(248, 234, 203);
    }
  }
}
</style>
