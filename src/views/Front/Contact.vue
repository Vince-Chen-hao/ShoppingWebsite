<template>
  <div class="section-full-height">
    <div class="container">
      <div class="shop-bg mb-4"></div>
      <div class="text-center p-4" style="font-size:15px">
        <p>
          從今天開始，不同於網路的快速方便，踱步到實體展示店，也成了另一種直接感受好物件的選擇
        </p>
        <p>
          用指尖感受產品的重量與溫度，也讓我們輕輕訴說關於它們的故事後，領著它回家，如此的美好就更完整
        </p>
      </div>
    </div>

    <div class="bg-light">
      <div class="container">
        <div class="store-map row justify-content-center my-4">
          <div class="col-lg-6 align-self-center mt-3">
            <div class="text-center h3"><i class="fas fa-store"></i> 門市資訊</div>
            <hr />
            <div class="text-center m-4">
              <div class="h5 pb-2">中正品牌概念店</div>
              <a
                class="text-dark"
                href="https://www.google.com/maps?ll=25.028642,121.514732&z=16&t=m&hl=zh-TW&gl=TW&mapclient=embed&q=100%E5%8F%B0%E5%8C%97%E5%B8%82%E4%B8%AD%E6%AD%A3%E5%8D%80%E9%87%8D%E6%85%B6%E5%8D%97%E8%B7%AF%E4%B8%89%E6%AE%B526%E5%B7%B717%E8%99%9F"
              >
                <i class="fas fa-map-marker-alt"></i>
                地址：台北市中正區重慶南路三段 26 巷 17 號
              </a>
              <p class="mt-3"><i class="fas fa-phone-alt"></i> 電話：(02)2523-9811</p>
              <p>營業時間：週一 ～ 週日 10:00 - 21:00</p>
            </div>
          </div>
          <div class="col-lg-6 py-3">
            <iframe
              class="border rounded"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.159909317019!2d121.51254331498771!3d25.02864674466002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9980d1ae495%3A0x554a6e44e626fa88!2zMTAw5Y-w5YyX5biC5Lit5q2j5Y2A6YeN5oW25Y2X6Lev5LiJ5q61Mjblt7cxN-iZnw!5e0!3m2!1szh-TW!2stw!4v1587471396627!5m2!1szh-TW!2stw"
              width="520"
              height="320"
              frameborder="0"
              style="border:0;"
              allowfullscreen
              aria-hidden="false"
              tabindex="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <h3 class="mt-5">店內實景</h3>
      <hr />
      <img
        class="img-fluid my-4"
        src="https://www.storemarais.com/media/384ebdb5-7b73-4980-adc5-f3caffd36068.jpg"
        alt
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productsHeaderData: {
        title: "門市位置",
        imgUrl:
          "https://images.unsplash.com/photo-1494203484021-3c454daf695d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      }
    };
  }
};
</script>

<style lang="scss">
.shop-bg {
  background-image: url("https://www.storemarais.com/media/0c7ed483-18a1-45c5-92a5-4e8f5c8fb078.jpg");
  background-position: center center;
  background-size: cover;
  height: 500px;
}

.store-map {
  border-top: 1px dashed rgb(206, 204, 201);
  border-bottom: 1px dashed rgb(206, 204, 201);
}
</style>
