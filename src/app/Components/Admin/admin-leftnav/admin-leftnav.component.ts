import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPanelItem } from 'src/app/Models/adminPanelItem';
import { AdminPanelItems } from 'src/app/Models/adminPanelItems';
import { AdminPanelOperationItems } from 'src/app/Models/adminPanelOperationItems';

@Component({
  selector: 'app-admin-leftnav',
  templateUrl: './admin-leftnav.component.html',
  styleUrls: ['./admin-leftnav.component.css']
})
export class AdminLeftnavComponent implements OnInit {

  items: AdminPanelItem[] = [];
  operationItems:AdminPanelItem[]=[]
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.items = AdminPanelItems
    this.operationItems=AdminPanelOperationItems
  }

  getItemClass(item:AdminPanelItem) {
    let currentPath = this.activatedRoute.snapshot.url[1].path;
    if(!currentPath){
      return "nav-link active"
    }
    let getPath = item.link.split('/')[2]
    if (currentPath===getPath){
      return "nav-link active"
    }else{
      return "nav-link"
    }
  }

}
