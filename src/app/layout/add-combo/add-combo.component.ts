import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
declare var $;
@Component({
  selector: 'app-add-combo',
  templateUrl: './add-combo.component.html',
  styleUrls: ['./add-combo.component.css']
})
export class AddComboComponent implements OnInit {
  dishes = [];
  selectedDishes = [];
  environment = environment;

  edit:boolean = false;
  combo_id;
  comboDetails;
  constructor(
    private utils: UtilsService,
    private api: ApiService,
    private act: ActivatedRoute,
  ) {
    this.act.params.subscribe(data=> {
      if(data.id){ 
        this.edit = true;
        this.combo_id = data.id;
        this.getComboDetails()
      }
    });
  }

  ngOnInit() {
    this.utils.scrollToTop();
    this.getDishList();
  }

  getComboDetails(){
    this.api.getComboDetails({ combo_id: this.combo_id }).subscribe(
      data=> {
        this.comboDetails = data['response'];
        console.log(this.comboDetails['dish_list'])
        this.comboDetails['dish_list'].map(item=> {
          setTimeout(()=>{
            $('[name='+item.dish_id._id+']').prop('checked', true); 
          }, 1000); 
          item.dish_id.quantity = item.dish_qty;
          this.selectDish( {target: {checked: true }}, item.dish_id, ()=> {
            setTimeout(()=> {
              this.selectVarient({ target: { value: item.dish_varient ? item.dish_varient._id : ''} }, item.dish_id);
              $('#vari_'+item.dish_id._id).val(item.dish_varient._id);
            }, 1000);
          });
        })
      },
      error=> {
        console.log(error);
         
      },
    );
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

  selectDish(event, dish, callback){
    if(event.target.checked){
      if(dish.quantity == undefined) dish.quantity = 1;
      this.selectedDishes.push(dish);
      this.populateVarient(dish);
    } else {
      let index = this.selectedDishes.findIndex(item=> {
        return item._id == dish._id;
      });
      this.selectedDishes.splice(index, 1);
    }

    if(callback) callback();
  }

  populateVarient(dish){
    this.api.getDishVarients({ dish_id: dish._id }).subscribe(
      data=> {
        let index = this.selectedDishes.findIndex(item=> {
          return item._id == dish._id;
        });
        this.selectedDishes[index].varients = data['response']['varient'];
      },
      error=> {
        console.log(error);
         
        this.utils.alert('error', error.error.message);
      }
    )
  }

  decreaseQty(dish){
    if(dish.quantity <= 1) return;
    dish.quantity--;
  }

  increaseQty(dish){
    if(dish.quantity >= 10) return;
    dish.quantity++;
  }

  selectVarient(event, dish){
    let varient_id = event.target.value;
    if(varient_id == '') return;
    let selectedVarient = dish.varients.find(item=> {
      return item._id == varient_id;
    });
    dish.selectedVarient = selectedVarient;
  }

  remove(dish){
    $('[name='+dish._id+']').prop('checked', false);
    let index = this.selectedDishes.findIndex(item=> {
      return item._id == dish._id;
    });
    this.selectedDishes.splice(index, 1);
  }

  submit(){
    if(this.selectedDishes.length <= 1){
      this.utils.alert('warn', 'Please select minimum 2 dishes for a combo.');
      return;
    }

    for (let i = 0; i < this.selectedDishes.length; i++) {
      const item = this.selectedDishes[i];
      if(item.selectedVarient == undefined){
        this.utils.alert('warn', 'Please enter a valid details of dishes.');
        return;
      }
    }

    this.utils.saveDishes({selectedDishes: this.selectedDishes, combo_id: this.combo_id});
    this.utils.goto('/home/add-combo-further-details');
  }
}
