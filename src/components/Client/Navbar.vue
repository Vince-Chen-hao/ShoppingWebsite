<template>
  <div>
    <div class="marquee">
      <span><i class="fas fa-bullhorn"></i> 優惠快報</span>
      <marquee>歡慶聖誕節! 優惠碼大放送~ 輸入優惠券代碼「Christmas」 即可享有全館七折優惠!!</marquee>
    </div>
    <div class="container mb-4 p-0">
      <nav class="navbar navbar-expand-lg navbar-light ">
        <router-link to="/home" class="navbar-brand logo
        bg-transparent shadow-none font-weight-bold">Vince's Store</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to="/home" class="nav-link">品牌首頁
              </router-link>
            </li>
            <li class="nav-item active">
              <router-link to="/product_list" class="nav-link">購物市集
              </router-link>
            </li>
           
          </ul>

          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <router-link to="/login"
              class="btn btn-outline-dark rounded-circle">
              <i class="fas fa-user"></i>
              </router-link> 
            </li>
            <li class="list-inline-item">
              <router-link to="/order_check"
                class="btn btn-outline-dark rounded-circle">
              <i class="fa fa-shopping-cart">
              </i>
              </router-link> 
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>


.marquee{
    background: #333;
    color: #fff;
    padding: 2px 5%;
    display: flex;
  
    span{
      display: inline-block;
      padding: 0px 10px;
      font-size: 12px;
      border-radius: 3px;
      white-space: nowrap;
    }
  }
  .logo {
  background-color: transparent;
  box-shadow: none;
  font-size: 1.25rem;
  font-weight: bold;
}

.nav-link {
  position: relative;
  display: inline-block;
  &::before {
    content: '';
    position: absolute;
    bottom:0;
    left: 0;
    height: 2px;
    width: 0;
    display:inline-block;
    background: rgb(24, 152, 156);
    transition: width .6s;
  }
  &:hover::before {
    width:100%;
  }
}
</style>


