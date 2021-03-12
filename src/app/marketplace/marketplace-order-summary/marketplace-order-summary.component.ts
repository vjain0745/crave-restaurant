import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-marketplace-order-summary',
  templateUrl: './marketplace-order-summary.component.html',
  styleUrls: ['./marketplace-order-summary.component.css']
})
export class MarketplaceOrderSummaryComponent implements OnInit {

  supplier;
  products : any;
  environment = environment;
  baseurl = environment.baseUrl
  baseURL = environment.baseUrl.slice(0,-1)
  sub_total = 0;
  today = new Date();
  timeSlot = [1,2,3,4];

  lat = "";
  long = "";
  location_str = "";

  addressList = [];
  routerChanged: boolean = true;
  totaltax: any;
  item_count: number;
  discount_total: any;
  constructor(
    public utils: UtilsService,
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.utils.scrollToTop();
    this.getCartData();
    this.getPromocodes();
    this.getAddresses();
  }

  getCartData(){
    this.api.getCartData().subscribe(
      data=> {
        this.supplier = data['response']['supplier'];
        this.products = data['response']['products'];
        this.supplier.rating = 4;
        this.totaltax = 0
        this.item_count = 0;
        console.log( this.products)
        this.sub_total = this.products.reduce((a,b)=> { 
            
          let price_after_discount = 0;
           var tax_price = 0
          if(b.offer_id.length > 0){
            if(b.offer_id[0].offer_type == 0){
              price_after_discount = b.quantity * b.product_id.product_price;
              tax_price = (b.product_id.product_price - b.product_id.product_price_without_tax) * (b.quantity)
            } else if(b.offer_id[0].offer_type == 1) {
              price_after_discount = b.quantity * b.product_id.product_price;
              tax_price = (b.product_id.product_price - b.product_id.product_price_without_tax ) * (b.quantity)
            } else if(b.offer_id[0].offer_type == 2) {
              let extra_qty = Math.floor(b.quantity / (b.offer_id[0].multibuy_discount_buy / b.offer_id[0].multibuy_discount_get));
              console.log("Quantity : ",b.quantity , extra_qty);
              price_after_discount = b.product_id.product_price * (b.quantity);
              tax_price = (b.product_id.product_price - b.product_id.product_price_without_tax) * (b.quantity)
            }
          } else {
            price_after_discount = b.quantity * b.product_id.product_price;
            tax_price = (b.product_id.product_price - b.product_id.product_price_without_tax) * (b.quantity)
          }
          console.log(tax_price)

          this.totaltax = this.totaltax + tax_price
          console.log(this.totaltax)
          this.item_count = this.item_count + b.quantity;
          console.log(price_after_discount , a)
          return a + price_after_discount;
        },0);
        this.calculateDiscount();

        this.grand_total = this.sub_total ;


    if(this.products){
                    
            
      this.routerChanged=false;
     }
      },
      error=> {
        console.log(error);
         
      }
    );
  }
  calculateDiscount(){
    this.discount_total = this.products.reduce((a,b)=> {
      let discounted_price = 0;
      let price = 0;
      if(b.offer_id.length > 0){
        if(b.offer_id[0].offer_type == 0){
          discounted_price = b.offer_id[0].price_discount;
          price = (b.quantity * discounted_price);
        } else if(b.offer_id[0].offer_type == 1) {
          discounted_price = (b.product_id.product_price * b.offer_id[0].percentage_discount) / 100;
          price = (b.quantity * discounted_price);
        } else if(b.offer_id[0].offer_type == 2) {
          if(b.quantity >= b.offer_id[0].multibuy_discount_buy ){
            var dta = Math.floor(b.quantity / b.offer_id[0].multibuy_discount_buy)

            if(b.quantity % b.offer_id[0].multibuy_discount_buy == 0){
              price = b.product_id.product_price * b.offer_id[0].multibuy_discount_get * dta
            }
            else{
              price = b.product_id.product_price * b.offer_id[0].multibuy_discount_get * dta;
            }

          }
          else{
          price = 0
          }
          // let extra_qty = Math.floor(b.quantity / (b.offer_id[0].multibuy_discount_buy / b.offer_id[0].multibuy_discount_get));
          // console.log(extra_qty , b.quantity)
          // price = b.product_id.product_price * extra_qty;
        }
      }
      console.log("new prac", a , price)
      return a + price;
    },0);
  }
  
