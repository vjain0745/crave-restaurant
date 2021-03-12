import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-marketplace-view-cancelled-order',
  templateUrl: './marketplace-view-cancelled-order.component.html',
  styleUrls: ['./marketplace-view-cancelled-order.component.css']
})
export class MarketplaceViewCancelledOrderComponent implements OnInit {

  orderId:string;
  productList:any;
  baseUrl:string;

  constructor(private route: ActivatedRoute,private api: ApiService) { }

  ngOnInit() {
    this.baseUrl = environment.baseUrl;
    this.route.paramMap.subscribe((data:any)=>{
      console.log("Data :",data.params.id);
      this.orderId = data.params.id;
    });

    if(this.orderId){
      this.api.getOrderDetail({order_id:this.orderId}).subscribe((req:any)=>{
        this.productList = req.response;

        // this.productList = {
          
        //   cancelation_reason: "",
        //   cart_discount: 239.37250000000003,
        //   coupon_discount: "0",
        //   created_on: 1600093327055,
        //   delivery_charge: 0,
        //   modified_on: 1600093327055,
        //   order_status: 1,
        //   payment_mode: 0,
        //   products: [
        //     {
        //       product_id: {_id:"5f5f411688911b2eb47ba737",product_name:"200 ml 1x48",product_type:null,product_description:"48x200ml",product_price_without_tax:20.815,product_images:["/product_images/18b52808797837a41643f54e491fca6a.jpeg"]},
        //       offer_price: 23.97250000000002,
        //       quantity: 10,
        //       unit: "box",
        //       unit_price: 23.978750000000002,
        //     },{
        //       product_id: {_id:"5f5f411688911b2eb47ba737",product_name:"200 ml 1x48",product_type:null,product_description:"48x200ml",product_price_without_tax:20.815,product_images:["/product_images/18b52808797837a41643f54e491fca6a.jpeg"]},
        //       offer_price: 23.937250000000002,
        //       quantity: 10,
        //       unit: "box",
        //       unit_price: 23.937250000000002,
        //     },{
        //       product_id: {_id:"5f5f411688911b2eb47ba737",product_name:"200 ml 1x48",product_type:null,product_description:"48x200ml",product_price_without_tax:20.815,product_images:["/product_images/18b52808797837a41643f54e491fca6a.jpeg"]},
        //       offer_price: 23.937250000000002,
        //       quantity: 10,
        //       unit: "box",
        //       unit_price: 23.937250000000002,
        //     }
        //   ]
        // }

        console.log("Product List: ",this.productList);
      },(err:any)=>{
        console.log("error:",err.error.message);
      });
    }

  }

}
