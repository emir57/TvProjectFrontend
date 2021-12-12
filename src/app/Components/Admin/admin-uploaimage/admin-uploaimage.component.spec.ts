import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUploaimageComponent } from './admin-uploaimage.component';

describe('AdminUploaimageComponent', () => {
  let component: AdminUploaimageComponent;
  let fixture: ComponentFixture<AdminUploaimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUploaimageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUploaimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
