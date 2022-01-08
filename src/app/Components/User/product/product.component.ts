import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiUrl } from 'src/app/Models/apiUrl';
import { Category } from 'src/app/Models/category';
import { Photo } from 'src/app/Models/photo';
import { Product } from 'src/app/Models/product';
import { ProductAndPhoto } from 'src/app/Models/productAndPhoto';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  apiUrl = ApiUrl
  searchString = "";
  products: ProductAndPhoto[] = [];
  categories: Category[] = [];
  selectList: number[] = []
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getAllProducts() {
    this.productService.getProducts()
      .subscribe(response => {
        this.products = response.data;
      }, responseErr => {
        console.log(responseErr)
      })
  }
  getProducts() {
    this.productService.getProducts().subscribe(response => {
      this.products = response.data;
    })
    // this.activatedRoute.params.subscribe(param => {
    //   if(param["categoryId"]) {
    //     this.productService.getProductsByCategory(param["categoryId"])
    //       .subscribe(response => {
    //         this.products = response.data;
    //       })
    //   } else {
    //     this.getAllProducts();
    //   }
    // })
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      if (response.isSuccess) {
        this.categories = response.data;
      }
    })
  }

  addList(category: Category) {
    this.selectList.push(category.id);
  }

  getProductsByCategories() {
    if(this.selectList.length>=1){
      this.products = [];
      this.productService.getProducts().subscribe(response => {
        if (response.isSuccess) {
          this.selectList.forEach(brandId => {
            response.data.forEach(product => {
              if (brandId === product.brandId) {
                this.products.push(product);
              }
            })
          });
        }
      })
    }else {
      this.productService.getProducts().subscribe(response => {
        if(response.isSuccess){
          this.products = response.data;
        }
      })
    }
  }
  getImageUrl() {
    return this.apiUrl;
  }

  photocheck(photo: Photo) {
    if (photo.isMain == true) {
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }

  getCarouselId(product: Product) {
    return `carousel${product.id}`
  }
  getCarouselButtonId(product: Product) {
    return `#carousel${product.id}`
  }

  getImages(photos: Photo[]) {
    let photosUrl: string[] = []
    photos.forEach(photo => photosUrl.push(`${this.apiUrl}${photo.imageUrl}`))
    console.log(photosUrl)
    return photosUrl;
  }

  increasedPrice() {
    console.log("artan")
    this.products = this.products.sort((x, y) => x.unitPrice - y.unitPrice);
  }
  decreasingPrice() {
    this.products = this.products.sort((x, y) => y.unitPrice - x.unitPrice);
  }




}
