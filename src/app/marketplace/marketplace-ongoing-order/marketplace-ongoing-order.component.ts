import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { UtilsService } from 'src/app/service/utils.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-marketplace-ongoing-order',
  templateUrl: './marketplace-ongoing-order.component.html',
  styleUrls: ['./marketplace-ongoing-order.component.css']
})
export class MarketplaceOngoingOrderComponent implements OnInit {

  OngoingOrders;
  baseUrl:string;
  // CancelledOrders;
  // CompletedOrders;
  routerChanged : boolean  = true
  constructor(private apis : ApiService,private utils: UtilsService) {
    
   }

  ngOnInit() {
    this.baseUrl = environment.baseUrl;
    this.getMyOngoingOrders();
    // this.getMyCancelledOrders();
    // this.getMyCompletedOrders();

  }

  getMyOngoingOrders(){
    this.apis.getOrdersList({order_status:[0,1,4]}).subscribe((res:any)=>{
      console.log("Data :",res['response']);
      this.OngoingOrders = res['response'];

      this.routerChanged=false;
       
    },(err:any)=>{
      this.utils.alert('error',err['error'].message);
    });
  }

  // getMyCancelledOrders(){
  //   this.apis.getOrdersList({}).subscribe((res:any)=>{
  //     console.log("Data :",res['response']);
  //     this.CancelledOrders = res['response'];
  //   },(err:any)=>{
  //     this.utils.alert('error',err['error'].message);
  //   });
  // }

  // getMyCompletedOrders(){
  //   this.apis.getOrdersList({}).subscribe((res:any)=>{
  //     console.log("Data :",res['response']);
  //     this.CompletedOrders = res['response'];
  //   },(err:any)=>{
  //     this.utils.alert('error',err['error'].message);
  //   });
  // }



}
