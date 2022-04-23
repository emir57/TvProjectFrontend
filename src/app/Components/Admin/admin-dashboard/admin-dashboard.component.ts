import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { CategoryWithCount } from 'src/app/Models/categoryWithCount';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  categories: CategoryWithCount[]
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
    Chart.register(...registerables);
    setTimeout(() => {
      this.createCategoryProductCountCanv();
    }, 0);
  }

  createCategoryProductCountCanv() {
    const ctx = (document.getElementById('categoryProductCountCanv') as HTMLCanvasElement).getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.categories.map(c=>c.name),
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
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

  getCategories() {
    this.categoryService.getAllWithCount().subscribe(response => {
      if (response.isSuccess) {
        this.categories = response.data;
      }
    })
  }
}
