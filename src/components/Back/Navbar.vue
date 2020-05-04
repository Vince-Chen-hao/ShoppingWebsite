<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <div class="navbar-brand col-sm-3 col-md-2 mr-0">
        LifeHouse 訂單管理系統
      </div>
      <div class="d-flex ">
        <router-link class="nav-link text-white" to="/">品牌首頁</router-link>
        <a class="nav-link text-white" href="#" @click.prevent="signout">登出</a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },

  methods: {
    signout() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      vm.$http.post(api).then(response => {
        if (response.data.success) {
          vm.$router.push("/login");
        }
      });
    }
  }
};
</script>
