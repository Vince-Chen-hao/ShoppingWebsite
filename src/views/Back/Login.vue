<template>
  <div>
    <div>
      <nav class="navbar navbar-light flex-md-nowrap p-0 shadow" style="background-color: #165d6e">
        <div class="navbar-brand text-white col-sm-3 col-md-2 mr-0">
          LifeHouse 訂單管理系統
        </div>
        <div class="d-flex ">
          <router-link class="nav-link text-white" to="/">品牌首頁</router-link>
          <router-link class="nav-link text-white" to="/login">登出</router-link>
        </div>
      </nav>
    </div>
    <form class="form-signin mt-5" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal ">訂單後台管理中心</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="請輸入管理員信箱"
        v-model="user.username"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="請輸入密碼"
        v-model="user.password"
        required
      />
      <div class="checkbox mb-3">
        <label> <input type="checkbox" value="remember-me" /> 記住我 </label>
      </div>
      <button class="btn btn-lg btn-info btn-block" type="submit">登入</button>
      <p class="mt-5 mb-3 text-muted">ⓒ Copyright 2020 LifeHouseShop</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`; //依登入api說明新增(左：路徑，右：API功能)
      const vm = this;
      vm.$http.post(api, vm.user).then(response => {
        if (response.data.success) {
          vm.$router.push("/admin/products");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  color: blue($color: #165d6e);
}
</style>
