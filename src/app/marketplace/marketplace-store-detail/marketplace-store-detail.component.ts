import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { environment } from '../../../environments/environment';
declare var $;
@Component({
  selector: 'app-marketplace-store-detail',
  templateUrl: './marketplace-store-detail.component.html',
  styleUrls: ['./marketplace-store-detail.component.css']
})
export class MarketplaceStoreDetailComponent implements OnInit {
  products = [];
  newprod
  rawProductList = [];
  supplier;
  offer;
  environment = environment;
  baseurl = environment.baseUrl.slice(0,-1)
  searchProduct = "";
  selectedProduct;
  ifOffer = false;
  routerChanged: boolean = true;
  cartproduct: any;
  newdata: any;
  totalquantity: any;
  constructor(
    private act: ActivatedRoute,
    private utils: UtilsService,
    private api: ApiService,
  ) {
    this.supplier = this.utils.get('supplier_details');
    this.offer = this.utils.get('Offer_details');
    if(this.supplier){
      setTimeout(() => {
        this.routerChanged=false;

      }, 1000);     }
    console.log("Sunpplier :", this.supplier);
    this.getSupplierData(this.supplier['_id']);
  }

  ngOnInit() {
    console.log(this.offer)
    this.utils.scrollToTop();
    var number = document.getElementById('number');

// Listen for input event on numInput.
number.onkeydown = function(e) {
    if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode == 8)) {
        return false;
    }
}
  }
  closemodal(){

  }
  
  getSupplierData(id){
    this.api.getSupplierData({supplier_id: id}).subscribe(
      data=> {
        this.products = data['response']['products'];
        console.log(this.products)
        if(this.products){
          this.routerChanged=false;
         }
        this.rawProductList = this.products;
        this.ifOffer = this.products.some(item=> {
          return item.offer != undefined
        })
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  markFavorite(sup){
    this.api.markSupplierFav({
      supplier_id: sup._id,
      is_fav: sup.is_fav == '1' ? 0 : 1
    }).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.supplier.is_fav = sup.is_fav == '1' ? 0 : 1;
      },
      error=> {
        this.utils.alert('error', error.error.message);
         
      }
    )
  }

  search(event){
    if(event == ""){
      this.products = this.rawProductList;
    } else {
      this.products = this.products.filter(item=> {
        return item.product_name.toLowerCase().trim().includes(event.toLowerCase().trim());
      });
    }
  }

  prod_model = 1;
  selectProduct(prod){
    this.selectedProduct = "";
    this.selectedProduct = prod;
    this.prod_model = 1;
  }

  addProdToCart(prod:any){
    if(this.prod_model == undefined || this.prod_model == 0 || this.prod_model == NaN){
      this.utils.alert('warn', 'Please enter a valid quantity.');
      return;
    }

    if(prod.product_quantity < this.prod_model){
      this.utils.alert('error', "Product Quantity not available");
      return;
    }

    
    console.log(prod)
    this.newprod = prod
        this.api.getCartData().subscribe(data=>{
          console.log(data)
          if(data['response']){
          this.cartproduct = data['response'].products
          console.log(this.cartproduct)
            this.newdata = this.cartproduct.filter((item: any) =>{
              return item.product_id._id == this.newprod._id
            }); 
              console.log(this.newdata)
              console.log("newdata")
              if(this.newdata !=''){
                console.log("newdata")
                this.totalquantity = this.newdata[0].quantity + this.prod_model
                console.log(this.totalquantity)
              }else{
                console.log(" not newdata")
                this.totalquantity = + this.prod_model
                console.log(this.totalquantity)
              }
              
              if(this.totalquantity>this.newprod.product_quantity){
                console.log("product not allowed")
                this.utils.alert('error', "Product Quantity not available");
                return;
              }
              else{
                console.log("should not come here")
                let supplier = this.utils.get('supplier_details');
                let dataToSend = {
                  supplier_id: supplier._id,
                  product_id: prod._id,
                  quantity: this.prod_model,
                  offer_id: prod.offer_id
                };
                this.api.addToCart(dataToSend).subscribe(
                  data=> {
                    console.log("add product")
                    this.prod_model = 0;
                    this.utils.alert('success', data['message']);
                    this.utils.addDisheToCart({updateCart: true});
                    $('#add').modal('hide');
                  },
                  error=> {
                    this.utils.alert('error', error.error.message);
                    console.log(" no add product")
                  }
                );
              }
          }
          else{
            console.log("should not come here")
            let supplier = this.utils.get('supplier_details');
            let dataToSend = {
              supplier_id: supplier._id,
              product_id: prod._id,
              quantity: this.prod_model,
              offer_id: prod.offer_id
            };
            this.api.addToCart(dataToSend).subscribe(
              data=> {
                console.log("add product")
                this.prod_model = 0;
                this.utils.alert('success', data['message']);
                this.utils.addDisheToCart({updateCart: true});
                $('#add').modal('hide');
              },
              error=> {
                this.utils.alert('error', error.error.message);
                console.log(" no add product")
              }
            );
          }
          
        },error=>{
          console.log("should not come here")
            let supplier = this.utils.get('supplier_details');
            let dataToSend = {
              supplier_id: supplier._id,
              product_id: prod._id,
              quantity: this.prod_model,
              offer_id: prod.offer_id
            };
            this.api.addToCart(dataToSend).subscribe(
              data=> {
                console.log("add product")
                this.prod_model = 0;
                this.utils.alert('success', data['message']);
                this.utils.addDisheToCart({updateCart: true});
                $('#add').modal('hide');
              },
              error=> {
                this.utils.alert('error', error.error.message);
                console.log(" no add product")
              }
            );
        })



      // this.api.getCartData().subscribe(
      //   data=> {
      //     if(data['response']){          
      //       this.products = data['response']['products'];
      //       var newdata = this.products.filter((item)=>{
      //         console.log(item)
      //         return item.product_id._id == this.newprod._id
      //       })
      //       console.log(newdata)
      //       console.log( this.newprod.product_quantity, newdata[0].quantity)
      //       if(this.newprod.product_quantity < newdata[0].quantity){
      //         this.utils.alert('error', "Product Quantity not available");
      //         return;
      //       }
      //     }
      //     console.log("should not come here")

      //   }
      //   )
      // console.log("should not come here")
      // let supplier = this.utils.get('supplier_details');
      // let dataToSend = {
      //   supplier_id: supplier._id,
      //   product_id: prod._id,
      //   quantity: this.prod_model,
      //   offer_id: prod.offer_id
      // };
      // this.api.addToCart(dataToSend).subscribe(
      //   data=> {
      //     console.log("add product")
      //     this.prod_model = 0;
      //     this.utils.alert('success', data['message']);
      //     this.utils.addDisheToCart({updateCart: true});
      //     $('#add').modal('hide');
      //   },
      //   error=> {
      //     this.utils.alert('error', error.error.message);
      //     console.log(" no add product")
      //   }
      // );
    
  }
}
