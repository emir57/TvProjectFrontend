import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/Models/city';
import { UserAddress } from 'src/app/Models/userAddress';
import { UserAddressCityModel } from 'src/app/Models/userAddressCity';
import { AddressService } from 'src/app/Services/address.service';
import { CityService } from 'src/app/Services/city.service';

import $ from 'jquery';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {

  address: UserAddress
  addForm: FormGroup
  updateForm: FormGroup
  cities: City[] = []
  addresses: UserAddressCityModel[] = []
  userId: number = +sessionStorage.getItem("user")
  constructor(
    private addressService: AddressService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    this.getCities();
    this.getAddress();
    this.createAddForm();
    this.createUpdateForm();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      addressName: ['', [Validators.required, Validators.maxLength(20)]],
      addressText: ['', [Validators.required, Validators.maxLength(200)]],
      userId: [this.userId, []],
      cityId: [0, [Validators.required, Validators.min(1)]],
    })
  }
  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      id: [0],
      addressName: ['', [Validators.required, Validators.maxLength(20)]],
      addressText: ['', [Validators.required, Validators.maxLength(200)]],
      userId: [this.userId, []],
      cityId: [0, [Validators.required, Validators.min(1)]],
    })
  }
  getCities() {
    this.cityService.getCities().subscribe(response => {
      if (response.isSuccess) {
        this.cities = response.data;
      }
    })
  }
  getAddress() {
    this.addressService.getAddressesByUserId(this.userId).subscribe(response => {
      if (response.isSuccess) {
        this.addresses = response.data;
      }
    })
  }

  deleteAddress(address: UserAddressCityModel) {
    if (confirm(`${address.addressName} bu adresi silmek istediğinizden emin misiniz?`)) {
      this.addressService.deleteAddress(address.id).subscribe(response => {
        if (response.isSuccess) {
          let deletedAddress = this.addresses.findIndex(x => x.id == address.id)
          this.addresses.splice(deletedAddress, 1)
          this.toastrService.success("Silme Başarılı");
        }
      })
    } else {
      this.toastrService.info("Silme işlemi iptal edildi");
    }
  }

  ShowUpdateAddress(address: UserAddress) {
    this.updateForm.get("addressName").setValue(address.addressName);
    this.updateForm.get("addressText").setValue(address.addressText);
    this.updateForm.get("cityId").setValue(address.cityId);
    this.updateForm.get("id").setValue(address.id);
    $("#backgroundDiv").fadeIn().show();
    $("#updateDiv").fadeIn().show();

    $("#backgroundDiv").click(function () {
      $("#backgroundDiv").fadeOut().hide();
      $("#updateDiv").fadeOut().hide();
    })
    $("#closeBtn").click(function () {
      $("#backgroundDiv").fadeOut().hide();
      $("#updateDiv").fadeOut().hide();
    })
  }

  updateAddress() {
    if (this.updateForm.valid) {
      let cityId = this.addForm.get("cityId").value;
      this.addForm.get("cityId").setValue(+cityId)
      this.cityService.getCity(cityId).subscribe(responseCity => {
        if (responseCity.isSuccess) {
          let address = Object.assign({ cityName: responseCity.data.cityName }, this.updateForm.value)
          this.addressService.updateAddress(address).subscribe(response => {
            if (response.isSuccess) {
              let index = this.addresses.findIndex(x => x.id == address.id)
              this.addresses[index] = address;
              this.toastrService.success(`${address.addressName} başarıyla güncellendi`);
            }
          })
        }
      })
      $("#backgroundDiv").fadeOut().hide();
      $("#updateDiv").fadeOut().hide();
    }
  }

  addAddress() {
    if (this.addForm.valid) {
      let cityId = this.addForm.get("cityId").value;
      this.cityService.getCity(cityId).subscribe(responseCity => {
        if (responseCity.isSuccess) {
          this.addForm.get("cityId").setValue(+cityId)
          let address = Object.assign({ cityName: responseCity.data.cityName }, this.addForm.value)
          this.addressService.addAddress(address).subscribe(response => {
            if (response.isSuccess) {
              this.toastrService.success(`${address.addressName} başarıyla eklendi`);
              this.addresses.push(address);
            }
          })
        }
      })
    }
  }

}
