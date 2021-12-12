import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUploadimageComponent } from './admin-uploadimage.component';

describe('AdminUploaimageComponent', () => {
  let component: AdminUploadimageComponent;
  let fixture: ComponentFixture<AdminUploadimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUploadimageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUploadimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
