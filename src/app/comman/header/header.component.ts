import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../../service/utils.service';
import { ApiService } from '../../service/api.service';
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private utils: UtilsService,
    private api: ApiService,
  ) { }

  ngOnInit() {

    $('#mobile-collapse').click(function(){
      $('.pcoded.iscollapsed').toggleClass('expanded');
      $('.pcoded.iscollapsed').toggleClass('offcanvas');
    });
    $(".mobile-options").on("click",function(){
      $(".navbar-container .nav-right").slideToggle("slow")
    });
    $('.pcoded-submenu li a').on('click', function(){
      $('html, body').animate({
        scrollTop: 0
      }, 500);
    });
    if($(window).width() <= 767){
      $('.pcoded-submenu li a').on('click', function(){
        $('.pcoded.iscollapsed').toggleClass('expanded');
        $('.pcoded.iscollapsed').toggleClass('offcanvas');
      });
    }

    $('.langues-dropdown li').click(function(){
      var aaa = this.innerHTML;
      $('.langues-dropdown #langues').html(aaa);
    });  

    this.getCartData();
    this.utils.cartList.subscribe(
      data=> {
        if(data == 'default message') return;
        if(data['updateCart']){
          this.getCartData();
        }
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  total_items = 0;
  getCartData(){
    this.api.getCartData().subscribe(
      data=> {
        this.total_items = 0;
        if(data['response']){
          let products = data['response']['products'];
          products.map(item=> {
            this.total_items = this.total_items + item.quantity;
          });
        }
      },
      error=> {
        console.log(error);
         
      }
    );
  }

}
