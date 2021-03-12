import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  suppliers = [];
  environment = environment;
  routerChanged: boolean = true;
  constructor(
    private utils: UtilsService,
    private api: ApiService,
    private router: Router,
  ) {
    this.getSuppliers();
  }
  
  getSuppliers(){
    this.api.getFavSuppliers().subscribe(
      data=> {
        this.suppliers = data['response'];
        if(this.suppliers){
                    
            this.routerChanged=false;
    
             }
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  openSupplierDetails(sup){
    this.utils.set('supplier_details', sup);
    this.router.navigateByUrl('/marketplace/marketplace-store-detail');
  }

  markFavorite(sup) {
    this.api.markSupplierFav({
      supplier_id: sup._id,
      is_fav: sup.is_fav == '1' ? 0 : 1
    }).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.getSuppliers();
      },
      error=> {
        this.utils.alert('error', error.error.message);
         
      }
    )
  }

  ngOnInit() {
    this.utils.scrollToTop();
  }

}
