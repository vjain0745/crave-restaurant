import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
@Component({
  selector: 'app-menu-my-listings',
  templateUrl: './menu-my-listings.component.html',
  styleUrls: ['./menu-my-listings.component.css']
})
export class MenuMyListingsComponent implements OnInit {
  dishes = [];
  status = 0;
  constructor(
    private utils: UtilsService,
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.utils.scrollToTop();
    this.getDishList();
  }

  getDishList(){
    this.api.getDishList({
      status: this.status
    }).subscribe(
      data=> {
        this.dishes = data['response'];
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  refreshList(event){
    this.getDishList();
  }

  selectedDeleteFood;
  selectDeleteDish(food){
    this.selectedDeleteFood = food;
  }

  deleteDish(){
    this.api.deleteDish({
      dish_id: this.selectedDeleteFood._id
    }).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.getDishList();
      },
      error=> {
        console.log(error);
         
      }
    );
  }
}
