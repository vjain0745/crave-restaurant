import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';

declare var $;
declare var Math;
@Component({
  selector: 'app-marketplace-cart',
  templateUrl: './marketplace-cart.component.html',
  styleUrls: ['./marketplace-cart.component.css']
})
export class MarketplaceCartComponent implements OnInit {
  supplier;
  products : any;
  environment = environment;
  baseurl = environment.baseUrl.slice(0,-1)
  
  sub_total = 0;
  discount_total = 0;
  currentDate = new Date().getTime();
  item_count = 0;
  routerChanged: boolean = true;
  totaltax: number;

  constructor(
    private utils: UtilsService,
    private api: ApiService,
  ) { 

  }

  ngOnInit() {
    this.utils.scrollToTop();
    this.getCartData();
  }
  
  getCartData(){
    this.api.getCartData().subscribe(
      data=> {
        this.item_count = 0;
        this.totaltax = 0;
        if(data['response']){
          this.supplier = data['response']['supplier'];
          
          this.products = data['response']['products'];
          this.supplier.rating = 4;
          console.log(this.products)

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
        } else {
          this.supplier = {};
          this.products = [];
        }

        if(this.supplier){
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

  checkout(){
    let isAnyOfferExpired = this.products.some(prod=> {
      return (prod.offer_id.length > 0 && prod.offer_id[0].valid_to < this.currentDate);
    });
    if(isAnyOfferExpired){
      this.utils.alert('warn', 'Offer on a product is already expired, please remove & re-add that product.');
      return;
    }
    this.utils.goto('/marketplace/marketplace-order-summary');
  }

  decreaseQty(product:any){
    let supplier = this.supplier;//this.utils.get('supplier_details');
    if(qty == 0){
      this.removeProduct(product);
    } else {
      var qty = -1;
      let dataToSend:any = {
        supplier_id: supplier._id,
        product_id: product.product_id._id,
        quantity: qty
      };
      if(product.offer_id.length > 0) dataToSend['offer_id'] = product.offer_id[0]._id
      this.api.addToCart(dataToSend).subscribe(
        data=> {
          if(product.quantity <= 1){
            this.removeProduct(product);
          }
          this.utils.alert('success', data['message']);
          this.utils.addDisheToCart({updateCart: true});
          this.getCartData();
        },
        error=> {
          this.utils.alert('error', error.error.message);
           
        }
      );
    }
  }

  removeProduct(product){
    this.api.removeDishFromCart({
      product_id: product.product_id._id,
    }).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.utils.addDisheToCart({updateCart: true});
        this.getCartData();
      },
      error=> {
        console.log(error);
         
      }
    );
  }
  
  increaseQty(product){
   //let supplier = this.utils.get('supplier_details');
   if(product.product_id.product_quantity <= product.quantity ){
    this.utils.alert('error', "Product Quantity not available");
    return false;
  }
   let supplier = this.supplier;
    let qty = 1;
    let dataToSend = {
      supplier_id: supplier._id,
      product_id: product.product_id._id,
      quantity: qty
    };
    if(product.offer_id.length > 0) dataToSend['offer_id'] = product.offer_id[0]._id

    this.api.addToCart(dataToSend).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.utils.addDisheToCart({updateCart: true});
        this.getCartData();
      },
      error=> {
        this.utils.alert('error', error.error.message);
         
      }
    );
  }

}
