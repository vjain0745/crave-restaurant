import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
declare var $;
@Component({
  selector: 'app-marketplace-payment-gateway',
  templateUrl: './marketplace-payment-gateway.component.html',
  styleUrls: ['./marketplace-payment-gateway.component.css']
})
export class MarketplacePaymentGatewayComponent implements OnInit {
  orderID;
  order;
  payment_mode = '0';
  constructor(
    private utils: UtilsService,
    private api: ApiService,
    private router: ActivatedRoute,
  ) {
    this.router.params.subscribe(
      data=> {
        this.orderID = data.id;
        this.getOrderDetails();
      }
      );
  }
    
  ngOnInit() {
  }
  
  getOrderDetails(){
    this.api.getOrderDetails({ order_id: this.orderID }).subscribe(
      data=> {
        this.order = data['response'];
      },
      error=> {
        console.log(error);
         
      }
    );
  }
  
  payNow(){
    this.api.processPayment({
      order_id: this.orderID,
      payment_mode: this.payment_mode
    }).subscribe(
      data=> {
        $('#done').modal('show');
      },
      error=> {
        console.log(error);
        debugger
      }
    );
  }

  goHome(){
    $('#done').modal('hide');
    this.utils.goto("/dashboard");
  }

}
