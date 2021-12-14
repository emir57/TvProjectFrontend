import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanelItem } from 'src/app/Models/adminPanelItem';
import { UserPanelItems } from 'src/app/Models/userItems/userItems';

@Component({
  selector: 'app-user-left-panel',
  templateUrl: './user-left-panel.component.html',
  styleUrls: ['./user-left-panel.component.css']
})
export class UserLeftPanelComponent implements OnInit {

  items:PanelItem[]=[]
  constructor(
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.items = UserPanelItems
  }

  getItemClass(item:PanelItem) {
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
