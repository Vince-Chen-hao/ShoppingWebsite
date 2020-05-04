<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <td width="180">名稱</td>
          <td width="120">折扣百分比</td>
          <td width="140">到期日</td>
          <td width="100">是否啟用</td>
          <td width="130">編輯</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td class="text-left">{{ item.due_date }}</td>

          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">
                編輯
              </button>

              <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">
                刪除
              </button>
              <!-- 重點在於回傳item原有值，以告知程式刪除的特定資料 -->
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :page-props="pagination" @pagenum_emit="getCoupons"></Pagination>

    <!-- UpdataModel -->
    <div
      class="modal fade"
      id="couponsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group col-sm-12">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempcoupons.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-group col-sm-12">
                  <label for="code">優惠碼</label>
                  <input
                    type="text"
                    class="form-control"
                    id="code"
                    v-model="tempcoupons.code"
                    placeholder="請輸入優惠碼"
                  />
                </div>
                <div class="form-group col-sm-12">
                  <label for="due_date">到期日</label>
                  <input
                    type="date"
                    class="form-control"
                    id="due_date"
                    v-model="tempcoupons.due_date"
                    placeholder="請輸入到期日"
                  />
                </div>

                <div class="form-group col-sm-12">
                  <label for="percent">折扣百分比</label>
                  <input
                    type="percent"
                    class="form-control"
                    id="percent"
                    v-model="tempcoupons.percent"
                    placeholder="請輸入折扣百分比"
                  />
                </div>

                <div class="form-group col-sm-12">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempcoupons.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-info" data-dismiss="modal">
              關閉
            </button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">
              新增優惠券
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- DeleModal -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempcoupons.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-info" data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="delCoupon">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "@/components/Share/Pagination.vue";

export default {
  components: {
    Pagination
  },
  data() {
    return {
      coupons: [],
      tempcoupons: {},
      isNew: false,
      pagination: {},
      isLoading: false,
      is_enabled: 0
    };
  },
  methods: {
    getCoupons() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons`;
      const vm = this;
      vm.$store.dispatch("updateLoading", true);
      vm.$http.get(api).then(response => {
        vm.$store.dispatch("updateLoading", false);
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempcoupons = {};
        this.isNew = true;
      } else {
        this.tempcoupons = Object.assign({}, item); //es6語法，為了避免item與左方物件相同
        this.isNew = false;
      }

      $("#couponsModal").modal("show");
    },

    openDelModal(item) {
      const vm = this;
      vm.tempcoupons = item;
      $("#delCouponModal").modal("show");
    },

    delCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempcoupons.id}`;
      vm.$http.delete(api).then(response => {
        if (response.data.success) {
          $("#delCouponModal").modal("hide");
          vm.$bus.$emit("message:push", response.data.message, "danger");
          vm.getCoupons();
        } else {
          $("#delCouponModal").modal("hide");
          vm.getCoupons();
        }
      });
    },

    updateCoupon() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethod = "post";
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempcoupons.id}`;
        httpMethod = "put";
      }

      //使用post要依照API內容的建置來寫上匯入格式
      vm.$http[httpMethod](api, { data: vm.tempcoupons }).then(response => {
        if (response.data.success) {
          $("#couponsModal").modal("hide");
          vm.getCoupons();
          vm.$bus.$emit("message:push", response.data.message, "success");
        } else {
          $("#couponsModal").modal("hide");
          vm.getCoupons();
        }
      });
    }
  },
  created() {
    this.getCoupons();
  }
};
</script>
