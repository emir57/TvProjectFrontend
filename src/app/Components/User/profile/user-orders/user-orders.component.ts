import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiUrl } from 'src/app/Models/apiUrl';
import { OrderModel } from 'src/app/Models/orderModel';
import { Photo } from 'src/app/Models/photo';
import { User } from 'src/app/Models/user';
import { OrderService } from 'src/app/Services/order.service';
import $ from 'jquery';
import { Order } from 'src/app/Models/order';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  user: User;
  orders: OrderModel[] = []
  selectedOrder: OrderModel;
  constructor(
    private orderService: OrderService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("userInfo"));
    this.getOrders();
  }
  getOrders() {
    this.orderService.getOrdersByUser(this.user.id).subscribe(response => {
      if (response.isSuccess) {
        this.orders = response.data;
      } else {
        this.toastrService.error(response.message);
      }
    })
  }

  getApiUrl() {
    return ApiUrl
  }
  getCount() {
    return this.orders.length
  }
  deleteOrder() {
    this.orderService.deleteOrder(this.selectedOrder.id).subscribe(response => {
      if (response.isSuccess) {
        this.toastrService.success(response.message);
        this.getOrders();
      } else {
        this.toastrService.error(response.message)
      }
    })
  }

  showAlertBox(order: OrderModel) {
    this.selectedOrder = order;
    $("#deleteBox").fadeIn();
    $("#deleteBoxBackground").fadeIn();
    let text = `
    ${order.tv.productName}
    <br>
    Bu siparişi iptal etmek istediğinizden emin misiniz?
    `
    $("#deleteBoxText").html(text)


    $(".deleteBoxClose").click(function () {
      $("#deleteBox").fadeOut();
      $("#deleteBoxBackground").fadeOut();
    })
    $("#deleteBoxBackground").click(function () {
      $("#deleteBox").fadeOut();
      $("#deleteBoxBackground").fadeOut();
    })
  }

}
