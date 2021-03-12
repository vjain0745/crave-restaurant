import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { environment } from '../../../environments/environment';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-marketplace-view-ongoin-order',
  templateUrl: './marketplace-view-ongoin-order.component.html',
  styleUrls: ['./marketplace-view-ongoin-order.component.css']
})
export class MarketplaceViewOngoinOrderComponent implements OnInit {

  orderId:string;
  productList:any;
  baseUrl:string;

  constructor(private route: ActivatedRoute,private router:Router ,private api: ApiService,private utils: UtilsService) { }

  ngOnInit() {
    this.baseUrl = environment.baseUrl;
    this.route.paramMap.subscribe((data:any)=>{
      console.log("Data :",data.params.id);
      this.orderId = data.params.id;
    });
    if(this.orderId){
      this.api.getOrderDetail({order_id:this.orderId}).subscribe((res:any)=>{
        this.productList = res.response;
        console.log("Product List: ",this.productList);
      },(err:any)=>{
        console.log("error:",err.error.message);
      });
    }
  }

  cancelOrder(){
    this.api.cancelOrder({order_id:this.orderId}).subscribe((res:any)=>{
      this.router.navigateByUrl('/marketplace/marketplace-ongoing-order');
      this.utils.alert('success',res.message);
      
    },(err)=>{
      console.log("error:",err.error.message);
    });
  }

}
