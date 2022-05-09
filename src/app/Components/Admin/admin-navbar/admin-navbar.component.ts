import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUrl } from 'src/app/Models/apiUrl';
import { Product } from 'src/app/Models/product';
import { ProductAndPhoto } from 'src/app/Models/productAndPhoto';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
import { ProductService } from 'src/app/Services/product.service';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  apiUrl = ApiUrl;
  searchString: string = "";
  currentUser: User;
  products: ProductAndPhoto[];
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLoginUser();
    this.getProducts();
  }
  getImageUrl() {
    return this.apiUrl;
  }

  getLoginUser() {
    this.authService.getLoginUser().subscribe(response => {
      if (response.isSuccess) {
        this.currentUser = response.data;
      }
    })
  }

  getProducts() {
    this.productService.getProducts(0).subscribe(response => {
      if (response.isSuccess) {
        this.products = response.data;
      }
    })
  }

  goUpdatePage(product: Product) {
    this.searchString = "";
    this.router.navigate(["admindashboard/productupdate", product.id]);
  }

}
