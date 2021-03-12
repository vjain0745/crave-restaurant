import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../service/utils.service';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
  user;
  environment = environment;
  constructor(private utils: UtilsService, private authenticationService: AuthenticationService, private router: Router) {
    this.user = this.utils.get('crave_restaurant_data');
  }

  ngOnInit() {

    $("#more-details").on("click",function(){
      $(".more-details").slideToggle(500);
    });
    
    $(".pcoded-hasmenu > a").on("click",function(e){
      if($(this).parent('.pcoded-hasmenu').hasClass('pcoded-trigger')){
        $(".pcoded-hasmenu").removeClass('pcoded-trigger active');
        $('.pcoded-hasmenu ul.pcoded-submenu').hide();
      }else{
        $(".pcoded-hasmenu").removeClass('pcoded-trigger');
        $('.pcoded-hasmenu ul.pcoded-submenu').hide();
        $(this).parent('.pcoded-hasmenu').addClass('pcoded-trigger active');
        $(this).parent('.pcoded-hasmenu').children('ul.pcoded-submenu').slideDown();
      }
    });

    //////////////// NAV ACTIVE ///////////////
    setTimeout(()=>{

      if($('#dashboardPage').length > 0){
        $('.left-menu li').removeClass('active');
        $('#dashboardNav').addClass('active');
      }
      if($('#ordersPage').length > 0){
        $('.left-menu li').removeClass('active');
        $('#ordersNav').addClass('active');
      }
      if($('#menuPage').length > 0){
        $('.left-menu li').removeClass('active');
        $('#menuNav').addClass('active');
      }
      if($('#addressPage').length > 0){
        $('.left-menu li').removeClass('active');
        $('#addressNav').addClass('active');
      }
      if($('#mealplansPage').length > 0){
        $('.left-menu li').removeClass('active');
        $('#mealplansNav').addClass('active');
      }
      if($('#discountsPage').length > 0){
        $('.left-menu li').removeClass('active');
        $('#discountsNav').addClass('active');
      }
      if($('#paymentsPage').length > 0){
        $('.left-menu li').removeClass('active');
        $('#paymentsNav').addClass('active');
      }
      if($('#revenuePage').length > 0){
        $('.left-menu li').removeClass('active');
        $('#revenueNav').addClass('active');
      }
      if($('#profilePage').length > 0){
        $('.left-menu li').removeClass('active');
        $('#profileNav').addClass('active');
      }
    }, 100);

  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
