import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, publishReplay, catchError, refCount } from 'rxjs/operators';
import { pipe, EMPTY, Observable , Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private subject = new Subject<any>();

  sendMessage(message: string) {
      this.subject.next({ text: message });
  }

  clearMessages() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
  constructor(private http: HttpClient) { }

  // login module's api
  register(data) {
    return this.http.post('restaurant/signup', data);
  }

  resendOTP(data) {
    return this.http.post('restaurant/resend_otp', data);
  }

  verifyOTP(data) {
    return this.http.post('restaurant/verify_otp', data);
  }

  login(data) {
    return this.http.post('restaurant/login', data);
  }

  forgetPassword(data) {
    return this.http.post('restaurant/forgot_password', data);
  }

  resetPassword(data) {
    return this.http.post('restaurant/reset_password', data);
  }

  logout() {
    return this.http.get('restaurant/logout');
  }
  
  // profile creation
  getCountryList(){
    return this.http.get('restaurant/country_list');
  }
  getCountryStates(data){
    return this.http.post('restaurant/country_state_list', data);//country
  }
  getStatesCities(data){
    return this.http.post('restaurant/state_city_list', data);//country, state
  }
  getFoodCuisins(){
    return this.http.get('restaurant/food_cuisins');
  }
  
  addBankDetails(data){
    return this.http.post('restaurant/bank_details', data);
  }

  addBusinessDetails(data){
    return this.http.post('restaurant/business_details', data);
  }

  // market place
  getSupplierList(data){
    return this.http.post('restaurant/supplier_list', data);
  }
  
  markSupplierFav(data){
    return this.http.post('restaurant/mark_supplier_fav', data);
  }
  
  getSupplierData(data){
    return this.http.post('restaurant/supplier_details', data)
  }
  
  searchSupplierByProduct(data){
    return this.http.post('restaurant/search_supplier_product', data)
  }

  searchSupplierByCategory(data){
    return this.http.post('restaurant/search_supplier_category', data)
  }

  getFavSuppliers(){
    return this.http.get('restaurant/get_fav_suppliers');
  }

  // cart management
  addToCart(data){
    return this.http.post('restaurant/add_to_cart', data)
  }

  getCartData(){
    return this.http.get('restaurant/cart_data');
  }

  placeOrder(data){
    return this.http.post('restaurant/place_order', data);
  }

  processPayment(data){
    return this.http.post('restaurant/proceed_payment', data);
  }

  // inventory manangement 
  getInventoryData(){
    return this.http.get('restaurant/get_inventory');
  }

  changeIngredientStatus(data){
    return this.http.post('restaurant/change_ingredient_status', data);
  }

  // add dish
  getFoodIngredients(){
    return this.http.get('restaurant/get_food_ingredients');
  }

  getCuisineList(){
    return this.http.get('restaurant/get_cuisine_list');
  }

  getFoodCategoryList(){
    return this.http.get('restaurant/get_food_categories');
  }

  getProductCategoryList(){
    return this.http.get('restaurant/get_product_categories');
  }

  addFood(data){
    return this.http.post('restaurant/add_dish', data);
  }

  updateFood(data){
    return this.http.post('restaurant/update_dish', data);
  }

  viewDish(data){
    return this.http.post('restaurant/view_dish', data);
  }
  
  getDishList(data){
    return this.http.post('restaurant/get_dish_list', data);
  }

  getDishDetails(data){
    return this.http.post('restaurant/dish_details', data);
  }
  
  deleteDish(data){
    return this.http.post('restaurant/remove_dish', data);
  }

  getApprovedDishes(){
    return this.http.get('restaurant/get_approved_dishes');
  }

  getDishVarients(data){
    return this.http.post('restaurant/get_dish_varient', data);
  }

  setRecommendedDish(data){
    return this.http.post('restaurant/recommended_dish', data);
  }
  
  createCombo(data){
    return this.http.post('restaurant/generate_combo', data);
  }

  getCombos(){
    return this.http.get('restaurant/get_combo_list');
  }

  getComboDetails(data){
    return this.http.post('restaurant/combo_details', data);
  }

  setIngredientQuantity(data){
    return this.http.post('restaurant/ingredient_quantity', data);
  }

  setQuantityLimit(data){
    return this.http.post('restaurant/set_quantity_limit', data);
  }

  setRecommendedCombo(data){
    return this.http.post('restaurant/recommend_combo', data);
  }

  deleteCombo(data){
    return this.http.post('restaurant/remove_combo', data);
  }
  
  getOffers(){
    return this.http.get('restaurant/get_offer_list');
  }
  
  getCouponsList(){
    return this.http.get('restaurant/get_promocode');
  }

  applyCoupon(data){
    return this.http.post('restaurant/apply_promocode', data);
  }

  saveAddress(data){
    return this.http.post('restaurant/save_address', data);
  }

  getAddressList(){
    return this.http.get('restaurant/get_address');
  }

  deleteAddress(data){
    return this.http.post('restaurant/delete_address', data);
  }
  
  setDefaultAddress(data){
    return this.http.post('restaurant/set_default_address', data);
  }

  getAddressDetails(data){
    return this.http.post('restaurant/address_details', data);
  }

  removeDishFromCart(data){
    return this.http.post('restaurant/remove_prod_from_cart', data);
  }
  
  getOrderDetails(data){
    return this.http.post('restaurant/order_details', data);
  }

  // order management
  getOrderList(data){
    return this.http.post('restaurant/get_order_list', data);
  }
  
  changeOrderStatus(data){
    return this.http.post('restaurant/change_order_status', data);
  }
  
  getUserOrderDetails(data){
    return this.http.post('restaurant/user_order_details', data);
  }

  createOffer(data){
    return this.http.post('restaurant/add_offer',data); 
  }

  getAllOffers(){
    return this.http.get('restaurant/get_offers');
  }

  getSupliersOffer(){
    return this.http.get('restaurant/getSupplierOffers');
  }

  getOrdersList(data){
    return this.http.post('restaurant/All_order_details',data);
  }
  deleteOffer(data){
    console.log(data)
    return this.http.post('restaurant/deleteRestaurantOffer',data);
  }

  getOrderDetail(data){
    return this.http.post('restaurant/order_details',data);
  }

  activeInactiveOffer(data){
    console.log(data)
    return this.http.post('restaurant/Active_inactiveOffer',data);
  }

  cancelOrder(data){
    return this.http.post('restaurant/cancelOrder',data);
  }

  getOffer(data){
    return this.http.post('restaurant/cancelOrder',data);
  }
  getOffervalues(data){
    return this.http.post('restaurant/getsingleOffer',data);
  }
  getTemplate(){
    return this.http.get('admin/get_template')
  }

}
