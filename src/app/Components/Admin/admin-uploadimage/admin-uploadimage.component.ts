import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Models/product';
import { PhotoService } from 'src/app/Services/photo.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-admin-uploaimage',
  templateUrl: './admin-uploadimage.component.html',
  styleUrls: ['./admin-uploadimage.component.css']
})
export class AdminUploadimageComponent implements OnInit {

  searchString: string = "";
  isOk = true;
  photoUploadForm: FormGroup
  products: Product[] = []
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private photoService: PhotoService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  uploadImage() {
  }

  createPhotoUploadForm() {
    this.photoUploadForm = this.formBuilder.group({
      tvId: [0, [Validators.required]],
      isMain: [false]
    })
  }
  getProducts() {
    this.productService.getProducts().subscribe(response => {
      if (response.isSuccess) {
        this.products = response.data;

      }
    }, responseErr => { },
      () => {
        this.createPhotoUploadForm();
      })
  }
}
