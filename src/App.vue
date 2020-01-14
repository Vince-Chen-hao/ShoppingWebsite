<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
    <router-view></router-view>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
    components: {
    HelloWorld
  },
  
  computed: {
    ...mapGetters(['isLoading']),

  },



};
</script>

<style lang="scss">
@import "./assets/all";
</style>


