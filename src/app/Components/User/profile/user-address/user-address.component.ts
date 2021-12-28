import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    private addressService:AddressService,
    private toastrService:ToastrService
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

  deleteAddress(address:UserAddressCityModel){
    if(confirm(`${address.addressName} bu adresi silmek istediğinizden emin misiniz?`)){
      this.addressService.deleteAddress(address.id).subscribe(response=>{
        if(response.isSuccess){
          let deletedAddress=this.addresses.findIndex(x=>x.id==address.id)
          this.addresses.splice(deletedAddress,1)
          this.toastrService.success("Silme Başarılı");
        }
      })
    }else{
      this.toastrService.info("Silme işlemi iptal edildi");
    }
  }

}
