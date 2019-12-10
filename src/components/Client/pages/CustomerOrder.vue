<template>
    <div>
        <loading :active.sync="isLoading" ></loading>
        <div class="row mt-4">
            <div class="col-md-4 mb-4"  v-for="item in products" :key="item.id">
                <div class="card border-0 shadow-sm">
                    <div style="height: 400px; background-size: cover; background-position: center"
                    :style="{backgroundImage:`url(${item.imageUrl})`}"  
                    >
                    <!-- 插入連結的方式，上方為ES6反引號插入大括號的用法 -->

                    </div>
                    <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                    <h5 class="card-title">
                        <a href="#" class="text-dark">{{item.title}}</a>
                    </h5>
                    <p class="card-text">{{item.content}}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5" v-if="!item.price">{{item.origin_price}}</div>
                        <del class="h6" v-if="item.price">原價{{item.origin_price}}元</del>
                        <div class="h5" v-if="item.price">現在只要{{item.price}}元</div>
                    </div>
                    </div>
                    <div class="card-footer d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm"
                    @click ="getProduct(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                        查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto" 
                    @click="addtoCart(item.id)">
                        <i class="fas fa-spinner fa-spin " v-if="status.loadingItem === item.id"></i>
                        加到購物車
                    </button>
                    </div>
                </div>
                </div>

        </div>
        <!-- 購物車 -->
        <div class="my-5 row justify-content-center">
            <div class="my-5 row justify-content-center">
                <table class="table">
                <thead>
                    <th></th>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                </thead>
                <tbody >
                    <tr  v-for="item in cart.carts" :key="item.id" >
                    <td class="align-middle" >
                        <button type="button" class="btn btn-outline-danger btn-sm"
                        @click="removeCartItem(item.id)"
                        >
                        <i class="far fa-trash-alt" ></i>
                        </button>
                    </td>
                    <td class="align-middle">
                        {{ item.product.title }}
                        <!-- 套用優惠券則會顯示 -->
                        <div class="text-success" v-if="item.coupon">
                        已套用優惠券
                        </div>
                        
                    </td>
                    <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                    <td colspan="3" class="text-right">總計</td>
                    <td class="text-right">{{ cart.total  | currency}}</td>
                    </tr>
                    <tr v-if="cart.final_total !== cart.total">
                    <!-- 下方colspan是讓td表格欄位橫跨多列，有並列欄位的意思 -->
                    <td colspan="3" class="text-right text-success">折扣價</td>
                    <td class="text-right text-success">{{ cart.final_total | currency }}</td>
                    </tr> 
                </tfoot>
                </table>
                <div class="input-group mb-3 input-group-sm">
                    <input type="text" class="form-control" v-model="couponcode.code" placeholder="請輸入優惠碼">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="addCouponCode" >
                        套用優惠碼
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 取件人資料 -->

        <div class="my-5 row justify-content-center">
        <form class="col-md-6" @submit.prevent="createOrder">
            <div class="form-group">
                <label for="useremail">Email</label>
                <input type="email" class="form-control" name="email" id="useremail"
                v-validate="'required|email'"
                :class="{'is-invalid': errors.has('email')}"
                v-model="form.user.email" placeholder="請輸入 Email" >
                <span class="text-danger" v-if="errors.has('email')">
                {{ errors.first('email') }}
                </span>
               <!-- errors.first...為系統判別email格式是否正確 -->

            </div>
        
            <div class="form-group">
                <label for="username">收件人姓名</label>
                <!-- 下方:class{觸發紅色框框：條件} -->
                <!-- errors.has(對應name自定義命名) -->

                <input type="text" class="form-control" name="name" id="username"
                    :class="{'is-invalid': errors.has('name')}"  
                    v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名">
                <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
                </div>
        
            <div class="form-group">
            <label for="usertel">收件人電話</label>
                <input type="tel" class="form-control" name="tel" id="usertel" 
                :class="{'is-invalid': errors.has('tel')}"
                v-model="form.user.tel" placeholder="請輸入電話"
                v-validate="'required'" >
                <span class="text-danger" v-if="errors.has('tel')">電話必須輸入</span>
                </div>
        
            <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                placeholder="請輸入地址">
            </div>
        
            <div class="form-group">
            <label for="comment">留言</label>
            <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
            </div>
            <div class="text-right">
            <button class="btn btn-danger">送出訂單</button>
            </div>
        </form>
        </div>
        <!-- 單一產品卡片modal -->
        <div class="modal fade" id="productModal"
            tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{product.title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img :src="product.imageUrl" class="img-fluid" alt />
                    <blockquote class="blockquote mt-3">
                    <p class="mb-0">{{ product.content }}</p>
                    <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                    </blockquote>
                    <div class="d-flex justify-content-between align-items-baseline">
                    <del class="h6">原價 {{product.origin_price }}</del>
                    <div class="h5">現在只要 {{product.price}}</div>
                    </div>
                    <select class="form-control mt-3" v-model="product.num">
                    <option :value="num" v-for="num in 10" :key="num">
                        選購{{num}}{{product.unit}}
                    </option>
                    </select>
                </div>
                <div class="modal-footer">
                    <div class="text-muted text-nowrap mr-3">
                    小計
                    <strong>{{ product.num * product.price }}</strong> 元
                    </div>
                    <button type="button" class="btn btn-primary" 
                        @click="addtoCart(product.id , product.num)"
                     >加到購物車</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination';





export default {
    data(){
        return{
            products:[],
            product:{},
            status:{ //綁定瀏覽效果
                loadingItem:{}, //自定義名稱
            },
            cart: {},
            form:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    address:'',
                },
                message:'',
            },

            couponcode :{
                code:'',

            },
        
            isLoading: false,

        };
    },
    methods:{
        getProducts(){ 
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
            vm.isLoading = true;

            this.$http.get(api).then((response) => { 
                // console.log(response.data);
                vm.isLoading = false;
                vm.products = response.data.products; //將取得資料的products項目匯入data的空陣列裡

           });  
        },

        getProduct(id){ //click開啟model的動作，並取得既存資料
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
            vm.status.loadingItem =id;

            this.$http.get(api).then((response) => { 
                //console.log(response);
                vm.product = response.data.product; //將取得資料的products項目匯入data的空陣列裡
                $('#productModal').modal('show');
                vm.status.loadingItem ='';
           });  
        },


        addtoCart(id,qty = 1){ 
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            vm.status.loadingItem =id;
            const cart ={ //因後端API要求，將所需資料變成物件傳入
                product_id:id,
                qty,
            };
            this.$http.post(api,{data:cart}).then((response) => {  //依照API需求，載入data:
                vm.status.loadingItem ='';
                $('#productModal').modal('hide');
                vm.getCart(); //傳至Cart的主函式中，而非直接顯示在data變數上
           });  
        },

        getCart(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            vm.isLoading = true;

            this.$http.get(api).then((response) => { 
                console.log(response);
                vm.isLoading = false;
                vm.cart = response.data.data; 
           });  

        },

        removeCartItem(id){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            vm.isLoading = true;

            this.$http.delete(api).then(() => { 
                vm.isLoading = false;
                vm.getCart(); //回傳給主函式
            });  

        },
        addCouponCode(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
            const coupon =vm.couponcode;
        
            vm.isLoading = true;

            this.$http.post(api , {data:coupon}).then((response) => { 
                //console.log(response);
                vm.isLoading = false;
                vm.getCart();
            });  
        },
        
        createOrder(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
            const order = vm.form ;  
            //vm.isLoading = true;

            this.$validator.validate().then((valid) => {
                if (valid) {
                    this.$http.post(api , {data:order}).then((response) => { 
                        console.log("訂單已建立" , response);
                        if (response.data.success) {
                            vm.$router.push(`/customer_checkout/${response.data.orderId}`); //傳至路徑，取得後端資料庫裡的orderId
                        }
                        vm.isLoading = false;
                    });  
                } else {
                    console.log('欄位不完整');
                }
                });
            },
    },



    created(){ 
        this.getProducts();
        this.getCart();
    }
};
</script>