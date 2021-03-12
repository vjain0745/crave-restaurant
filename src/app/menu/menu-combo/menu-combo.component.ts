import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { environment } from '../../../environments/environment';
declare var $;
@Component({
  selector: 'app-menu-combo',
  templateUrl: './menu-combo.component.html',
  styleUrls: ['./menu-combo.component.css']
})
export class MenuComboComponent implements OnInit {
  dishes = [];
  combos = [];
  environment = environment;
  constructor(
    private utils: UtilsService,
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.getDishList();
    this.getCombosList();
  }

  getDishList(){
    this.api.getApprovedDishes().subscribe(
      data=> {
        this.dishes = data['response'];
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  mark(dish){
    this.api.setRecommendedDish({
      dish_id: dish._id,
      status: dish.is_recommended == 1 ? 0 : 1
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

  markCombo(combo){
    this.api.setRecommendedCombo({
      combo_id: combo._id,
      status: combo.is_recommended == 1 ? 0 : 1
    }).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.getCombosList();
      },
      error=> {
        console.log(error);
         
      }
    );
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

  getCombosList(){
    this.api.getCombos().subscribe(
      data=> {
        this.combos = data['response'];
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  selectedDeleteCombo;
  selectDeleteCombo(combo){
    this.selectedDeleteCombo = combo;
  }

  deleteCombo(){
    this.api.deleteCombo({
      combo_id: this.selectedDeleteCombo._id
    }).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.getCombosList();
      },
      error=> {
        console.log(error);
         
      }
    );
  }
}
