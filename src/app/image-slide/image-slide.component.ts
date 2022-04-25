import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../Models/photo';

@Component({
  selector: 'app-image-slide',
  templateUrl: './image-slide.component.html',
  styleUrls: ['./image-slide.component.css']
})
export class ImageSlideComponent implements OnInit {

  @Input() carouselId: string;
  @Input() photos: Photo[] = [];
  @Input() productId: number;
  constructor() { }

  ngOnInit(): void {
  }

}
