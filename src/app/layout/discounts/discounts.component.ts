import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { UtilsService } from 'src/app/service/utils.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


export interface Offer {
  created_on: number,
  is_active: boolean,
  is_approved: boolean,
  modified_on: number,
  offer_image: String,
  offer_type: number,
  percentage_discount: number,
  restaurant_id: String,
  title: String,
  valid_from: number
  valid_to: number
  _id: String
}


@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {

  offerList:[];
  offerid: any;
  forFilter:string;
  fromFilter:any;
  toFilter:any;

  dataSource:MatTableDataSource<Offer>=new MatTableDataSource<any>();

  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild('paginator1',{static: true}) paginator: MatPaginator;

  userColumns: String[] = [
    'Sr.no',
    'Offer Id',
    'On Offer',
    'From',
    'To',
    'Status',
    'Action'
  ]

  pageIndex = 0
  pageSize:number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  length: number;
  allUserListFilter: never[];
  routerChanged: boolean = true;


  constructor(private api: ApiService,public utils: UtilsService) { }

  ngOnInit() {
    this.getOfferList();

    // this.dataSource.filterPredicate = (data, filter): boolean => {
    //   // const transformedFilter = filter.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    //   const transformedFilter = filter.trim().toLocaleLowerCase()
    //   return (data.title.toLowerCase().indexOf(transformedFilter) != -1);
    // }

  }

  filterDate(){
    if(this.fromFilter && !this.toFilter){
      
      var fromFilter = new Date(this.fromFilter).getTime();

      this.allUserListFilter = this.offerList.filter((item: any) =>
          item.valid_from >= fromFilter
      );
      this.dataSource = new MatTableDataSource(this.allUserListFilter);
      if(this.forFilter){
        this.dataSource.filter = this.forFilter.trim().toLowerCase();
      }
      
      this.dataSource.paginator = this.paginator;

    }else if(this.toFilter && !this.fromFilter){
      
      var toFilter = new Date(this.toFilter).getTime();
      
      this.allUserListFilter = this.offerList.filter((item: any) =>
          item.valid_to <= toFilter
      );
      this.dataSource = new MatTableDataSource(this.allUserListFilter);
      if(this.forFilter){
        this.dataSource.filter = this.forFilter.trim().toLowerCase();
      }
      this.dataSource.paginator = this.paginator;
    }else{
      var fromFilter = new Date(this.fromFilter).getTime();

      var toFilter = new Date(this.toFilter).getTime();

      this.allUserListFilter = this.offerList.filter((item: any) =>
          item.valid_to <= toFilter && item.valid_from >= fromFilter
      );
      this.dataSource = new MatTableDataSource(this.allUserListFilter);
      if(this.forFilter){
        this.dataSource.filter = this.forFilter.trim().toLowerCase();
      }
      this.dataSource.paginator = this.paginator;
    }

  }

  getOfferList(){
    this.api.getAllOffers().subscribe((res:any)=>{
      this.offerList=res.response;

      this.length = res['response'].length
      if(this.offerList){
                    
        setTimeout(() => {
          this.routerChanged=false;
  
        }, 1000);
           }
      this.dataSource = new MatTableDataSource(this.offerList);
      this.dataSource.paginator = this.paginator;

      this.dataSource.filterPredicate = (data, filter): boolean => {
        // const transformedFilter = filter.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const transformedFilter = filter.trim().toLocaleLowerCase()
        return (data.title.toLowerCase().indexOf(transformedFilter) != -1) || 
        (data._id.substr(-10).toLowerCase().indexOf(transformedFilter) != -1);
      }

      // this.dataSource.filterPredicate = function(data: any, filterValue: string) {
      //   // return data.title /** replace this with the column name you want to filter */
      //   debugger;
      //   return data.title.trim().toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0 || data._id.trim().toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
      // };
      // setTimeout(() => {
      //   this.dataSource.paginator = this.paginator;
      //   this.dataSource.sort = this.sort;
      // }, 500);
    },(err:any)=>{
      this.utils.alert('error',err.error.message);
    });
  }

  delete(offer_id){
    console.log(offer_id)
    this.offerid = {
       restaurantOffer_id :  offer_id
    }
  }
  deleteoffer(){
      this.api.deleteOffer(this.offerid).subscribe((res:any)=>{
        this.utils.alert('success',res.message);
      this.getOfferList()
    },(err:any)=>{
      this.utils.alert('error',err.error.message);
    });
  }

  updateActive(offer){

    this.api.activeInactiveOffer({restaurantOffer_id :  offer}).subscribe((res:any)=>{
      this.utils.alert('success',res.message);
      this.getOfferList()
    },(err:any)=>{
      this.utils.alert('error',err.error.message);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.forFilter = filterValue ;
    console.log("forFilter :",this.forFilter);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
