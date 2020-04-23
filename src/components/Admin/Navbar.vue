<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <div class="navbar-brand col-sm-3 col-md-2 mr-0">LifeHouse 訂單管理系統</div>
        <div class="d-flex">
          <router-link class="nav-link" to="/">品牌首頁</router-link>
          <a class="nav-link" href="#" @click.prevent="signout">登出</a>
        </div>
    </nav>
  </div>
</template>


<script>
export default {
  name: "Navbar",

  methods: {
    signout() {
      const vm = this;
      const api = `${process.env.APIPATH}/logout`; //依登入api說明新增(左：路徑，右：API功能)
      this.$http.post(api).then(response => {
        //api後方連結data裡的user
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push("/login");
        }
      });
    }
  }
};
</script>
