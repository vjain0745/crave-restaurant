import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from 'src/app/service/api.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-marketplace-cancelled',
  templateUrl: './marketplace-cancelled.component.html',
  styleUrls: ['./marketplace-cancelled.component.css']
})
export class MarketplaceCancelledComponent implements OnInit {

  CancelledOrders;
  baseUrl:string;
  
  constructor(private apis : ApiService,private utils: UtilsService) { }

  ngOnInit() {

    this.baseUrl = environment.baseUrl;
    this.getMyCancelledOrders();

  }

  getMyCancelledOrders(){
    this.apis.getOrdersList({order_status:[2,3]}).subscribe((res:any)=>{
      console.log("Data :",res['response']);
      this.CancelledOrders = res['response'];
    },(err:any)=>{
      this.utils.alert('error',err['error'].message);
    });
  }

}
