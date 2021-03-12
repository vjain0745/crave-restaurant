import { Component, OnInit ,ViewChild} from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { environment } from '../../../environments/environment';
declare var $: any;
export interface ongoing {
  userid: string;
  name: string;
  contact: number;
  email: string;
  Created:string;

}
@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.css']
})
export class PastOrdersComponent implements OnInit {

  private allUsers : any[];
  masterCopy =[]
  orderListsss: any[];

  orderList = [];
  pageIndex = 0
  pageSize:number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  length: number;

  displayedColumns: string[] = [ "OrderID", "Date","Time","TimeRequired","Price","PaymentMode","Status",'action'];
  displayColumns: string[] = [ "OrderID", "Date","Time","TimeRequired","Price","PaymentMode","Status",'action'];


  dataSource = new MatTableDataSource(this.orderList);
  dataresourseSource = new MatTableDataSource(this.orderListsss)
 
  page
  limit
 
  events: string[] = [];
  allUserListFilter:any
  allUserListEnd:any
  

  @ViewChild(MatPaginator, {static: false}) paginator1: MatPaginator;
  @ViewChild(MatPaginator, {static: false}) paginator2: MatPaginator;

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  rawOrderList = [];
  selectedRejectOrder;
  cancel_reason = "";
  custom_cancel_reason = '';
  status = [];
  routerChanged: boolean;
  constructor(
    private utils: UtilsService,
    private api: ApiService,
  ) {
    this.utils.scrollToTop();
    this.getOrderList(0);
  }

  ngOnInit() { 
    this.routerChanged = true;

    this.getOrders()
    this.getOrderList(1)
    // this.dataSource = new MatTableDataSource(this.orderList);
    // this.dataSource.paginator = this.paginator
    // this.dataSource.sort = this.sort;
  
    // Show the first tab by default
    // $('.tabs-stage div').hide();
    // $('.tabs-stage div:first').show();
    // $('.tabs-stage div:first .table-responsive').show();
    // $('.tabs-nav li:first').addClass('tab-active');
//background: #e42a4f;
//color: white;
    // Change tab class and display content
    // $('.tabs-nav a').on('click', function (event) {
    //   event.preventDefault();
    //   $('.tabs-nav li').removeClass('tab-active');
    //   $(this).parent().addClass('tab-active');
    //   $('.tabs-stage div').hide();
    //   $($(this).attr('href')).show();
    //   $($(this).attr('href')).find('.table-responsive').show();
    // });
    
  }

  filterArray = [];
  getOrderList(type){
    if(type == 0){
      this.status = [0,1,2,3,4,5];
      this.filterArray = [
        {id: 0, text: 'Pending'},
        {id: 1, text: 'accepted'},
        {id: 2, text: 'driver assigned'},
        {id: 3, text: 'ready'},
        {id: 4, text: 'order picked'},
        {id: 5, text: 'delayed'},
        {id: 9, text: 'Onroute To Restaurant'},
        {id: 10, text: 'Arrived At Restaurant'},
        {id: 11, text: 'Onroute to delivery location'},
        {id: 12, text: 'Arrived at delivery location'},
      ]
    } else {
      this.status = [6,7,8,13];
      this.filterArray = [
        {id: 6, text: 'Rejected By Restaurant'},
        {id: 7, text: 'Order Delivered'},
        {id: 8, text: 'Rejected By User'},
        {id: 13, text: 'Rejected By Admin'},

      ]
    }
    this.getOrders();
  }

  DataTable: any;
  getOrders(){
    // if (this.DataTable != undefined) {
    //   this.DataTable.destroy();
    // }
    this.api.getOrderList({ status: JSON.stringify(this.status) }).subscribe(
      data=> {

           {

            this.orderListsss = data['response'];
            
            //  $(".theme-loader").fadeOut(3000,function(){
               
            // })
            this.dataresourseSource = new MatTableDataSource(this.orderListsss);
            this.dataresourseSource.paginator = this.paginator2
            this.dataresourseSource.sort = this.sort;
      
              if(this.dataresourseSource){
                  this.routerChanged=false;
          
               }
      
            

      
           }
             
    
       // setTimeout(() => {
        //   if(this.status.findIndex(item => item == 7) != -1){
            // this.DataTable = $('#past-table').DataTable({
            //   info: true,
            // });
        //   } else {
            // this.DataTable = $('#live-table').DataTable({
            //   info: true,
            // });
        //   }
     //   }, 0);
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  // filterLiveOrder(event){
  //   if (this.DataTable != undefined) {
  //     this.DataTable.destroy();
  //   }
  //   let tag = event.target.value;
  //   this.orderList = this.rawOrderList; 
  //   if(tag != '') {
  //     this.orderList = this.orderList.filter(item=> {
  //       return item.order_status == tag;
  //     });
  //   } 
    // setTimeout(() => {
    //   if(this.status.findIndex(item => item == 7) != -1){
    //     this.DataTable = $('#past-table').DataTable({
    //       info: true,
    //     });
    //   } else {
    //     this.DataTable = $('#live-table').DataTable({
    //       info: true,
    //     });
    //   }
    // }, 0);
  //}

  selectRejectOrder(order){
    this.selectedRejectOrder = order;
  }

  rejectOrder(){
    if(this.cancel_reason == ''){
      this.utils.alert('warn', 'Please select a reason for order cancelation.');
      return;
    }
    if(this.cancel_reason == 'other' && this.custom_cancel_reason.trim() == ''){
      this.utils.alert('warn', 'Please enter a reason for order cancelation.');
      return;
    }
    // if(this.order_details?.scheduled_date > this.prev_day){
    //   this.utils.alert('warn', 'Your time was out to cancel the order.');
    //   return;
    // }

    this.api.changeOrderStatus({ 
      order_id: this.selectedRejectOrder._id, 
      status: 6,
      reason: this.cancel_reason == 'other' ? this.custom_cancel_reason : this.cancel_reason
    }).subscribe(
      data=> {
        $('#reason').modal('hide');
        this.utils.alert('success',data['message']);
        this.getOrders();
      },
      error=> {
        this.utils.alert('success',error.error.message);
        console.log(error);
         
      }
    );
  }

  orderStatus(code){
    return this.utils.orderStatus(code);
  }

  getPaymentMode(tag){
    return this.utils.paymentMode(tag);
  }
}
