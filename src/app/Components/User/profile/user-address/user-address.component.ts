import { Component, OnInit } from '@angular/core';
import { UserAddressCityModel } from 'src/app/Models/userAddressCity';
import { AddressService } from 'src/app/Services/address.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {

  addresses:UserAddressCityModel[]=[]
  userId:number=+sessionStorage.getItem("user")
  constructor(
    private addressService:AddressService
  ) { }

  ngOnInit(): void {
    this.getAddress();
  }

  getAddress(){
    this.addressService.getAddressesByUserId(this.userId).subscribe(response=>{
      if(response.isSuccess){
        this.addresses=response.data;
        console.log(this.addresses)
      }
    })
  }

}
