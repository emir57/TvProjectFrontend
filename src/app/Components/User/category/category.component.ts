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
  currentCategory: Category=null;
  constructor(
    private categoryService: CategoryService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories()
      .subscribe(response => {
        this.categories = response.data;
      })
  }
  getCurrentCategoryClass(category: Category) {
    if (this.currentCategory==category) {
      return "list-group-item active";
    }
    else {
      return "list-group-item"
    }
  }
  setCurrentCategory(category: Category) {
    this.currentCategory = category;
  }

  clearCategory(){
    this.currentCategory=null;
  }


  getAllCategoryClass(){
    if(this.currentCategory==null){
      return "list-group-item active";
    }else{
      return "list-group-item"
    }
  }
}
