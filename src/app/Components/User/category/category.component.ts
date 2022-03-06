import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  currentCategory: Category;
  currentParam = 0;
  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.activatedRoute.params.subscribe(param => {
      if(!param["categoryId"]){
        this.currentParam = 0;
      }else{
        this.currentParam = param["categoryId"];
      }

    })
  }
  getCategories() {
    this.categoryService.getCategories()
      .subscribe(response => {
        this.categories = response.data;
      })
  }
  getCurrentCategoryClass(category: Category) {
    if (this.currentParam == category.id) {
      return "list-group-item active";
    }
    else {
      return "list-group-item"
    }
  }
  setCurrentCategory(category: Category) {
    this.currentCategory = category;
  }

  clearCategory() {
    this.currentCategory = null;
  }


  getAllCategoryClass() {
    if (this.currentParam == 0) {
      return "list-group-item active";
    } else {
      return "list-group-item"
    }
  }
}
