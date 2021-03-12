import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { environment } from '../../../environments/environment';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
declare var $;
@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {
  ingredients = [];
  cuisines = [];
  categories = [];

  foodMeasures = [];
  subCategories = [];
  varient = [{
    price: '',
    qty: '',
    tax: '',
    total: ''
  }];
  addDishForm: FormGroup;
  submitted = false;
  foodImage;
  chargeable_cutlery:boolean;


  edit = false;
  dish_id;
  dishDetails;
  constructor(
    private utils: UtilsService,
    private api: ApiService,
    private fb: FormBuilder,
    private act: ActivatedRoute,
  ) {
    this.addDishForm = fb.group({
      food_name: ['', Validators.required],
      // food_type: ['veg', Validators.required],
      food_cuisine: ['', Validators.required],
      food_category: ['', Validators.required],
      food_sub_category: ['', Validators.required],
      cutlery_price: ['', Validators.required],
      Calories: ['', Validators.required],
      max_order_limit: ['', [Validators.required, Validators.min(1)]],
    });

    this.act.params.subscribe(data=> {
      if(data.id){ 
        this.edit = true;
        this.dish_id = data.id;
        this.getDishDetails()
      }
    });
  }

  getDishDetails(){
    this.api.getDishDetails({ dish_id: this.dish_id }).subscribe(
      data=> {
        this.dishDetails = data['response'];
        console.log(this.dishDetails)
        this.addDishForm.patchValue({
          food_name: this.dishDetails.food_name,
          food_cuisine: this.dishDetails.food_cuisine._id,
          food_category: this.dishDetails.food_category._id,
          food_description: this.dishDetails.food_description,
          cutlery_price: this.dishDetails.cutlery_price,
          max_order_limit: this.dishDetails.max_order_limit,
          Calories: this.dishDetails.totalCalorie
        });

        if(this.dishDetails.provide_cutlery) $('#cutlery').click();
        if(this.dishDetails.chargeable_cutlery) $('#chargeable_cutlery').click();
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  goBack(){
    if(this.edit){
      this.utils.goto('/menu/menu-combo')
    } else {
      this.utils.goto('/menu/menu-my-listings')
    }
  }

  get f(){
    console.log(this.addDishForm.controls)  
    return this.addDishForm.controls; }

  ngOnInit() {
    this.utils.scrollToTop();
    this.listFoodIngredients();
    this.listCuisines();
    this.listCategory();
  }

  listFoodIngredients(){
    this.api.getFoodIngredients().subscribe(
      data=> {
        this.ingredients = data['response'];
      },
      error=> {
        console.log(error);
        debugger
      }
    );
  }

  listCuisines(){
    this.api.getCuisineList().subscribe(
      data=> {
        this.cuisines = data['response'];
      },
      error=> {
        console.log(error);
        debugger
      }
    );
  }
  
  populateData(){
    setTimeout(()=>{
      this.selectCategory({target: { value: this.dishDetails.food_category._id }}, ()=> {
        this.addDishForm.patchValue({
          food_sub_category: this.dishDetails.food_sub_category._id,
        });
        if(this.dishDetails.food_image.length > 1) this.foodImage = [{name: '1 File Selected'}]; 
      });

      this.selectCuisine({target: { value: this.dishDetails.food_cuisine._id }}, ()=> {
        this.varient = this.dishDetails.varient;
      });

      // selectedIngredient = this.dishDetails.ingredient; 
      for(let i=0; i< this.dishDetails.ingredient.length; i++){
        let indegrdient = this.dishDetails.ingredient[i];

        let index = this.ingredients.findIndex(item=> {
          return indegrdient._id == item.ingredient._id;
        });
        this.ingredients[index].price = indegrdient.price;
        setTimeout(()=> {
          $('[name='+this.ingredients[index]._id+']').prop('checked', true);
        },0);
        this.selectIngredient({target: { checked: true }}, this.ingredients[index]);
      }
    },100);
  }

  listCategory(){
    this.api.getFoodCategoryList().subscribe(
      data=> {
        this.categories = data['response'];
        if(this.edit) this.populateData();
      },
      error=> {
        console.log(error);
        debugger
      }
    );
  }

  selectCuisine(event, callback){
    let cui = event.target.value;
    let selectedCuisine = this.cuisines.find(item=> {
      return item._id == cui;
    })
    this.foodMeasures = selectedCuisine.size;

    if(callback) callback();
  }

  selectCategory(event, callback){
    let cat = event.target.value;
    let selectedCat = this.categories.find(item=> {
      return item._id == cat;
    });
    this.subCategories = selectedCat.categories;

    if(callback) callback();
  }

  addMore(){
    this.varient.push({
      price: '',
      qty: '',
      tax: '',
      total: ''
    });
  }

  removeVarient(index){
    this.varient.splice(index, 1);
  }

  varientTotal(vari){
    vari.total = vari.price + vari.tax;
  }

  submit(){
    this.submitted = true;

    if(this.addDishForm.invalid) return;

    for(let i=0; i<this.varient.length; i++){
      let vari = this.varient[i];
      if(vari.price == '' || vari.price == undefined || vari.qty == undefined || vari.qty == ''){
        this.utils.alert('warn', `Please enter a valid varient ${i+1} data`);
        return;
      }
    }

    let ingredient = [];
    this.selectedIngredient.map(item=> {
      console.log("Item :",item);
      ingredient.push({
        _id: item._id,
        name: item.ingredient_name,
        price: item.price
      });
    });

    if(!this.foodImage || this.foodImage.length <= 0){
      this.utils.alert('warn', 'Please upload a image of the dish.');
      return;
    }

    let cutlery = $('#cutlery').prop('checked');
    let chargeable_cutlery = $('#chargeable_cutlery').prop('checked');

    let dataToSend = new FormData();
    if(this.edit){
      dataToSend.append('food_id', this.dish_id);
    }
    dataToSend.append('food_name', this.addDishForm.value.food_name);
    // dataToSend.append('food_type', this.addDishForm.value.food_type);
    dataToSend.append('food_cuisine', this.addDishForm.value.food_cuisine);
    dataToSend.append('food_category', this.addDishForm.value.food_category);
    dataToSend.append('food_sub_category', this.addDishForm.value.food_sub_category);

    dataToSend.append('varient', JSON.stringify(this.varient));
    dataToSend.append('totalCalorie',this.addDishForm.value.Calories);
    //dataToSend.append('provide_cutlery', cutlery);
    // dataToSend.append('chargeable_cutlery', chargeable_cutlery);
    dataToSend.append('cutlery_price', this.addDishForm.value.cutlery_price != null ? this.addDishForm.value.cutlery_price : 0);
    dataToSend.append('max_order_limit', this.addDishForm.value.max_order_limit);
    dataToSend.append('food_image', this.foodImage[0]);
    dataToSend.append('ingredient', JSON.stringify(ingredient));
    
    this.api.addFood(dataToSend).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        if(this.edit){
          this.utils.goto('/menu/menu-combo');
        } else {
          this.utils.goto('/menu/menu-my-listings');
        }
      },
      error=> {
        console.log(error);
        this.utils.alert('error', error.error.message);
         
      }
    );

  }
  
  selectedIngredient = [];
  selectIngredient(event, ing){
    console.log(ing)
    if(event.target.checked){
      ing.checked = true;
      ing.price = 0;
      this.selectedIngredient.push(ing);
    } else {
      ing.checked = false;
      ing.price = 0;
      let removedIndex = this.selectedIngredient.findIndex(item=> {
        return item._id == ing._id;
      });
      this.selectedIngredient.splice(removedIndex, 1);
    }
  }

  saveIngredient(){
    this.selectedIngredient;
    $('#select-ingredient').modal('hide');
    console.log(this.selectedIngredient)

  }

  fileInput(event){
    this.foodImage = event.target.files;
  }
}
