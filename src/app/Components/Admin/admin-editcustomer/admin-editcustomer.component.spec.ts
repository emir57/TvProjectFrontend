import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditcustomerComponent } from './admin-editcustomer.component';

describe('AdminEditcustomerComponent', () => {
  let component: AdminEditcustomerComponent;
  let fixture: ComponentFixture<AdminEditcustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditcustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
