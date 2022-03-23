import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiUrl } from 'src/app/Models/apiUrl';
import { Category } from 'src/app/Models/category';
import { Product } from 'src/app/Models/product';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import $ from 'jquery';
import { Photo } from 'src/app/Models/photo';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.css']
})
export class AdminProductUpdateComponent implements OnInit {

  apiUrl = ApiUrl
  isOk = true;
  productUpdateForm: FormGroup;
  categories: Category[] = [];
  @Input() product: Product;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getCategories();
    // this.activatedRoute.params.subscribe(param => {
    //   if (!param["product"]) {
    //     this.router.navigate(["/admindashboard/home"])
    //   }
    //   this.product = JSON.parse(param["product"])
    //   this.productService.getProduct(param["product"]).subscribe(async response => {
    //     this.product = response.data;
    //     this.createproductUpdateForm();
    //   })
    // })
    this.createproductUpdateForm();
    this.deleteDiv();
    setTimeout(() => {
      this.imageSlide();
    }, 500);
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      if (response.isSuccess) {
        this.categories = response.data;
      }
    })
  }
  updateProduct() {
    if (this.productUpdateForm.valid) {
      this.isOk = false;
      let productModel = Object.assign({}, this.productUpdateForm.value);
      this.productService.updateProduct(productModel).subscribe(response => {
        if (response.isSuccess) {
          this.toastrService.success(response.message);
          this.isOk = true;
          this.router.navigate(["admindashboard/productupdate", productModel.id])
        }
      }, responseErr => {
        this.toastrService.error(responseErr.error.Message)
      })
    }
  }
  deleteProduct() {
    this.isOk = false;
    this.productService.deleteProduct(this.product).subscribe(response => {
      if (response.isSuccess) {
        this.toastrService.success(response.message);
        this.router.navigate(["admindashboard/adminproducts"])
      }
    })

  }
  cancelDelete() {
    this.toastrService.info("Silme işlemi iptal edildi.")
  }
  async createproductUpdateForm() {
    this.productUpdateForm = this.formBuilder.group({
      id: [this.product.id, []],
      productName: [this.product.productName, [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      productCode: [this.product.productCode, []],
      screenType: [this.product.screenType, [Validators.required, Validators.maxLength(50)]],
      screenInch: [this.product.screenInch, [Validators.required, Validators.maxLength(10)]],
      extras: [this.product.extras, [Validators.maxLength(50)]],
      brandId: [this.product.brandId, [Validators.required, Validators.min(1)]],
      unitPrice: [this.product.unitPrice, [Validators.required, Validators.min(500)]],
      discount: [this.product.discount, []],
      isDiscount: [this.product.isDiscount, []],
      stock: [this.product.stock, [Validators.required, Validators.min(1), Validators.max(255)]],
      photos: [this.product.photos]
    })
  }

  photocheck(photo: Photo, product: Product) {
    if (photo.isMain == true) {
      return `carousel-item active photoProduct`
    } else {
      return `carousel-item photoProduct`
    }
  }
  imageSlide() {

    var nextBtn = $("#NextBtn");
    var prevBtn = $("#PrevBtn");
    let photos = $(".photoProduct");
    let length = photos.length;
    let i = 0;
    function photosDisplayNone(photos) {
      for (let i = 0; i < photos.length; i++) {
        photos[i].style.display = "none"
      }
    }
    this.product.photos.forEach((photo, index) => {
      if (photo.isMain) {
        $("#photo" + photo.id).fadeIn();
        let i = index;
      }
      else $("#photo" + photo.id).fadeOut()
    })
    nextBtn.click(function () {
      i++;
      if (i > photos.length - 1) i = 0;
      photosDisplayNone(photos);
      photos[i].style.display = "block";
    })
    prevBtn.click(function () {
      i--;
      if (i < 0) {
        i = photos.length - 1;
      }
      photosDisplayNone(photos);
      photos[i].style.display = "block";
    })
  }
  deleteDiv() {
    var bgDiv = $("#backgroundDiv");
    var deleteDiv = $("#deleteDiv");
    var deleteButton = $("#deleteButton");
    var cancelBtn = $(".cancelBtn");
    bgDiv.click(function () {
      deleteDiv.fadeOut(500);
      bgDiv.fadeOut(900);
    })
    cancelBtn.click(function () {
      deleteDiv.fadeOut(500);
      bgDiv.fadeOut(900);
    })
    deleteButton.click(function () {
      deleteDiv.fadeIn(500);
      bgDiv.fadeIn(900);
    })
  }
}
