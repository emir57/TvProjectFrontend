import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/order';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders:Order[]=[]
  constructor(
    private orderService:OrderService,
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrders().subscribe(responsive=>{
      if(responsive.isSuccess){
        this.orders = responsive.data;
      }
    })
  }

}
