import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/Services/category.service';
import { DeleteAlertService } from 'src/app/Services/delete-alert.service';
declare var $: any;

@Component({
  selector: 'app-admin-category-update',
  templateUrl: './admin-category-update.component.html',
  styleUrls: ['./admin-category-update.component.css']
})
export class AdminCategoryUpdateComponent implements OnInit {

  isOk = true;
  category: Category
  categoryUpdateForm: FormGroup
  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private deleteAlertService: DeleteAlertService
  ) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async param => {
      if (!param["category"]) {
        this.router.navigate(["admindashboard/adminbrands"]);
      }
      // this.categoryService.getCategories().subscribe(response => {
      //   response.data.forEach(category => {
      //     if (category.id == param["category"]) {
      //       this.category = category
      //       this.createCategoryUpdateForm();
      //     }
      //   })
      // })
      let result = await this.categoryService.getCategoryById(param["category"]).toPromise();
      this.category = result.data;
      this.createCategoryUpdateForm();
    })

  }


  getCategory() {

  }

  createCategoryUpdateForm() {
    this.categoryUpdateForm = this.formBuilder.group({
      id: [this.category.id],
      name: [this.category.name, [Validators.required, Validators.maxLength(50)]],
      phoneNumber: [this.category.phoneNumber, [Validators.maxLength(15)]],
      address: [this.category.address, [Validators.maxLength(250)]]
    })
  }

  updateCategory() {
    if (this.categoryUpdateForm.valid) {
      this.isOk = false;
      let categoryModel = Object.assign({}, this.categoryUpdateForm.value);
      this.categoryService.updateCategory(categoryModel).subscribe(response => {
        if (response.isSuccess) {
          this.toastrService.success(response.message);
          this.isOk = true;
          this.router.navigate(["admindashboard/categoryupdate", categoryModel.id]);
        }
      }, responseErr => {
        console.log(responseErr);
        this.toastrService.error("Bir hata oluştu.")
        this.isOk = true;
      })
    }
  }

  deleteCategory() {
    this.isOk = false;
    this.deleteAlertService.showAlertBox("Bu kategoriyi silmek istediğinizden emin misiniz?",
      () => {
        this.categoryService.deleteCategory(this.category.id).subscribe(response => {
          if (response.isSuccess) {
            this.toastrService.success("Marka başarıyla silindi");
            this.router.navigate(["admindashboard/adminbrands"])
            this.isOk = true;
          }
        }, responseErr => {
          console.log(responseErr);
          this.isOk = true;
        })
      },
      () => {
        this.toastrService.info("Silme işlemi iptal edildi")
      })
  }

}
