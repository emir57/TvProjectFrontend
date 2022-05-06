import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanelItem } from 'src/app/Models/PanelItems/panelItem';
import { AdminPanelItems } from 'src/app/Models/PanelItems/adminItems/adminPanelItems';
import { AdminPanelOperationItems } from 'src/app/Models/PanelItems/adminItems/adminPanelOperationItems';

@Component({
  selector: 'app-admin-leftnav',
  templateUrl: './admin-leftnav.component.html',
  styleUrls: ['./admin-leftnav.component.css']
})
export class AdminLeftnavComponent implements OnInit {

  items: PanelItem[] = [];
  operationItems:PanelItem[]=[]
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.items = AdminPanelItems
    this.operationItems=AdminPanelOperationItems
  }

  getItemClass(item:PanelItem) {
    let currentPath = this.activatedRoute.snapshot.children[0].url[0].path;
    let getPath = item.link.split('/')[2]
    if(!currentPath){
      return "nav-link"
    }
    else if (currentPath===getPath){
      return "nav-link active"
    }else{
      return "nav-link"
    }
  }

}
