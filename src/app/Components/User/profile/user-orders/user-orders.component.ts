import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiUrl } from 'src/app/Models/apiUrl';
import { OrderModel } from 'src/app/Models/orderModel';
import { Photo } from 'src/app/Models/photo';
import { User } from 'src/app/Models/user';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  user:User;
  orders:OrderModel[]=[]
  constructor(
    private orderService:OrderService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("userInfo"));
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrdersByUser(this.user.id).subscribe(response=>{
      if(response.isSuccess){
        this.orders =response.data;
      }else{
        this.toastrService.error(response.message);
      }
    })
  }

  getApiUrl(){
    return ApiUrl
  }

}
