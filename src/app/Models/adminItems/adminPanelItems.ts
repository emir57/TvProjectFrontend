import { PanelItem } from "../adminPanelItem";

export const AdminPanelItems:PanelItem[]=[
  {id:1,displayName:"<i class='fas fa-home'></i> Ana Sayfa",link:"/admindashboard/home"},
  {id:2,displayName:"<i class='far fa-file'></i> Siparişler",link:"/admindashboard/adminorders"},
  {id:3,displayName:"<i class='fas fa-shopping-cart'></i> Ürünler",link:"/admindashboard/adminproducts"},
  {id:4,displayName:"<i class='fas fa-users'></i> Müşteriler",link:"/admindashboard/admincustomers"},
  {id:5,displayName:"<i class='far fa-copyright'></i> Markalar",link:"/admindashboard/adminbrands"},
  {id:6,displayName:"<i class='far fa-chart-bar'></i> Raporlar",link:""},
  {id:7,displayName:"<i class='fas fa-layer-group'></i> Entegrasyonlar",link:""}
]
