<template>
  <div>
    <Navbar />
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Back/Sidebar.vue";
import Navbar from "@/components/Back/Navbar.vue";
import Alert from "@/components/Share/Alert.vue";

export default {
  components: {
    Sidebar,
    Navbar,
    Alert
  },
  data() {
    return {};
  }
};
</script>
