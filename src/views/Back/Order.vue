<template>
  <div>
    <table class="table mt-4">
      <thead>
        <tr>
          <td width="120">購買時間</td>
          <td width="120">Email</td>
          <td width="120">購買款項</td>
          <td width="120">應付金額</td>
          <td width="80">是否付款</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, key) in sortOrder"
          :key="key"
          :class="{ 'text-secondary': !item.is_paid }"
        >
          <td>{{ item.create_at | date }}</td>
          <td>
            <span v-text="item.user.email" v-if="item.user"></span>
          </td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-center">{{ item.total | currency }}</td>
          <td>
            <span v-if="item.is_paid" class="text-success">付款</span>
            <span v-else class="text-muted">未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pageProps="pagination" @pagenum_emit="getOrders"></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/Share/Pagination.vue";

export default {
  components: {
    Pagination
  },

  data() {
    return {
      orders: [],
      isNew: false,
      pagination: {}
    };
  },

  methods: {
    getOrders(page = 1) {
      //ES6預設值，如無代數值便會使用原先1，如有帶入參數則用參數值
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      vm.$store.dispatch("updateLoading", true);

      vm.$http.get(api, vm.tempProduct).then(response => {
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.$store.dispatch("updateLoading", false);
      });
    }
  },
  computed: {
    sortOrder() {
      const vm = this;
      let newOrder = [];
      if (vm.orders.length) {
        newOrder = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0;
          const bIsPaid = b.is_paid ? 1 : 0;
          return bIsPaid - aIsPaid;
        });
      }
      return newOrder;
    }
  },

  created() {
    this.getOrders();
  }
};
</script>
