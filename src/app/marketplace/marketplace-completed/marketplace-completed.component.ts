import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { UtilsService } from 'src/app/service/utils.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-marketplace-completed',
  templateUrl: './marketplace-completed.component.html',
  styleUrls: ['./marketplace-completed.component.css']
})
export class MarketplaceCompletedComponent implements OnInit {

  baseUrl:string;
  CompletedOrders;

  constructor(private apis : ApiService,private utils: UtilsService) {
    
   }

  ngOnInit() {
    this.baseUrl = environment.baseUrl;
    this.getMyCompletedOrders();

  }

  getMyCompletedOrders(){
    this.apis.getOrdersList({order_status:"5"}).subscribe((res:any)=>{
      console.log("Data :",res['response']);
      this.CompletedOrders = res['response'];
    },(err:any)=>{
      this.utils.alert('error',err['error'].message);
    });
  }

}
