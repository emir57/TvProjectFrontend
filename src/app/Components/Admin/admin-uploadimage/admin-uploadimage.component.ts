import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiUrl } from 'src/app/Models/apiUrl';
import { Product } from 'src/app/Models/product';
import { PhotoService } from 'src/app/Services/photo.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-admin-uploadimage',
  templateUrl: './admin-uploadimage.component.html',
  styleUrls: ['./admin-uploadimage.component.css']
})
export class AdminUploadimageComponent implements OnInit {

  searchString: string = "";
  isOk = true;
  photoUploadForm: UntypedFormGroup
  products: Product[] = []
  selectedFile: File;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private toastrService: ToastrService,
    private photoService: PhotoService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.createPhotoUploadForm();
  }

  uploadImage(fileInput: HTMLInputElement) {
    if (this.photoUploadForm.valid && fileInput.files.length > 0) {
      this.isOk = false;
      this.photoUploadForm.get("tvId").setValue(+this.photoUploadForm.get("tvId").value)
      let photoModel = Object.assign({}, this.photoUploadForm.value);
      let files: File[] = [];
      for (let i = 0; i < fileInput.files.length; i++) {
        const file = fileInput.files.item(i);
        files.push(file)
      }
      this.photoService.uploadImages(files, photoModel).subscribe(responses => {
        responses.forEach(response => {
          if (response.isSuccess) {
            this.toastrService.success(response.message);
          } else {
            this.toastrService.error(response.message);
          }
        });
        this.isOk = true;
      }, responseErr => {
        this.isOk = true;
      })
    }
  }


  getProducts() {
    this.productService.getProducts(1).subscribe(response => {
      if (response.isSuccess) {
        this.products = response.data;
      }
    })
  }
  createPhotoUploadForm() {
    this.photoUploadForm = this.formBuilder.group({
      tvId: [0, [Validators.required]],
      isMain: [false]
    })
  }
  setFile(files: FileList) {
    this.selectedFile = files.item(0);
  }
}
