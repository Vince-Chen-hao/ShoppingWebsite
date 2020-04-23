<template>
  <div>
    <footer >
      <div class="bg-light">
        <!-- <ul class="d-md-flex footer" >
          <li>
            <h4 class="footer-title">About</h4>
            <p class="text-muted">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos perspiciatis.
            </p>
          </li>
          <li >
            <h4 class="footer-title">Contact Us</h4>
            <ul style="list-style-type:none">
              <li>
                <a href="tel:+1234567890" class="text-muted">TEL： 022425123</a>
              </li>
              <li>
                <a href="mailto:carolshop@mail.com" class="text-muted">
                  Mail： vinceshop@mail.com
                </a>  
              </li>
              <li class="text-muted">
                Address： 台北市中正區XXXXXXXXXX
              </li>
            </ul>
          </li>
          <li>
            <h4 class="footer-title">Follow Us</h4>
            <ul style="list-style-type:none">
              <li >
                <a href="#" class="text-primary">
                  <span class="fa-stack fa-lg">
                    <i class="fab fa-facebook-square icon-size pr-2 "></i>
                  </span>
                </a>
                <a href="#" class="text-primary" >
                  <span class="fa-stack fa-lg">
                    <i class="fab fa-twitter   icon-size pr-2" ></i>
                  </span>
                </a>
                <img src="../../assets/images/google_play.png" /> 
                

              </li>
              <li >
                <a href="#" class="text-primary">
                  <span class="fa-stack fa-lg">
                    <i class="fab fa-github-alt text-dark icon-size mr-2"></i>
                  </span>
                </a>
                <a href="#" class="text-primary">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-envelope text-primary icon-size mr-2"></i>
                  </span>
                </a>
                <img src="../../assets/images/app_store.png" />
              </li>
            </ul>
          </li>
        </ul> -->
      <div class="copyright" >
        ⓒ Copyright 2020 LifeHouseShop
        <div class="text-center" >
        僅作為個人作品，無任何商業用途
        </div>
      </div>
      </div>
    </footer>
  </div>
</template>



<style scoped lang="scss">
//@import './assets/all.scss';


// footer
.footer {
  margin: 0rem;
  padding: 2rem 2rem 0;
  line-height: 1.5rem;
  > li {
    flex: 1 1 0;
    margin-bottom: 2rem;
    text-align: center;
    list-style: none;

  };

}

.footer-title {
  margin-bottom: 1.25rem;
  font-weight: bold;
}
.copyright {
  padding: 1rem 0;
  border-top: 1px solid #ccc;
  text-align: center;
}
.fa-twitter{
  color:blue

}
</style>