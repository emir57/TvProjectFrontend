import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/order';
import { OrderModel } from 'src/app/Models/orderModel';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders:OrderModel[]=[]
  constructor(
    private orderService:OrderService,
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrders().subscribe(response=>{
      if(response.isSuccess){
        this.orders = response.data;
      }
    })
  }
  getDate(dateString:string):string{
    let date = new Date(dateString);
    let day = date.getDate().toLocaleString();
    let month = date.getMonth().toLocaleString()
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    return `${day}.${month}.${year} ${hour}:${minutes}`
  }

}
