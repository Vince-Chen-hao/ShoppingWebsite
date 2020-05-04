<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isLoading"])
  }
};
</script>

<style lang="scss">
@import "./assets/scss/all.scss";
#app {
  font-family: serif;
}
</style>
