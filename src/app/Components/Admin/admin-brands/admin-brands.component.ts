import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-admin-brands',
  templateUrl: './admin-brands.component.html',
  styleUrls: ['./admin-brands.component.css']
})
export class AdminBrandsComponent implements OnInit {

  categories:Category[]=[];
  constructor(
    private categoryService:CategoryService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      if(response.isSuccess){
        this.categories = response.data;
      }
    })
  }
  goUpdatePage(category:Category){
    this.router.navigate(["admindashboard/categoryupdate",JSON.stringify(category)])
  }

}