  getDate(ind){
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + +ind);
    return tomorrow;
  }

  placeOrder(){
    if(!this.scheduledDate){
      this.utils.alert('warn', 'Please select a date for delivery.');
      return;
    }

    if(!this.scheduledTime){
      this.utils.alert('warn', 'Please select a time for delivery.');
      return;
    }

    if(!this.selectedAddress){
      this.utils.alert('warn', 'Please select a address for delivery.');
      return;
    }

    let dataToSend = {
      scheduled_date: this.scheduledDate.getTime(),
      time_slot: this.scheduledTime,
      address: this.selectedAddress._id,
      delivery_charge: 0,
      supplier_id: this.supplier._id, final_amount: this.grand_total ,
       final_discount : this.discount_total + this.promoDiscount ,
        discount_without_cuopon : this.discount_total 
    }
    if(this.selectedPromo) dataToSend['applied_coupon'] = this.selectedPromo._id

    this.api.placeOrder(dataToSend).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.router.navigate(['/marketplace/marketplace-payment-gateway', {id: data['response']._id }]);
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  calendar(){
    $('#calendar').modal('show');
  }

  calendarOptions = {};

  // calendarValue = null;

  onChooseDate(date: any) {
    this.scheduledDate = new Date(date);
    $('#calendar').modal('hide');
    $('[name="time-slot"]').prop('checked', false);
  }

  coupons = [];
  getPromocodes(){
    this.api.getCouponsList().subscribe(
      data=> {
        this.coupons = data['response'];
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  selectedAddress;
  selectAddress(address){
    if(this.addressList.length == 1){
      this.selectedAddress = address;

    }

    this.selectedAddress = address;
  }

  scheduledDate;
  scheduledTime;
  getScheduleDate(event){
    this.scheduledDate = this.getDate(event.target.value);
  }

  selectTiming(event){
    this.scheduledTime =  event.target.value;
  }

  selectEditAddress(address){
    this.router.navigate(['home/add-address', {id: address._id}]);
  }

  deleteAddress(){
    this.api.deleteAddress({ address_id: this.selectedAddress._id }).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.getAddresses();
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  selectedPromo;
  promoDiscount = 0;
  grand_total = this.sub_total;
  applyCoupon(promo){
    this.selectedPromo = promo;
    this.api.applyCoupon({ promo_id: this.selectedPromo._id }).subscribe(
      data=> {
        console.log("12345",data)
        this.utils.alert('success', data['message']);
        this.promoDiscount = 0;
        if(this.selectedPromo.offer_type == 0){
          this.promoDiscount = (this.sub_total * this.selectedPromo.discount) / 100;
        } else {
          console.log("12345",this.selectedPromo.discount)

          this.promoDiscount = this.selectedPromo.discount;
        }
        if(this.promoDiscount > this.selectedPromo.discount_limit) this.promoDiscount = this.selectedPromo.discount_limit;
        this.grand_total = this.sub_total ;
        $('#coupon').modal('hide');
      },
      error=> {
        console.log(error);
        this.selectedPromo = undefined;
        this.utils.alert('error', error.error.message);
         
      }
    );

    // if(this.selectedPromo == undefined){
    //   this.selectedPromo = promo;
    //   if(this.selectedPromo.offer_type == 0){
    //     this.grand_total = this.sub_total - ((this.sub_total * this.selectedPromo.discount) / 100);
    //   } else {
    //     this.grand_total = this.sub_total - this.selectedPromo.discount;
    //   }
    // } else {
    //   this.utils.alert('warn', 'A coupon is already applied on this order.');
    //   return;
    // }
  }

  removePromo(){
    this.selectedPromo = undefined;
    this.getCartData();
  }

  getAddresses(){
    this.api.getAddressList().subscribe(
      data=> {
        this.addressList = data['response'];
        setTimeout(()=> {
          this.addressList.map(item=> {
            if(item.is_default) {
              $('input:radio[value='+item._id+']')[0].checked = true;
              this.selectedAddress = item;
            }
          });
        }, 100);
      },
      error=> {
        console.log(error);
         
      }
    );
  }
}
