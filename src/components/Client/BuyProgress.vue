<template>
  <div>
    <div class="container mb-4 ">
      <div class="row justify-content-center" >
        <div class="col-3 text-center">
            <div class="bg-muted py-1" :class="{'bg-info text-white active': progess === '1'}">
                <strong>STEP 01</strong>
                <p class="h6">確認訂單資訊</p>
            </div>
        </div>
        <div class="col-3 text-center">
            <div class="bg-muted py-1" :class="{'bg-info text-white active ': progess === '2'}">
                <strong>STEP 02</strong>
                <p class="h6">輸入訂購資料</p>
            </div>
        </div>
        <div class="col-3 text-center">
            <div class="bg-muted py-1" :class="{'bg-info text-white active': progess === '3'}">
                <strong>STEP 03</strong>
                <p class="h6">付款/完成訂單</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['progess'],
};
</script>