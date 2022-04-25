import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { CategoryWithCount } from 'src/app/Models/categoryWithCount';
import { CategoryWithPriceAverage } from 'src/app/Models/categoryWithPriceAverage';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  categoriesWithCount: CategoryWithCount[]
  categoriesWithPriceAverage: CategoryWithPriceAverage[]
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategoriesWithCount();
    this.getCategoriesWithPriceAverage();
    Chart.register(...registerables);
    setTimeout(() => {

    }, 1000);
  }

  createCategoryProductCountCanv() {
    const ctx = (document.getElementById('categoryProductCountCanv') as HTMLCanvasElement).getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.categoriesWithCount.map(c => c.name),
        datasets: [{
          label: '# of Votes',
          data: this.categoriesWithCount.map(c => c.count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createCategoryProductPriceAverageCanv() {
    const ctx = (document.getElementById('categoryProductPriceAvgCanv') as HTMLCanvasElement).getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.categoriesWithPriceAverage.map(c => c.name),
        datasets: [{
          label: 'Fiyat Ortalaması',
          data: this.categoriesWithPriceAverage.map(c => c.priceAverage),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getCategoriesWithCount() {
    this.categoryService.getAllWithCount().subscribe(response => {
      if (response.isSuccess) {
        this.categoriesWithCount = response.data;
        this.createCategoryProductCountCanv();

      }
    })
  }
  getCategoriesWithPriceAverage() {
    this.categoryService.getAllWithPriceAverage().subscribe(response => {
      if (response.isSuccess) {
        this.categoriesWithPriceAverage = response.data;
        this.createCategoryProductPriceAverageCanv();
      }
    })
  }

}
