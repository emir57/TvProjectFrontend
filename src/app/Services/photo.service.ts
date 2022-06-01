import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { Photo } from '../Models/photo';
import { ResponseModel } from '../Models/response/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  apiUrl = `${ApiUrl}/api/photos/upload`
  constructor(
    private httpClient: HttpClient
  ) { }

  uploadImage(image: File, photoModel: Photo): Observable<ResponseModel> {
    const sendForm = new FormData();
    sendForm.append("file", image, image.name);
    sendForm.append("tvid", JSON.stringify(photoModel.tvId));
    sendForm.append("ismain", JSON.stringify(photoModel.isMain));
    // sendForm.append("",JSON.stringify(photoModel));
    return this.httpClient.post<ResponseModel>(this.apiUrl, sendForm)
  }
  uploadImages(images: File[], photoModel: Photo): Observable<ResponseModel[]> {
    const sendForm = new FormData();
    images.forEach(image => {
      sendForm.append("files", image, image.name);
    });
    sendForm.append("tvid", JSON.stringify(photoModel.tvId));
    sendForm.append("ismain", JSON.stringify(photoModel.isMain));
    // sendForm.append("",JSON.stringify(photoModel));
    return this.httpClient.post<ResponseModel[]>(this.apiUrl, sendForm)
  }
}
