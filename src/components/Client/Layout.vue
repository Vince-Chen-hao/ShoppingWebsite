<template>
  <div>
    <Navbar />
    <Alert></Alert>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import Alert from "@/components/Alert";
import Footer from "./Footer";

export default {
  components: {
    Navbar,
    Alert,
    Footer
  },

  data() {
    return {};
  }
};

</script>