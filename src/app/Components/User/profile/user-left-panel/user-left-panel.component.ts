import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanelItem } from 'src/app/Models/PanelItems/panelItem';
import { UserPanelItems } from 'src/app/Models/PanelItems/userItems/userItems';

@Component({
  selector: 'app-user-left-panel',
  templateUrl: './user-left-panel.component.html',
  styleUrls: ['./user-left-panel.component.css']
})
export class UserLeftPanelComponent implements OnInit {

  items: PanelItem[] = []
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.items = UserPanelItems
  }

  getItemClass(item: PanelItem) {
    let currentPath = this.activatedRoute.snapshot.children[0].routeConfig.path
    let getPath = item.link.split('/')[2];
    if (!currentPath && item.id == 1) {
      return "nav-link active";
    }
    else if (currentPath === getPath) {
      return "nav-link active"
    } else {
      return "nav-link"
    }
  }

}
