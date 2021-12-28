import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/Models/city';
import { UserAddressCityModel } from 'src/app/Models/userAddressCity';
import { AddressService } from 'src/app/Services/address.service';
import { CityService } from 'src/app/Services/city.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {

  addForm:FormGroup
  cities:City[]=[]
  addresses:UserAddressCityModel[]=[]
  userId:number=+sessionStorage.getItem("user")
  constructor(
    private addressService:AddressService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private cityService:CityService
  ) { }

  ngOnInit(): void {
    this.getCities();
    this.getAddress();
    this.createAddForm();
  }

  createAddForm(){
    this.addForm = this.formBuilder.group({
      addressName:['',[Validators.required,Validators.maxLength(20)]],
      addressText:['',[Validators.required,Validators.maxLength(200)]],
      userId:[this.userId,[]],
      cityId:[0,[Validators.required,Validators.min(1)]],
    })
  }
  getCities(){
    this.cityService.getCities().subscribe(response=>{
      if(response.isSuccess){
        this.cities = response.data;
      }
    })
  }
  getAddress(){
    this.addressService.getAddressesByUserId(this.userId).subscribe(response=>{
      if(response.isSuccess){
        this.addresses=response.data;
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

  addAddress(){
    if(this.addForm.valid){
      let cityId = this.addForm.get("cityId").value;
      this.cityService.getCity(cityId).subscribe(responseCity=>{
        if(responseCity.isSuccess){
          this.addForm.get("cityId").setValue(+cityId)
          let address = Object.assign({cityName:responseCity.data.cityName},this.addForm.value)
          this.addressService.addAddress(address).subscribe(response=>{
            if(response.isSuccess){
              this.toastrService.success(`${address.addressName} başarıyla eklendi`);
              this.addresses.push(address);
            }
          })
        }
      })
    }
  }

}
